/* cSpell:disable */
import fs from 'fs';
import mongoose from 'mongoose';
import User from '../src/models/user.model.js';
import Category from '../src/models/category.model.js';
import Brand from '../src/models/brand.model.js';
import Product from '../src/models/product.model.js';

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
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000002'),
    order: 2,
    name: 'Máy tính bảng',
    image: '/public/uploads/categories/tablet.svg',
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000003'),
    order: 3,
    name: 'Đồng hồ',
    image: '/public/uploads/categories/watch.svg',
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000004'),
    order: 4,
    name: 'Laptop',
    image: '/public/uploads/categories/laptop.svg',
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000005'),
    order: 5,
    name: 'Máy ảnh',
    image: '/public/uploads/categories/camera.svg',
  },
  // Phụ kiện
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000006'),
    order: 6,
    name: 'Phụ kiện',
    image: '/public/uploads/categories/airpods.svg',
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
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Adapter sạc USB"
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000009'),
    order: 6.010101,
    name: 'Adapter sạc USB',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Adapter sạc Type C"
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000010'),
    order: 6.010102,
    name: 'Adapter sạc Type C',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Adapter sạc"
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000011'),
    order: 6.010103,
    name: 'Adapter sạc',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Adapter chuyển đổi
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000012'),
    order: 6.010104,
    name: 'Adapter chuyển đổi',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Sạc không dây
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000013'),
    order: 6.010105,
    name: 'Sạc không dây',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Sạc, cáp -> Adapter sạc, chuyển đổi -> Sạc xe hơi
  {
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
    name: 'Phụ kiện tablet',
    parent: mongoose.Types.ObjectId('c00000000000000000000026'),
  },
  // Phụ kiện -> Tai nghe
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000030'),
    order: 6.05,
    name: 'Tai nghe',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000031'),
    order: 6.0501,
    name: 'Không dây - True Wireles',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000032'),
    order: 6.0502,
    name: 'Bluetooth',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000033'),
    order: 6.0503,
    name: 'Chụp tai',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000034'),
    order: 6.0504,
    name: 'Có dây',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000035'),
    order: 6.0505,
    name: 'Gaming',
    parent: mongoose.Types.ObjectId('c00000000000000000000030'),
  },
  // Phụ kiện -> Loa
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000036'),
    order: 6.06,
    name: 'Loa',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000037'),
    order: 6.0601,
    name: 'Loa bluetooth',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000038'),
    order: 6.0602,
    name: 'Loa vi tính',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000039'),
    order: 6.0603,
    name: 'Loa kéo',
    parent: mongoose.Types.ObjectId('c00000000000000000000036'),
  },
  // Phụ kiện -> Phụ kiện laptop
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000040'),
    order: 6.07,
    name: 'Phụ kiện laptop',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000041'),
    order: 6.0701,
    name: 'Chuột máy tính',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000042'),
    order: 6.0702,
    name: 'Bàn phím',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000043'),
    order: 6.0703,
    name: 'Miếng lót chuột',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000044'),
    order: 6.0704,
    name: 'Phần mềm',
    parent: mongoose.Types.ObjectId('c00000000000000000000040'),
  },
  // Phụ kiện -> Thiết bị mạng
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000045'),
    order: 6.08,
    name: 'Thiết bị mạng',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Thiết bị lưu trữ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000046'),
    order: 6.09,
    name: 'Thiết bị lưu trữ',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000047'),
    order: 6.0901,
    name: 'Thẻ nhớ',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000048'),
    order: 6.0902,
    name: 'USB Type C',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000049'),
    order: 6.0903,
    name: 'USB 3.1',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000050'),
    order: 6.0904,
    name: 'USB 3.0',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000051'),
    order: 6.0905,
    name: 'USB 2.0',
    parent: mongoose.Types.ObjectId('c00000000000000000000046'),
  },
  // Phụ kiện -> Phụ kiện khác
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000052'),
    order: 6.10,
    name: 'Phụ kiện khác',
    image: '/public/uploads/categories/others.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }
];

const brandData = [
  {
    name: 'iPhone',
    desc: 'Apple iPhone',
    country: 'US',
    headQuarters: 'Cupertino, California, United States',
    founded: 1976,
    image: 'https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png'
  },
  {
    name: "MacBook",
    desc: "Apple MacBook",
    country: "US",
    headQuarters: 'Cupertino, California, United States',
    founded: 1976,
    image: "https://cdn.tgdd.vn/Brand/1/logo-macbook-149x40.png"
  },
  {
    name: "Apple Watch",
    desc: "Apple Watch",
    country: "US",
    headQuarters: 'Cupertino, California, United States',
    founded: 1976,
    image: "https://cdn.tgdd.vn/Brand/1/Apple7077-b26-220x48.png"
  },
  {
    name: "iPad",
    desc: "Apple iPad",
    country: "US",
    headQuarters: 'Cupertino, California, United States',
    founded: 1976,
    image: "https://cdn.tgdd.vn/Brand/1/iPad-(Apple)522-b_4.jpg"
  },
  {
    name: 'Samsung',
    desc: 'Thương hiệu chiếm lĩnh thị trường smartphone Việt. Samsung là tập đoàn đa quốc gia có trụ sở được đặt tại thủ đô Seoul, Hàn Quốc',
    country: 'KR',
    headQuarters: 'Seoul, Hàn Quốc',
    founded: 1938,
    image: 'https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png'
  },
  {
    name: 'Oppo',
    desc: '',
    country: 'CN',
    headQuarters: 'Dongguan, China',
    founded: 2004,
    image: 'https://cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg'
  },
  {
    name: 'Vivo',
    desc: '',
    country: 'CN',
    headQuarters: 'Dongguan, China',
    founded: 2009,
    image: 'https://cdn.tgdd.vn/Brand/1/Vivo42-b_50.jpg'
  },
  {
    name: 'Xiaomi',
    desc: '',
    country: 'CN',
    headQuarters: 'Beijing, China',
    founded: 2010,
    image: 'https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png'
  },
  {
    name: 'Realme',
    desc: '',
    country: 'CN',
    headQuarters: 'Shenzhen, China',
    founded: 2018,
    image: 'https://cdn.tgdd.vn/Brand/1/Realme42-b_37.png'
  },
  {
    name: 'Nokia',
    desc: '',
    country: 'FI',
    headQuarters: 'Espoo, Finland',
    founded: 1865,
    image: 'https://cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg'
  },
  {
    name: 'Mobell',
    desc: 'Mobell là nhãn hiệu di động đến từ "Đảo quốc sư tử" Singapore, có nhà máy sản xuất ở Singapore và Trung Quốc',
    country: 'SG',
    headQuarters: '',
    founded: 2012,
    image: 'https://cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg'
  },
  {
    name: 'Itel',
    desc: '',
    country: 'CN',
    headQuarters: 'Shenzhen, China',
    founded: 2014,
    image: 'https://cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg'
  },
  {
    name: 'Masstel',
    desc: 'Masstel là thương hiệu công nghệ Việt thuộc Công ty Cổ phần Masscom Việt Nam',
    country: 'VN',
    headQuarters: '',
    founded: 2010,
    image: 'https://cdn.tgdd.vn/Brand/1/Masstel42-b_0.png'
  },
  {
    name: 'Energizer',
    desc: '',
    country: 'US',
    headQuarters: 'St. Louis, Missouri, United States',
    founded: 1896,
    image: 'https://cdn.tgdd.vn/Brand/1/Energizer42-b_32.jpg'
  },
  {
    name: 'Garmin',
    desc: '',
    country: 'US',
    headQuarters: 'Olathe, Kansas, United States',
    founded: 1989,
    image: 'https://cdn.tgdd.vn/Brand/1/Garmin7077-b_13.png'
  },
  {
    name: 'BeU',
    desc: 'Đồng hồ thông minh BeU là sản phẩm mang thương hiệu Việt, được sản xuất và phân phối bởi công ty Công ty Cổ phần Đầu tư Thế Giới Di Động (MWG)',
    country: 'VN',
    headQuarters: '',
    image: 'https://cdn.tgdd.vn/Brand/1/BeU7077-b_18.jpg'
  },
  {
    name: 'Kidcare',
    desc: 'Kidcare là hãng sản xuất đồng hồ thông minh dành riêng cho trẻ em, bên cạnh việc giúp cho trẻ theo dõi giờ giấc thì còn hỗ trợ phụ huynh dõi theo con em mình mà không cần phải 24/24 giờ theo sát',
    country: 'CN',
    headQuarters: '',
    image: 'https://cdn.tgdd.vn/Brand/1/Kidcare7077-b_5.jpg'
  },
  {
    name: 'Suunto',
    desc: 'Suunto là thương hiệu đồng hồ được thành lập vào năm 1936 ở Phần Lan bởi ông Tuomas Vohlonen, một nhà khảo sát cổ tài năng',
    country: 'FI',
    headQuarters: 'Vantaa, Phần Lan',
    founded: 1936,
    image: 'https://cdn.tgdd.vn/Brand/1/Suunto7077-b_14.png'
  },
  {
    name: 'Huami Amazfit',
    desc: 'Huami là hãng chuyên cung cấp các dịch vụ chăm sóc sức khỏe thông qua các thiết bị đeo thông minh hàng đầu thế giới',
    country: 'CN',
    headQuarters: 'Hefei, China',
    founded: 2013,
    image: 'https://cdn.tgdd.vn/Brand/1/Huami-Amazfit7077-b_30.jpg'
  },
  {
    name: 'Oaxis MyFirst Fone',
    desc: 'Oaxis - một thương hiệu công nghệ hướng đến sức khỏe có tiếng tại Singapore',
    country: 'SG',
    headQuarters: '',
    founded: 2010,
    image: 'https://cdn.tgdd.vn/Brand/1/Oaxis-MyFirst-Fone7077-b_25.jpg'
  },
  {
    name: 'Abardeen',
    desc: 'Abardeen là thương hiệu đồng hồ thông minh trẻ em thuộc công ty Shenzhen Continental Wireless Co',
    country: 'CN',
    headQuarters: '',
    image: 'https://cdn.tgdd.vn/Brand/1/Abardeen7077-b_25.jpg'
  },
  {
    name: 'Huawei',
    desc: '',
    country: 'CN',
    headQuarters: 'Shenzhen, China',
    founded: 1987,
    image: 'https://cdn.tgdd.vn/Brand/1/Huawei522-b_4.jpg'
  },
  {
    name: 'Lenovo',
    desc: '',
    country: 'HK',
    headQuarters: 'Quarry Bay, Hong Kong',
    founded: 1984,
    image: 'https://cdn.tgdd.vn/Brand/1/Lenovo522-b_6.jpg'
  },
  {
    name: "Asus",
    desc: "",
    country: "TW",
    headQuarters: "Beitou District, Taipei, Taiwan",
    founded: 1989,
    image: "https://cdn.tgdd.vn/Brand/1/logo-asus-149x40.png"
  },
  {
    name: "HP",
    "desc": "",
    "country": "US",
    "headQuarters": "Palo Alto, California, United States",
    "founded": 1998,
    image: "https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png"
  },
  {
    name: "Acer",
    desc: "",
    country: "TW",
    headQuarters: "New Taipei City, Taiwan",
    founded: 1976,
    image: "https://cdn.tgdd.vn/Brand/1/logo-acer-149x40.png"
  },
  {
    name: "Dell",
    desc: "",
    country: "US",
    headQuarters: "Round Rock, Texas, United States",
    founded: 1984,
    image: "https://cdn.tgdd.vn/Brand/1/logo-dell-149x40.png"
  },
  {
    name: "MSI",
    desc: "Micro-Star International",
    country: "TW",
    headQuarters: "Zhonghe District, Taipei, Taiwan",
    founded: 1986,
    image: "https://cdn.tgdd.vn/Brand/1/logo-msi-149x40.png"
  },
  {
    name: "LG",
    desc: "",
    country: "KR",
    headQuarters: "Seoul, South Korea",
    founded: 1947,
    image: "https://cdn.tgdd.vn/Brand/1/logo-lg-149x40.png"
  },
  {
    name: "Gigabyte",
    desc: "",
    country: "TW",
    headQuarters: "New Taipei City, Taiwan",
    founded: 1986,
    image: "https://cdn.tgdd.vn/Brand/1/logo-gigabyte-149x40.png"
  },
  {
    name: "Intel",
    desc: "",
    country: "US",
    headQuarters: "Santa Clara, California, United States",
    founded: 1968,
    image: "https://cdn.tgdd.vn/Brand/1/logo-intel-149x40.png"
  },
  {
    name: "Surface",
    desc: "Microsoft Surface",
    country: "US",
    headQuarters: "Redmond, Washington, United States",
    founded: 1975,
    image: "https://cdn.tgdd.vn/Brand/1/logo-surface-149x40-1.png"
  },
  {
    name: "Chuwi",
    desc: "",
    country: "CN",
    headQuarters: "",
    founded: 2004,
    image: "https://cdn.tgdd.vn/Brand/1/logo-chuwi-149x40.png"
  },
  {
    name: "Anker",
    image: "https://cdn.tgdd.vn/Brand/1/Anker57-b_11.png"
  },
  {
    name: "Xmobile",
    image: "https://cdn.tgdd.vn/Brand/1/Xmobile57-b_42.jpg"
  },
  {
    name: "AVA",
    image: "https://cdn.tgdd.vn/Brand/1/AVA57-b_50.jpg"
  },
  {
    name: "AVA+",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-10.jpg"
  },
  {
    name: "Hydrus",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-3.jpg"
  },
  {
    name: "Hyper",
    image: "https://cdn.tgdd.vn/Brand/1/HyperDrive9499-b11-220x48-1.jpg"
  },
  {
    name: "Belkin",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-23.jpg"
  },
  {
    name: "eValu",
    image: "https://cdn.tgdd.vn/Brand/1/eValu57-b51-220x48-1.jpg"
  },
  {
    name: "eSaver",
    image: "https://cdn.tgdd.vn/Brand/1/eSaver57-b_47.jpg"
  },
  {
    name: "Mophie",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48.jpg"
  },
  {
    name: "Mbest",
    image: "https://cdn.tgdd.vn/Brand/1/Mbest57-b_9.jpg"
  },
  {
    name: "iWalk",
    image: "https://cdn.tgdd.vn/Brand/1/iWalk57-b_1.png"
  },
  {
    name: "AUKEY",
    image: "https://cdn.tgdd.vn/Brand/1/AUKEY57-b_21.png"
  },
  {
    name: "Sony",
    image: "https://cdn.tgdd.vn/Brand/1/Sony57-b_43.jpg"
  },
  {
    name: "Apple",
    image: "https://cdn.tgdd.vn/Brand/1/Apple9499-b_28.jpg"
  },
  {
    name: "Philips",
    image: "https://cdn.tgdd.vn/Brand/1/Philips9499-b_26.png"
  },
  {
    name: "Roman",
    image: "https://cdn.tgdd.vn/Brand/1/Roman9499-b_8.jpg"
  },
  {
    name: "VCOM",
    image: "https://cdn.tgdd.vn/Brand/1/logovcom-220x48-1.png"
  },
  {
    name: "Playa",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-25.jpg"
  },
  {
    name: "Omars",
    image: "https://cdn.tgdd.vn/Brand/1/Omars-58-b_35.jpg"
  },
  {
    name: "ECO",
    image: "https://cdn.tgdd.vn/Brand/1/ECO58-b_56.jpg"
  },
  {
    name: "Pisen",
    image: "https://cdn.tgdd.vn/Brand/1/Pisen58-b_24.jpg"
  },
  {
    name: "Leagtech",
    image: "https://cdn.tgdd.vn/Brand/1/Leagtech58-b_26.jpg"
  },
  {
    name: "Beats",
    image: "https://cdn.tgdd.vn/Brand/1/Beats54-b_21.jpg"
  },
  {
    name: "JBL",
    image: "https://cdn.tgdd.vn/Brand/1/JBL54-b_27.jpg"
  },
  {
    name: "Harman Kardon",
    image: "https://cdn.tgdd.vn/Brand/1/Harman-Kardon54-b_21.jpg"
  },
  {
    name: "Mozard",
    image: "https://cdn.tgdd.vn/Brand/1/Mozard54-b_35.jpg"
  },
  {
    name: "Jabra",
    image: "https://cdn.tgdd.vn/Brand/1/Jabra54-b_17.jpg"
  },
  {
    name: "Awei",
    image: "https://cdn.tgdd.vn/Brand/1/Awei54-b_50.jpg"
  },
  {
    name: "MozardX",
    image: "https://cdn.tgdd.vn/Brand/1/MozardX54-b_7.jpg"
  },
  {
    name: "Logitech",
    image: "https://cdn.tgdd.vn/Brand/1/Logitech54-b_40.jpg"
  },
  {
    name: "Kanen",
    image: "https://cdn.tgdd.vn/Brand/1/Kanen54-b_9.jpg"
  },
  {
    name: "Soundpeats",
    image: "https://cdn.tgdd.vn/Brand/1/Soundpeats54-b_10.jpg"
  },
  {
    name: "Plantronics",
    image: "https://cdn.tgdd.vn/Brand/1/Plantronics54-b_13.png"
  },
  {
    name: "Rapoo",
    image: "https://cdn.tgdd.vn/Brand/1/Rapoo54-b_55.png"
  },
  {
    name: "Corsair",
    image: "https://cdn.tgdd.vn/Brand/1/Corsair54-b_4.jpg"
  },
  {
    name: "JLab",
    image: "https://cdn.tgdd.vn/Brand/1/Logo-Jlab-lon-220x48-1.jpg"
  },
  {
    name: "Padmate",
    image: "https://cdn.tgdd.vn/Brand/1/LogoPadmatelớn-220x48.jpg"
  },
  {
    name: "Rezo",
    image: "https://cdn.tgdd.vn/Brand/1/LOGO-REZO-220x48-1.png"
  },
  {
    name: "Fenda",
    image: "https://cdn.tgdd.vn/Brand/1/Fenda2162-b_18.jpg"
  },
  {
    name: "Enkor",
    image: "https://cdn.tgdd.vn/Brand/1/Enkor2162-b_14.jpg"
  },
  {
    name: "Microlab",
    image: "https://cdn.tgdd.vn/Brand/1/logo-microlab-220x48-1.png"
  },
  {
    name: "Wetop",
    image: "https://cdn.tgdd.vn/Brand/1/Wetop2162-b_25.jpg"
  },
  {
    name: "iCutes",
    image: "https://cdn.tgdd.vn/Brand/1/iCutes2162-b_23.jpg"
  },
  {
    name: "Sandisk",
    image: "https://cdn.tgdd.vn/Brand/1/Sandisk-b.png"
  },
  {
    name: "Transcend",
    image: "https://cdn.tgdd.vn/Brand/1/Transcend-b.png"
  },
  {
    name: "Apacer",
    image: "https://cdn.tgdd.vn/Brand/1/Apacer-b.png"
  },
  {
    name: "Microsoft",
    image: "https://cdn.tgdd.vn/Brand/1/Microsoft86-b_0.jpg"
  },
  {
    name: "Genius",
    image: "https://cdn.tgdd.vn/Brand/1/Genius86-b_53.jpg"
  },
  {
    name: "Zadez",
    image: "https://cdn.tgdd.vn/Brand/1/Zadez86-b_8.jpg"
  },
  {
    name: "Anitech",
    image: "https://cdn.tgdd.vn/Brand/1/logo-anitech-220x48-1.jpg"
  },
  {
    name: "DareU",
    image: "https://cdn.tgdd.vn/Brand/1/logodareu-220x48-1.png"
  },
  {
    name: "HyperX",
    image: "https://cdn.tgdd.vn/Brand/1/logo-hyperx-1-220x48-1.jpg"
  },
  {
    name: "A4Tech",
    image: "https://cdn.tgdd.vn/Brand/1/logoa4tech-220x48-3.png"
  },
  {
    name: "Razer",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-13.jpg"
  },
  {
    name: "Totolink",
    image: "https://cdn.tgdd.vn/Brand/1/Totolink4727-b_20.jpg"
  },
  {
    name: "Tenda",
    image: "https://cdn.tgdd.vn/Brand/1/Tenda4727-b_40.png"
  },
  {
    name: "TP-Link",
    image: "https://cdn.tgdd.vn/Brand/1/TP-Link4727-b_48.jpg"
  },
  {
    name: "Mercusys",
    image: "https://cdn.tgdd.vn/Brand/1/Mercusys4727-b_26.jpg"
  },
  {
    name: "Linksys",
    image: "https://cdn.tgdd.vn/Brand/1/220-48-220x48-4.jpg"
  },
  {
    name: "D-Link",
    image: "https://cdn.tgdd.vn/Brand/1/160-40-160x40-12.jpg"
  },
  {
    name: "Audio Technica",
    country: "JP",
    founded: 1962,
    image: "https://cdn.tgdd.vn/Brand/1/Audio-Technica54-b_21.jpg",
    desc: "Chuyên sản xuất các thiết bị âm thanh như Tai nghe và Micro"
  }
];

const categoryMap = {
  'dtdd': mongoose.Types.ObjectId('c00000000000000000000001'),
  'may-tinh-bang': mongoose.Types.ObjectId('c00000000000000000000002'),
  'dong-ho-thong-minh': mongoose.Types.ObjectId('c00000000000000000000003'),
  'laptop': mongoose.Types.ObjectId('c00000000000000000000004'),
};
function escapeRegExp(str) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function standardPolicy(str) {
  [
    ' tại 3019 siêu thị toàn quốc (miễn phí tháng đầu)',
    ' - Tìm hiểu'
  ].forEach(item => {
    str = replaceAll(str, item, '');
  })
  return str;
}
function splitProductName(name) {
  if (name.startsWith('Máy tính bảng')) { return name.replace('Máy tính bảng', '').trim(); }
  if (name.startsWith('Đồng hồ thông minh')) { return name.replace('Đồng hồ thông minh', '').trim(); }
  if (name.startsWith('Điện thoại')) { return name.replace('Điện thoại', '').trim(); }
  if (name.startsWith('Laptop')) { return name.replace('Laptop', '').trim(); }
  return name;
}

async function insertProduct() {
  const filePath = process.cwd() + '/tool/product.00.json';
  const filePath2 = process.cwd() + '/tool/product.01.json';

  let listProduct = [
    ...JSON.parse(fs.readFileSync(filePath)),
    ...JSON.parse(fs.readFileSync(filePath2)),
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

  console.log('--> Insert category data');
  for (let i = 0; i < brandData.length; i++) {
    const element = brandData[i];
    element._id = mongoose.Types.ObjectId('b' + zeroFill(1 + i, 23));
    element.createdBy = mongoose.Types.ObjectId("a00000000000000000000001");
    element.updatedBy = mongoose.Types.ObjectId("a00000000000000000000001");
    const newBrand = new Brand(element);
    await newBrand.save();
    console.log(`[${i + 1}/${brandData.length}] Inserted brand: ` + element.name);
  }

  console.log('--> Insert product data');
  await insertProduct();

  console.log('\nINSERT SAMPLE DATA DONE');
  console.log((new Date()).toLocaleString());
  process.exit(1);
}