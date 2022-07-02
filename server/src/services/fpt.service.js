import axios from 'axios';
import mongoose from 'mongoose';
import { convert } from 'html-to-text';

import productService from './products.service.js';
import categoryService from './categories.service.js';
import brandService from './brands.service.js';
import userBehaviorService from './user-behavior.service.js';

import ProductRecom from '../models/product-recom.model.js';
import Product from '../models/product.model.js';
import SlackUtils from '../utils/SlackUtils.js';
import StringUtils from '../utils/StringUtils.js';
import FormatUtils from '../utils/FormatUtils.js';


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
  const { list } = await productService.getAllProducts({
    fields: 'slug,name,category,brand,variants.variantName,desc',
    limit: 1000000,
    sortBy: '_id',
    sortType: -1
  });
  return list.map(item => {
    const desc = convert(item.desc)
      .replace(/\[[^\]\[]*\]/g, ' ')
      .replace(/:+/g, ' ')
      .replace(/\/+/g, ' ')
      .replace(/\\n+/g, ' ')
      .replace(/,+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace('Nguồn: thegioididong.com', '')
      .replace('Nguồn thegioididong.com', '')
      .trim();
    return {
      id: item._id.toString(),
      // slug: item.slug,
      name: StringUtils.removeAccents(item.name),
      category: item?.category?.name || 'No category',
      brand: item?.brand?.name || 'No brand',
      variants: item.variants.map(x => x.variantName).join(';'),
      desc: StringUtils.isBlankOrEmpty(desc) ? 'No description' : desc
    };
  });
}

const loadProductData2 = async () => {
  const { list } = await productService.getAllProducts({
    fields: 'slug,name,variants.variantName,desc,category,categorySub1,categorySub2,categorySub3,brand',
    limit: 1000000,
    sortBy: '_id',
    sortType: -1,
    populateCategory: false,
    populateBrand: false,
  });

  var allCategories = await categoryService.getAll('_id name', {});
  var allBrand = await brandService.getAll('_id name', {});

  return list.map(item => {
    const desc = StringUtils.keepLetterAndDigitOnly(StringUtils.htmlToText(item.desc))
      .replace('. Nguồn thegioididong.com', '')
      .replace('Nguồn thegioididong.com', '')
      .trim();
    // .replace('Nguồn thegioididong.com', '')
    // .replace('httpswwwthegioididongcom', '')
    // .replace('thegioididongcom', '');

    let convertItem = {
      id: item._id.toString(),
      // slug: item.slug,
      name: StringUtils.removeAccents(StringUtils.keepLetterAndDigitOnly(item.name)),
      category: '',
      brand: '',
      variants: StringUtils.removeAccents(item.variants.map(x => x.variantName).join(';') || 'No variants'),
      desc: StringUtils.isBlankOrEmpty(desc) ? 'No description' : StringUtils.removeAccents(desc)
    };

    let cats = [];
    [item.category, item.categorySub1, item.categorySub2, item.categorySub3]
      .filter(x => x)
      .map(x => x.toString())
      .forEach(categoryId => {
        if (categoryId) {
          const category = allCategories.find(x => x._id.toString() === categoryId);
          if (category) {
            cats.push(category.name);
          }
        }
      });

    if (cats && cats.length > 0) {
      convertItem.category = StringUtils.removeAccents(cats.join(' | '));
    } else {
      convertItem.category = 'No category';
    }

    if (item.brand) {
      const b = allBrand.find(x => x._id.toString() === item.brand.toString());
      if (b) {
        convertItem.brand = StringUtils.removeAccents(b.name);
      } else {
        convertItem.brand = 'No brand';
      }
    } else {
      convertItem.brand = 'No brand';
    }

    // convertItem.category = new Array(allCategories.length).fill(0);
    // convertItem.brand = new Array(allBrand.length).fill(0);

    // var catIndex = allCategories.indexOf(item.category);
    // if (catIndex > -1) {
    //   convertItem.category[catIndex] = 1;
    // }
    // var brandIndex = allBrand.indexOf(item.brand);
    // if (brandIndex > -1) {
    //   convertItem.brand[brandIndex] = 1;
    // }

    // allCategories.forEach(id => convertItem[id] = 0);
    // // allBrand.forEach(id => convertItem[id] = 0);

    // if (item.category && allCategories.includes(item.category.toString())) {
    //   convertItem[item.category.toString()] = 1;
    // }
    // if (item.categorySub1 && allCategories.includes(item.categorySub1.toString())) {
    //   convertItem[item.categorySub1.toString()] = 1;
    // }
    // if (item.categorySub2 && allCategories.includes(item.categorySub2.toString())) {
    //   convertItem[item.categorySub2.toString()] = 1;
    // }
    // if (item.categorySub3 && allCategories.includes(item.categorySub3.toString())) {
    //   convertItem[item.categorySub3.toString()] = 1;
    // }
    // if (item.brand && allBrand.includes(item.brand.toString())) {
    //   convertItem[item.brand.toString()] = 1;
    // }

    return convertItem;
  });
}

async function importProductDataToFpt() {
  const startTime = new Date();
  console.log('Loading data from db ...');
  let list = await loadProductData2();
  console.log(`Loaded ${list.length} items from db !`);

  const datasetName = 'RelatedItem_Dataset';
  const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/dataset/';
  const apiToken = process.env.FPT_API_TOKEN;

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: apiToken }
  });

  let countError = 0, countSuccess = 0, total = list.length;
  let errorDetails = [];
  let isSuccess = true;
  let step = 20;

  let errorList = [];
  let requestFailed = 0;

  while (true) {
    const url = `/${datasetName}/${countSuccess === 0 ? 'overwrite' : 'append'}`;
    const items = list.slice(countSuccess, countSuccess + step);
    if (items.length === 0) {
      break;
    }
    try {
      let data = {};

      const res = await axiosInstance.post(url, items);
      data = res.data;

      if (data.msg === 'Success') {
        countSuccess += items.length;
        console.log(`Success: ${countSuccess}/${total}`);
        requestFailed = 0;
      } else {
        requestFailed++;
        if (requestFailed > 5) {
          countSuccess += items.length;
          errorList = [...errorList, ...items];
        }
      }
    } catch (err) {
      errorDetails.push({
        items,
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

  countSuccess -= errorList.length;

  for (let i = 0; i < errorList.length; i++) {
    const item = errorList[i];
    while (true) {
      try {
        const { data } = await axiosInstance.post(`/${datasetName}/append`, [item]);
        if (data.msg === 'Success') {
          countSuccess += 1;
          console.log(`Success: ${countSuccess}/${total}`);
          requestFailed = 0;
          errorList = errorList.filter(x => x !== item);
          i--;
          break;
        } else {
          requestFailed++;
          if (requestFailed > 5) {
            throw new Error(`Failed to import`);
          }
        }
      } catch (err) {
        errorDetails.push({
          items: [{ id: item.id, slug: item.slug }],
          mgs: err.message,
          detail: JSON.stringify(err)
        });
        ++countError;
        break;
      }
    }
  }

  const endTime = new Date();
  countError = errorDetails.length;

  let mgs = `[From *${getFormatDateTime(startTime)}* to *${getFormatDateTime(endTime)}*]`;
  mgs += `\nImport product data to FPT *${isSuccess ? 'succeed' : 'failed'}*. Success: *${countSuccess}*/${total} | Error: *${countError}*/${total}.`;
  mgs += `\nTotal time: *${FormatUtils.formateReadableTimeSpan(startTime, endTime)}*`;
  if (errorDetails?.length > 0) {
    mgs += `\n\nError details: \n`;
    errorDetails.forEach((item, index) => {
      mgs += `\t- ${index + 1}/${errorDetails.length} Message: ${item.mgs}, detail: ${item.detail}\n`;
      mgs += `\n\t\tItems: \n\`\`\`\n${JSON.stringify(item.items, null, 2)}\n\`\`\`\``;
    });
  }
  await SlackUtils.sendMessageSync(mgs, 'C02BFR5KSUW');
  console.log('Done!');
  console.log('errorList: ' + errorList.length + ' - ', errorList);
}

async function updateRecommendData() {
  const startTime = new Date();
  const url = 'https://recom.fpt.vn/api/v0.1/recommendation/api/result/getBatchResult';
  const fptApiId = process.env.FPT_RELATED_ITEM_ID;
  const fptApiKey = process.env.FPT_RELATED_ITEM_KEY;

  const axiosInstance = axios.create({ baseURL: url });

  const nextVersion = Date.now();

  let page = 0, countError = 0, countSuccess = 0;
  let errorDetails = [];
  let isSuccess = true;

  while (true) {
    try {
      console.log(`Page: ${page}`);
      const { data } = await axiosInstance.get(fptApiId, { params: { page, key: fptApiKey } });

      if (data.message === 'No data found' || !data.data) {
        break;
      }

      for (let i = 0; i < data.data.length; i++) {
        let { input_id, recommend_id } = data.data[i];
        recommend_id = recommend_id.filter(x => x.includes('"id":'))
        const productId = input_id.toString().replace(/}/g, '').replace(/{/g, '');

        const newItem = new ProductRecom({
          _id: new mongoose.Types.ObjectId(),
          productId,
          recommend: recommend_id.map(x => x.toString()
            .replace(/}/g, '').replace(/{/g, '')
            .replace(/\[/g, '').replace(/]/g, '')
            .replace(/\"/g, '').replace('id:', '')
            .replace(/\s/g, '')
          ),
          version: nextVersion
        });
        await newItem.save();
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

      if (countError > 10) {
        isSuccess = false;
        break;
      }
    }
  }

  let mgs = `[From *${getFormatDateTime(startTime)}* to *${getFormatDateTime()}*]\n`;
  mgs += `Update recommend data *${isSuccess ? 'succeed' : 'failed'}*. Total page: ${page} | Success: ${countSuccess} | Error: ${countError}.`;
  if (errorDetails?.length > 0) {
    mgs += `\n\nError details: \n`;
    errorDetails.forEach(item => {
      mgs += `\t- *${item.page}* Message: ${item.errorMgs}, stack: ${item.stack}\n`;
    });
  }

  await SlackUtils.sendMessageSync(mgs, 'C02BFR5KSUW');
}

async function importUserBehaviorToFpt() {
  const startTime = new Date();
  console.log('Loading data from db ...');
  let list = await userBehaviorService.getDataWithCalculateScore();
  console.log(`Loaded ${list.length} items from db !`);

  const datasetName = 'UserBased_Dataset';
  const baseURL = 'https://recom.fpt.vn/api/v0.1/recommendation/dataset/';
  const apiToken = process.env.FPT_API_TOKEN;

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: apiToken }
  });

  let countError = 0, countSuccess = 0, total = list.length;
  let errorDetails = [];
  let isSuccess = true;

  while (true) {
    const url = `/${datasetName}/${countSuccess === 0 ? 'overwrite' : 'append'}`;
    // const item = list[countSuccess];
    const items = list.slice(countSuccess, countSuccess + 100);
    if (items.length === 0) {
      break;
    }
    try {
      await axiosInstance.post(url, items);
      countSuccess += items.length;
      console.log(`Success: ${countSuccess}/${total}`);
    } catch (err) {
      errorDetails.push({
        items: items.map(x => ({ id: x.id, slug: x.slug })),
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
  mgs += `\nTotal time: ${FormatUtils.formateReadableTimeSpan(startTime, new Date())}`;
  if (errorDetails?.length > 0) {
    mgs += `\n\nError details: \n`;
    errorDetails.forEach(item => {
      mgs += `\t- Message: ${item.mgs}, detail: ${item.detail}\n`;
      mgs += `\n: Items: \n\`\`\`\n${JSON.stringify(item.items, null, 2)}\n\`\`\`\``;
    });
  }
  await SlackUtils.sendMessageSync(mgs, 'C029YEKCH5M');
}
