/* cSpell:disable */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { convert } from 'html-to-text';
import mongoose from 'mongoose';
import productService from '../src/services/products.service.js';

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database ' + process.env.MONGO_URI);
    main();
  })
  .catch(err => console.log('Connect to MongoDB failed', err));

async function main() {
  console.log('Loading data ...');
  let { list } = await productService.getAllProducts(null, 100000000000);
  console.log(`Loading data done, ${list.length} items`);

  const dirPath = path.join(process.cwd(), 'tool', 'logs');
  if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }

  fs.appendFileSync(path.join(dirPath, `product.csv`), `productId, sku, price, marketPrice`);
  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    for (let j = 0; j < item.variants.length; j++) {
      console.log(`${i + 1}/${list.length} - ${item.variants[j].sku}`);
      const element = item.variants[j];
      fs.appendFileSync(path.join(dirPath, `product.csv`), `\n${item._id}, ${element.sku}, ${element.price}, ${element.marketPrice}`);
    }
  }

}