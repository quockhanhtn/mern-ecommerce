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
  // Phụ kiện -> Thiết bị âm thanh
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000007'),
    order: 6.01,
    name: 'Thiết bị âm thanh',
    image: '/public/uploads/categories/sound.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000008'),
    order: 6.0101,
    name: 'Tai nghe',
    image: '/public/uploads/categories/headphone.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000007'),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe -> Tai nghe Bluetooth
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000009'),
    order: 6.010101,
    name: 'Tai nghe Bluetooth',
    image: '/public/uploads/categories/bluetooth.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe -> Tai nghe có dây
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000010'),
    order: 6.010102,
    name: 'Tai nghe có dây',
    image: '/public/uploads/categories/earphone.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Loa
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000011'),
    order: 6.0102,
    name: 'Loa',
    image: '/public/uploads/categories/speaker.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000007')
  },
  // Phụ kiện -> Thiết bị lưu trữ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000012'),
    order: 6.02,
    name: 'Thiết bị lưu trữ',
    image: '/public/uploads/categories/data-storage.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> Thẻ nhớ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000013'),
    order: 6.0201,
    name: 'Thẻ nhớ',
    image: '/public/uploads/categories/sd-storage.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> USB
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000014'),
    order: 6.0202,
    name: 'USB',
    image: '/public/uploads/categories/usb.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> Ổ cứng di động
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000015'),
    order: 6.0203,
    name: 'Ổ cứng di động',
    image: '/public/uploads/categories/hdd.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
  },
  // Phụ kiện -> Phụ kiện điện thoại
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000016'),
    order: 6.03,
    name: 'Phụ kiện điện thoại',
    image: '/public/uploads/categories/phone-accessories.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Pin sạc dự phòng
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000017'),
    order: 6.0301,
    name: 'Pin sạc dự phòng',
    image: '/public/uploads/categories/power-bank.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Sim, thẻ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000018'),
    order: 6.0302,
    name: 'Sim, thẻ',
    image: '/public/uploads/categories/sim.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Miếng dán màn hình
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000019'),
    order: 6.0303,
    name: 'Miếng dán màn hình',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Ốp lưng, bao da
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001a'),
    order: 6.0304,
    name: 'Ốp lưng, bao da',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Gậy tự sướng
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001b'),
    order: 6.0305,
    name: 'Gậy tự sướng',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001c'),
    order: 6.0306,
    name: 'Cáp sạc',
    image: '/public/uploads/categories/cable.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp micro USB
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001d'),
    order: 6.0307,
    name: 'Cáp micro USB',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp type C
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001e'),
    order: 6.0308,
    name: 'Cáp type C',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp lightning
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001f'),
    order: 6.0309,
    name: 'Cáp lightning',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
  },
  // Phụ kiện -> Phụ kiện máy tính
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000020'),
    order: 6.04,
    name: 'Phụ kiện máy tính',
    image: '/public/uploads/categories/computer-maintenance.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Bàn phím
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000021'),
    order: 6.0401,
    name: 'Bàn phím',
    image: '/public/uploads/categories/keyboard.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Chuột
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000022'),
    order: 6.0402,
    name: 'Chuột',
    image: '/public/uploads/categories/mouse.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Màn hình
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000023'),
    order: 6.0403,
    name: 'Màn hình',
    image: '/public/uploads/categories/monitor.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Máy in
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000024'),
    order: 6.0404,
    name: 'Máy in',
    image: '/public/uploads/categories/printer.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Balo, túi chống sốc
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000025'),
    order: 6.0405,
    name: 'Balo, túi chống sốc',
    image: '/public/uploads/categories/laptop-sleeve.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Phần mềm
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000026'),
    order: 6.0406,
    name: 'Phần mềm',
    image: '/public/uploads/categories/software-dvd.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
  },
  // Phụ kiện -> Phụ kiện máy ảnh
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000027'),
    order: 6.05,
    name: 'Phụ kiện máy ảnh',
    image: '/public/uploads/categories/camera-change.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  },
  // Phụ kiện -> Phụ kiện khác
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000028'),
    order: 6.06,
    name: 'Phụ kiện khác',
    image: '/public/uploads/categories/others.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
  }
];

const brandData = [
  // {
  //   _id: mongoose.Types.ObjectId('b' + zeroFill(1, 23)01'),
  //   name: 'Vsmart',
  //   desc: 'Vsmart là thương hiệu mang tính công nghệ và trí tuệ Việt, mang tinh thần của một Việt Nam mới mẻ, hiện đại, là nền tảng hội tụ kết nối trí tuệ, đồng thời là đại diện của Vingroup trong lộ trình toàn cầu hóa, vươn ra thế giới.',
  //   country: 'Việt Nam',
  //   image: '/public/uploads/brands/vsmart.png'
  // },
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
    "name": "HP",
    "desc": "",
    "country": "US",
    "headQuarters": "Palo Alto, California, United States",
    "founded": 1998,
    "image": "https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png"
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
  }
  // {
  //   name: 'LG Electronics',
  //   desc: 'LG Electronics Inc. là một công ty điện tử đa quốc gia của Hàn Quốc có trụ sở chính tại Yeouido-dong, Seoul, Hàn Quốc. LG Electronics là một phần của tập đoàn chaebol lớn thứ tư ở Hàn Quốc và doanh thu toàn cầu của nó đạt 55,91 tỷ USD vào năm 2014.',
  //   country: 'Hàn Quốc',
  //   image: '/public/uploads/brands/lg-electronics.png'
  // },
  // {
  //   name: 'Philips',
  //   desc: 'Koninklijke Philips N.V. là một tập đoàn đa quốc gia của Hà Lan được thành lập tại Eindhoven. Kể từ năm 1997, nó chủ yếu có trụ sở chính ở Amsterdam, mặc dù trụ sở chính của Benelux vẫn ở Eindhoven',
  //   country: 'Hà Lan',
  //   image: '/public/uploads/brands/philips.png'
  // },
  // {
  //   name: 'Sony',
  //   desc: 'Sony là một trong những thương hiệu toàn cầu nổi tiếng nhất về điện tử tiêu dùng nhờ vào những sáng tạo đột phá mang tính cách mạng và chất lượng sản phẩm. Thành công của Sony tại thị trường Việt Nam là bởi thương hiệu Sony luôn thể hiện được bản sắc riêng một cách mạnh mẽ và ấn tượng, kết hợp giữa chất lượng sản phẩm-công nghệ hàng đầu-kiểu dáng thiết kế độc đáo và cách xây dựng thương hiệu sáng tạo-tôn trọng văn hóa bản địa tiếp tục nâng cao tinh thần sáng tạo của mình để luôn tạo ra sản phẩm chất lượng cho người dùng.',
  //   country: 'Nhật Bản',
  //   image: '/public/uploads/brands/sony.png'
  // },
  // {
  //   name: 'ASUS',
  //   desc: 'ASUS đam mê công nghệ và được thúc đẩy bởi sự đổi mới. Chúng tôi mơ ước, chúng tôi dám và chúng tôi cố gắng để tạo ra một cuộc sống kỹ thuật số dễ dàng và thú vị cho tất cả mọi người. Chúng tôi luôn tìm kiếm những ý tưởng và trải nghiệm đáng kinh ngạc, và chúng tôi mong muốn cung cấp những điều đó trong mọi việc chúng tôi làm.',
  //   country: 'Đài Loan',
  //   image: '/public/uploads/brands/asus.png'
  // },
  // {
  //   name: 'Dell',
  //   desc: 'Dell là một công ty công nghệ máy tính đa quốc gia của Mỹ chuyên phát triển, bán, sửa chữa và hỗ trợ máy tính cũng như các sản phẩm và dịch vụ liên quan và thuộc sở hữu của công ty mẹ Dell Technologies.',
  //   country: 'Mỹ',
  //   image: '/public/uploads/brands/dell.png'
  // },
  // {
  //   name: 'MSI',
  //   desc: 'Micro-Star International Co., Ltd là một tập đoàn công nghệ thông tin đa quốc gia của Đài Loan có trụ sở chính tại thành phố Tân Đài Bắc, Đài Loan.',
  //   country: 'Đài Loan',
  //   image: '/public/uploads/brands/msi.png'
  // },
  // {
  //   name: 'Nikon',
  //   desc: 'Nikon Corporation, còn được gọi là Nikon, là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Tokyo, Nhật Bản, chuyên về quang học và các sản phẩm hình ảnh',
  //   country: 'Nhật Bản',
  //   image: '/public/uploads/brands/nikon.png'
  // },
  // {
  //   name: 'Canon',
  //   desc: 'Canon Inc. là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Ōta, Tokyo, Nhật Bản, chuyên về các sản phẩm quang học, hình ảnh và công nghiệp, chẳng hạn như ống kính, máy ảnh, thiết bị y tế, máy quét, máy in và thiết bị sản xuất chất bán dẫn.',
  //   country: 'Nhật Bản',
  //   image: '/public/uploads/brands/canon.png'
  // }
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
  const filePath = process.cwd() + '/tool/product.01.json';
  const filePath2 = process.cwd() + '/tool/product.02.json';

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