/* cSpell:disable */
import fs from 'fs';
import mongoose from 'mongoose';
import User from '../src/models/user.model.js';
import Category from '../src/models/category.model.js';
import Brand from '../src/models/brand.model.js';
import Product from '../src/models/product.model.js';
import StringUtils from '../src/utils/StringUtils.js';

const categoryMap = {
  'dtdd': mongoose.Types.ObjectId('c00000000000000000000001'),
  'may-tinh-bang': mongoose.Types.ObjectId('c00000000000000000000002'),
  'dong-ho-thong-minh': mongoose.Types.ObjectId('c00000000000000000000003'),
  'laptop': mongoose.Types.ObjectId('c00000000000000000000004'),
  'am-thanh': mongoose.Types.ObjectId('c00000000000000000000005'),
  'phu-kien': mongoose.Types.ObjectId('c00000000000000000000006'),
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function standardPolicy(str) {
  [
    ' tại 3019 siêu thị toàn quốc (miễn phí tháng đầu)',
    ' - Tìm hiểu'
  ].forEach((item) => {
    str = StringUtils.replaceAll(str, item, '');
  })
  return str;
}
function splitProductName(name) {
  if (name.startsWith('Laptop')) { return name.replace('Laptop', '').trim(); }

  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '16GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '32GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '64GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '128GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '256GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '512GB', ' '));
  name = StringUtils.removeMultiSpace(StringUtils.replaceAll(name, '1TB', ' '));

  if (name.startsWith('Máy tính bảng')) { return name.replace('Máy tính bảng', '').trim(); }
  if (name.startsWith('Đồng hồ thông minh')) { return name.replace('Đồng hồ thông minh', '').trim(); }
  if (name.startsWith('Điện thoại')) { return name.replace('Điện thoại', '').trim(); }

  return name;
}
function roundPrice(price) {
  let input = price;
  let result = 1;
  while (input > 100) {
    result *= 10;
    input = Number.parseInt(input / 10);
  }

  return Math.round(price / result) * result;
}

async function insertProduct() {
  const filePath = process.cwd() + '/tool/product.all.json';

  let listProduct = [
    ...JSON.parse(fs.readFileSync(filePath)),
    // ...JSON.parse(fs.readFileSync(filePath0)),
    // ...JSON.parse(fs.readFileSync(filePath1)),
    // ...JSON.parse(fs.readFileSync(filePath2)),
  ].sort((a, b) => {
    const catCompare = categoryMap[a.link].toString().localeCompare(categoryMap[b.link].toString());
    if (catCompare != 0) {
      return catCompare;
    }

    if (a.brandName.toLowerCase() === b.brandName.toLowerCase()) {
      return a.productName.localeCompare(b.productName.toLowerCase());
    }

    if (a.brandName.toLowerCase() === 'apple' && b.brandName.toLowerCase() !== 'apple') {
      return -1;
    }

    if (a.brandName.toLowerCase() === 'samsung' && b.brandName.toLowerCase() !== 'apple') {
      return 1;
    }

    return categoryMap[a.link].toString().localeCompare(categoryMap[b.link].toString());
  });
  const listBrand = await Brand.find({}).lean().exec();

  const productQueue = [];

  for (let i = 0; i < listProduct.length; i++) {
    const element = listProduct[i];
    let brandToFind = element.brandName.toLowerCase();
    if (element.brandName.toLowerCase() === 'apple') {
      if (element.link === 'dtdd') {
        brandToFind = 'iphone';
      } else if (element.link === 'may-tinh-bang') {
        brandToFind = 'ipad';
      } else if (element.link === 'dong-ho-thong-minh') {
        brandToFind = 'apple watch';
      }
    }

    const brand = listBrand.filter(item => item.name.toLowerCase() === brandToFind)[0];
    const product = new Product({
      _id: mongoose.Types.ObjectId('d' + zeroFill(1 + i, 23)),
      name: splitProductName(element.productName),
      desc: element.productDesc,
      warrantyPeriod: 12,
      category: categoryMap[element.link],
      brand: brand?._id,
      overSpecs: element.overviewSpecs.map(item => ({
        name: item.key,
        values: item.values
      })),
      detailSpecs: element.detailSpecs.map(item => ({
        groupName: item.groupName,
        groupItems: item.groupList.map(sub => ({
          name: sub.key,
          values: sub.values
        }))
      })),
    });
    if (element.youtubeVideoId) { product.video = element.youtubeVideoId; }
    if (element.productPolicies) { product.policies = element.productPolicies.map(item => standardPolicy(item)); }
    if (element.hightLightImgs) { product.hightLightPics = element.hightLightImgs; }
    if (element.specThumb) { product.specPicture = element.specThumb; }
    if (element.key) { product.crawlKey = element.key; }

    if (element?.productCatalogSub1Id) {
      product.categorySub1 = mongoose.Types.ObjectId(element.productCatalogSub1Id);
      if (element.productCatalogSub2Id) {
        product.categorySub2 = mongoose.Types.ObjectId(element.productCatalogSub2Id);
        if (element.productCatalogSub3Id) {
          product.categorySub3 = mongoose.Types.ObjectId(element.productCatalogSub3Id);
        }
      }
    }

    product.variants = element.variants.map(v => ({
      variantName: v.variantName.trim() !== 'Hình sản phẩm' ? v.variantName.trim() : '',
      sku: v.sku,
      thumbnail: v.images[1].map(item => item.startsWith('//') ? `https:${item}` : item)[0],
      pictures: v.images[1].slice(1).map(item => item.startsWith('//') ? `https:${item}` : item),
      price: parseInt(v.price, 10),
      marketPrice: roundPrice(
        parseInt(v.price, 10) * ((100 + getRandomInt(5, 30)) / 100)
      ),
      quantity: getRandomInt(1, 20) * 5
    }));

    productQueue.push(product);
  }

  let j = 0;
  for (let i = productQueue.length - 1; i >= 0; i--) {
    const product = productQueue[i];

    const exitProduct = await Product.findById(product._id).exec();
    if (exitProduct) {
      console.log(`[${++j}/${listProduct.length}] Skip ${product._id} - ${product.name} already exists`);
      continue;
    }

    await product.save();
    console.log(`[${++j}/${listProduct.length}] Insert product '${product.name}' success`);
  }

  console.log('Insert product success');
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

export const insertData = async () => {
  console.log('START INSERT SAMPLE DATA\n');
  console.log('--> Insert product data');

  await insertProduct();

  console.log('\nINSERT SAMPLE DATA DONE');
  console.log((new Date()).toLocaleString());
  process.exit(1);
};
