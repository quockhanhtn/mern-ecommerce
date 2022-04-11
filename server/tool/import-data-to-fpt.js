/* cSpell:disable */
import axios from 'axios';
import fs from 'fs';
import { convert } from 'html-to-text';
import mongoose from 'mongoose';
import productService from '../src/services/products.service.js';

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database ' + process.env.MONGO_URI);
    main();
  })
  .catch(err => console.log('Connect to MongoDB failed', err));

const DATSET_NAME = 'CellphonesDataset';
const REQ_CONFIG = { headers: { Authorization: "a3fa7034b71ae0741665767fd902193e" } };
const REQ_URL = `https://recom.fpt.vn/api/v0.1/recommendation/dataset/${DATSET_NAME}/`;
const METHOD_OVERWRITE = `overwrite`;
const METHOD_APPEND = `append`;

async function loadData() {
  const result = await productService.getAllProducts(
    'slug,name,category,brand,variants.variantName,desc',
    100000,
    1,
    {},
    '_id',
    -1
  );
  return result.list.map(item => ({
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

async function main() {
  console.log('Loading data ...');
  let list = await loadData();
  console.log(`Loading data done, ${list.length} items`);


  // get current datetime in format yyyyMMdd
  const date = new Date();
  const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

  const filePath = process.cwd() + `/tool/${dateStr}imported.json`;
  let listImpoted = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

  if (listImpoted.length == list.length) {
    console.log('All items imported');
    return;
  }

  console.log('Clearing data ...');
  let isOverwrited = false;
  while (!isOverwrited) {
    try {
      await axios.post(REQ_URL + METHOD_OVERWRITE, [list[0]], REQ_CONFIG);
      isOverwrited = true;
      listImpoted.push(list[0].id);
    } catch (err) {
      console.log(`Error: ${err}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log('Clearing data done');

  for (let i = list.length - 1; i > 0; i--) {
    const data = list[i];
    if (listImpoted.indexOf(data.id) >= 0) {
      console.log(`--> Skip ${data.id}`);
      continue;
    }
    try {
      await axios.post(REQ_URL + METHOD_APPEND, [data], REQ_CONFIG);
      console.log(`${data.id} done`);
      listImpoted.push(data.id);
    } catch (error) {
      console.log(`${data.id} false ${error.message}`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(listImpoted));
}
