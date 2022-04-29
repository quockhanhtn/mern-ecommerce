/* cSpell:disable */
import fs from 'fs';
import mongoose from 'mongoose';
import User from '../src/models/user.model.js';
import Category from '../src/models/category.model.js';
import Brand from '../src/models/brand.model.js';
import Product from '../src/models/product.model.js';
import StringUtils from '../src/utils/StringUtils.js';

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database ' + process.env.MONGO_URI);
    insertData();
  })
  .catch(err => console.log('Connect to MongoDB failed', err));


const userData = [
  // role admin
  {
    "_id": mongoose.Types.ObjectId("a00000000000000000000001"),
    "firstName": "Admin",
    "lastName": "Account",
    "gender": "other",
    "email": "admin@hk.com",
    "phone": "0123456689",
    "username": "admin",
    "password": "12",
    "role": "admin",
    "status": 'active'
  },
  // role staff
  {
    "_id": mongoose.Types.ObjectId("a00000000000000000000002"),
    "firstName": "Staff",
    "lastName": "Account",
    "gender": "other",
    "email": "staff001@hk.com",
    // "phone": "0123456689",
    "username": "staff",
    "password": "12",
    "role": "staff",
    "status": 'active'
  }
];

const categoryData = [
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000001'),
    order: 1,
    name: 'Điện thoại',
    image: '/public/uploads/categories/phone.svg',
    coverImage: '/public/uploads/categories/cover/phone.jpg',
  },
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000002'),
    order: 2,
    name: 'Máy tính bảng',
    image: '/public/uploads/categories/tablet.svg',
    coverImage: '/public/uploads/categories/cover/tablet.jpg',
  },
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000003'),
    order: 3,
    name: 'Đồng hồ',
    image: '/public/uploads/categories/watch.svg',
    coverImage: '/public/uploads/categories/cover/watch.jpg',
  },
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000004'),
    order: 4,
    name: 'Laptop',
    image: '/public/uploads/categories/laptop.svg',
    coverImage: '/public/uploads/categories/cover/laptop.jpg',
  },
  //#region Âm thanh
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000005'),
    order: 5,
    name: 'Âm thanh',
    image: '/public/uploads/categories/sound.svg',
    coverImage: '/public/uploads/categories/cover/sound.jpg',
  },
  // Âm thanh -> Tai nghe
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000030'),
    order: 5.01,
    name: 'Tai nghe',
    parent: mongoose.Types.ObjectId('c00000000000000000000005'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000031'),
    order: 5.0101,
    name: 'Không dây - True Wireles',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000032'),
    order: 5.0102,
    name: 'Bluetooth',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000033'),
    order: 5.0103,
    name: 'Chụp tai',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000034'),
    order: 5.0104,
    name: 'Có dây',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000035'),
    order: 5.0105,
    name: 'Gaming',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  },
  // Âm thanh -> Loa
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000036'),
    order: 5.02,
    name: 'Loa',
    parent: mongoose.Types.ObjectId('c00000000000000000000005'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000037'),
    order: 5.0201,
    name: 'Loa bluetooth',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000038'),
    order: 5.0202,
    name: 'Loa vi tính',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000039'),
    order: 5.0203,
    name: 'Loa kéo',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  },
  //#endregion
  //#region Phụ kiện
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000006'),
    order: 6,
    name: 'Phụ kiện',
    image: '/public/uploads/categories/accessories.svg',
    coverImage: '/public/uploads/categories/cover/accessories.jpg',
  },
  // Phụ kiện -> Sạc, cáp
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000007'),
    order: 6.01,
    name: 'Sạc, cáp',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000008'),
    order: 6.0101,
    name: 'Adapter sạc, chuyển đổi',
    parent: mongoose.Types.ObjectId('c00000000000000000000007'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000009'),
    order: 6.010101,
    name: 'Adapter sạc USB',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000010'),
    order: 6.010102,
    name: 'Adapter sạc Type C',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000011'),
    order: 6.010103,
    name: 'Adapter sạc',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000012'),
    order: 6.010104,
    name: 'Adapter chuyển đổi',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000013'),
    order: 6.010105,
    name: 'Sạc không dây',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000014'),
    order: 6.010106,
    name: 'Sạc xe hơi',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  //Phụ kiện -> Sạc, cáp -> Cáp sạc, chuyển đổi
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000015'),
    order: 6.0102,
    name: 'Cáp sạc, chuyển đổi',
    parent: mongoose.Types.ObjectId('c00000000000000000000007'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000016'),
    order: 6.010201,
    name: 'Cáp Lightning',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000017'),
    order: 6.010202,
    name: 'Cáp Type C',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000018'),
    order: 6.010203,
    name: 'Cáp Micro USB',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000019'),
    order: 6.010204,
    name: 'Cáp chuyển đổi',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000020'),
    order: 6.010205,
    name: 'Cáp 3 đầu',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000021'),
    order: 6.010206,
    name: 'Cáp âm thanh',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000022'),
    order: 6.010207,
    name: 'Cáp sạc Apple Watch',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000023'),
    order: 6.010208,
    name: 'Cáp khác',
    parent: mongoose.Types.ObjectId('c00000000000000000000015'),
  },
  // Phụ kiện -> Sạc dự phòng
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000024'),
    order: 6.02,
    name: 'Sạc dự phòng',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Dán màn hình
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000025'),
    order: 6.03,
    name: 'Dán màn hình',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Ốp lưng, bao da
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000026'),
    order: 6.04,
    name: 'Ốp lưng, bao da',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000027'),
    order: 6.0401,
    name: 'Ốp lưng điện thoại',
    parent: mongoose.Types.ObjectId('c00000000000000000000026'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000028'),
    order: 6.0402,
    name: 'Ốp lưng tablet',
    parent: mongoose.Types.ObjectId('c00000000000000000000026'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000029'),
    order: 6.0403,
    name: 'Bao da',
    parent: mongoose.Types.ObjectId('c00000000000000000000026'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000053'),
    order: 6.0404,
    name: 'Phụ kiện tablet',
    parent: mongoose.Types.ObjectId('c00000000000000000000026'),
  },
  // Phụ kiện -> Phụ kiện laptop
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000040'),
    order: 6.05,
    name: 'Phụ kiện laptop',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000041'),
    order: 6.0501,
    name: 'Chuột máy tính',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000042'),
    order: 6.0502,
    name: 'Bàn phím',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000043'),
    order: 6.0503,
    name: 'Miếng lót chuột',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000044'),
    order: 6.0504,
    name: 'Phần mềm',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  },
  // Phụ kiện -> Thiết bị mạng
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000045'),
    order: 6.06,
    name: 'Thiết bị mạng',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Thiết bị lưu trữ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000046'),
    order: 6.07,
    name: 'Thiết bị lưu trữ',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000047'),
    order: 6.0701,
    name: 'Thẻ nhớ',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000048'),
    order: 6.0702,
    name: 'USB Type C',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000049'),
    order: 6.0703,
    name: 'USB 3.1',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000050'),
    order: 6.0704,
    name: 'USB 3.0',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000051'),
    order: 6.0705,
    name: 'USB 2.0',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  },
  // Phụ kiện -> Phụ kiện khác
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000052'),
    order: 6.08,
    name: 'Phụ kiện khác',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }
  //#endregion
];

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

async function insertProduct() {
  const filePath = process.cwd() + '/tool/product.all.json';
  // const filePath0 = process.cwd() + '/tool/product.00.json';
  // const filePath1 = process.cwd() + '/tool/product.01.json';
  // const filePath2 = process.cwd() + '/tool/product.02.json';

  let listProduct = [
    ...JSON.parse(fs.readFileSync(filePath)),
    // ...JSON.parse(fs.readFileSync(filePath0)),
    // ...JSON.parse(fs.readFileSync(filePath1)),
    // ...JSON.parse(fs.readFileSync(filePath2)),
  ];
  const listBrand = await Brand.find({}).lean().exec();

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
      variantName: v.variantName,
      sku: v.sku,
      thumbnail: v.images[1].map(item => item.startsWith('//') ? `https:${item}` : item)[0],
      pictures: v.images[1].slice(1).map(item => item.startsWith('//') ? `https:${item}` : item),
      price: parseInt(v.price, 10),
      marketPrice: parseInt(v.price, 10) * ((100 + getRandomInt(5, 30)) / 100),
      quantity: getRandomInt(1, 20) * 5
    }));
    await product.save();
    console.log(`[${i + 1}/${listProduct.length}] Insert product '${product.name}' success`);
  }
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

async function insertData() {
  console.log('REMOVE ALL DOCUMENTS IN DATABASE\n');
  await User.deleteMany({});
  await Category.deleteMany({});
  await Brand.deleteMany({});
  await Product.deleteMany({});

  console.log('START INSERT SAMPLE DATA\n');
  console.log('--> Insert user data');
  for (let i = 0; i < userData.length; i++) {
    const element = userData[i];
    const newUser = new User(element);
    await newUser.save();
    console.log(`[${i + 1}/${userData.length}] Inserted user: ` + element.username);
  }

  console.log('--> Insert category data');
  for (let i = 0; i < categoryData.length; i++) {
    const element = categoryData[i];
    const newCategory = new Category(element);

    if (element.parent) {
      const parent = await Category.findById(element.parent);
      if (parent) {
        newCategory.parent = parent._id;
        await Category.findByIdAndUpdate(parent._id, {
          $addToSet: { children: newCategory._id },
        });
      } else {
        console.log(`Parent category '${element.parent}' not found!`);
      }
    }

    newCategory.createdBy = mongoose.Types.ObjectId("a00000000000000000000001");
    newCategory.updatedBy = mongoose.Types.ObjectId("a00000000000000000000001");

    await newCategory.save();
    console.log(`[${i + 1}/${categoryData.length}] Inserted category: ` + element.name);
  }

  console.log('--> Insert brand data');
  let listBrand = [...JSON.parse(fs.readFileSync(process.cwd() + '/tool/json/brand.json'))];
  for (let i = 0; i < listBrand.length; i++) {
    const element = listBrand[i];
    element._id = mongoose.Types.ObjectId('b' + zeroFill(1 + i, 23));
    element.createdBy = mongoose.Types.ObjectId("a00000000000000000000001");
    element.updatedBy = mongoose.Types.ObjectId("a00000000000000000000001");
    const newBrand = new Brand(element);
    await newBrand.save();
    console.log(`[${i + 1}/${listBrand.length}] Inserted brand: ` + element.name);
  }

  console.log('--> Insert product data');
  await insertProduct();

  console.log('\nINSERT SAMPLE DATA DONE');
  console.log((new Date()).toLocaleString());
  process.exit(1);
}