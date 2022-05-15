import axios from 'axios';
import mongoose from 'mongoose';
import { convert } from 'html-to-text';

import productService from '../services/products.service.js';
import userBehaviorService from '../services/user-behavior.service.js';
import SlackUtils from '../utils/SlackUtils.js';
import ProductRecom from '../models/product-recom.model.js';

export default {
  importProductDataToFpt,
  updateRecommendData,
  importUserBehaviorToFpt
};

const getFormatDateTime = (dt = null) => {
  if (!dt) { dt = new Date(); }
  return dt.toLocaleString(
    'vi-VN',
    {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  );
};

const loadProductData = async () => {
  const { list } = await productService.getAllProducts(
    'slug,name,category,brand,variants.variantName,desc',
    100000,
    1,
    {},
    '_id',
    -1
  );
  return list.map(item => ({
    id: item._id.toString(),
    slug: item.slug,
    name: item.name,
    category: item?.category?.name || '',
    brand: item?.brand?.name || '',
    variants: item.variants.map(x => x.variantName).join(';'),
    desc: convert(item.desc)
      .replace(/\[[^\]\[]*\]/g, ' ')
      .replace(/:+/g, ' ')
      .replace(/\/+/g, ' ')
      .replace(/\\n+/g, ' ')
      .replace(/,+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace('Nguồn: thegioididong.com', '')
      .trim()
  }));
}

async function importProductDataToFpt() {
  const startTime = new Date();
  console.log('Loading data from db ...');
  let list = await loadProductData();
  console.log(`Loaded ${list.length} items from db !`);

  const datasetName = 'CellphonesDataset';
  const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/dataset/';
  const apiToken = process.env.FPT_API_TOKEN;

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: apiToken }
  });

  let countError = 0, countSuccess = 0, total = list.length;
  let errorDetails = [];
  let isSuccess = true;

  while (countSuccess < total) {
    try {
      const url = `/${datasetName}/${countSuccess === 0 ? 'overwrite' : 'append'}`;
      const item = list[countSuccess];
      await axiosInstance.post(url, [item]);
      countSuccess++;
    } catch (err) {
      errorDetails.push({
        itemId: item.id,
        mgs: err.message,
        detail: JSON.stringify(err)
      });
      ++countError;
      if (countError > total) {
        isSuccess = false;
        break;
      }
    }
  }

  let mgs = `[From *${getFormatDateTime(startTime)}* to *${getFormatDateTime()}*]\n`;
  mgs += `Import product data to FPT *${isSuccess ? 'succeed' : 'failed'}*. Success: *${countSuccess}*/${total} | Error: *${countError}*/${total}.`;
  if (errorDetails?.length > 0) {
    mgs += `\n\nError details: \n`;
    errorDetails.forEach(item => {
      mgs += `\t- *${item.itemId}* Message: ${item.mgs}, detail: ${item.detail}\n`;
    });
  }
  await SlackUtils.sendMessageSync(mgs, 'C02BFR5KSUW');
}

async function updateRecommendData() {
  const url = 'https://recom.fpt.vn/api/v0.1/recommendation/api/result/getBatchResult';
  const fptApiId = process.env.FPT_API_ID;
  const fptApiKey = process.env.FPT_API_KEY;

  const axiosInstance = axios.create({ baseURL: url });

  const item = await ProductRecom.findOne().select('version').sort('-version').lean().exec();
  const prevVersion = parseInt(item?.version, 10) || 0;
  const nextVersion = Date.now();

  let page = 1, countError = 0, countSuccess = 0;
  let errorDetails = [];

  while (true) {
    try {
      const { data } = await axiosInstance.get(
        fptApiId,
        { params: { page, key: fptApiKey } }
      );

      if (data.message === 'No data found' || !data.data) {
        break;
      }

      for (let i = 0; i < data.data.length; i++) {
        const { input_id, recommend_id } = data.data[i];
        const productId = input_id.toString().replace(/}/g, '').replace(/{/g, '');

        await ProductRecom.insertMany(recommend_id.map((item) =>
          new ProductRecom({
            _id: new mongoose.Types.ObjectId(),
            productId,
            recommendId: item.toString().replace(/}/g, '').replace(/{/g, ''),
            version: nextVersion
          })
        ));

        countSuccess++;
      }

      page++;
    } catch (e) {
      errorDetails.push({
        page,
        errorMgs: e.message,
        stack: e.stack
      });
      ++countError;
    }
  }

  const mgs = `Update recommend data success: ${countSuccess} | Error: ${countError} `;
  SlackUtils.sendMessage(mgs);

  if (countError === 0) {
    await ProductRecom.deleteMany({ version: { $lte: prevVersion } });
  }
}

async function importUserBehaviorToFpt() {
  const startTime = new Date();
  console.log('Loading data from db ...');
  let list = await userBehaviorService.getDataWithCalculateScore();
  console.log(`Loaded ${list.length} items from db !`);

  const datasetName = 'UserBehaviorDataset';
  const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/dataset/';
  const apiToken = process.env.FPT_API_TOKEN;

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: apiToken }
  });

  let countError = 0, countSuccess = 0, total = list.length;
  let errorDetails = [];
  let isSuccess = true;

  while (countSuccess < total) {
    try {
      const url = `/${datasetName}/${countSuccess === 0 ? 'overwrite' : 'append'}`;
      const item = list[countSuccess];
      await axiosInstance.post(url, [item]);
      countSuccess++;
    } catch (err) {
      errorDetails.push({
        itemId: item.userData + '_' + item.productId,
        mgs: err.message,
        detail: JSON.stringify(err)
      });
      ++countError;
      if (countError > total) {
        isSuccess = false;
        break;
      }
    }
  }

  let mgs = `[From *${getFormatDateTime(startTime)}* to *${getFormatDateTime()}*]\n`;
  mgs += `Import user behavior data to FPT *${isSuccess ? 'succeed' : 'failed'}*. Success: *${countSuccess}*/${total} | Error: *${countError}*/${total}.`;
  if (errorDetails?.length > 0) {
    mgs += `\n\nError details: \n`;
    errorDetails.forEach(item => {
      mgs += `\t- *${item.itemId}* Message: ${item.mgs}, detail: ${item.detail}\n`;
    });
  }
  await SlackUtils.sendMessageSync(mgs, 'C029YEKCH5M');
}
