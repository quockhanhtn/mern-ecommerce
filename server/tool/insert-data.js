/* cSpell:disable */

import mongoose from 'mongoose';
import User from '../src/models/user.model.js';
import Category from '../src/models/category.model.js';
import Brand from '../src/models/brand.model.js';

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
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000002'),
    order: 2,
    name: 'Máy tính bảng',
    image: '/public/uploads/categories/tablet.svg',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000003'),
    order: 3,
    name: 'Đồng hồ',
    image: '/public/uploads/categories/watch.svg',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000004'),
    order: 4,
    name: 'Laptop',
    image: '/public/uploads/categories/laptop.svg',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  }, {
    _id: mongoose.Types.ObjectId('c00000000000000000000005'),
    order: 5,
    name: 'Máy ảnh',
    image: '/public/uploads/categories/camera.svg',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000006'),
    order: 6,
    name: 'Phụ kiện',
    image: '/public/uploads/categories/airpods.svg',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị âm thanh
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000007'),
    order: 6.01,
    name: 'Thiết bị âm thanh',
    image: '/public/uploads/categories/sound.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000008'),
    order: 6.0101,
    name: 'Tai nghe',
    image: '/public/uploads/categories/headphone.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000007'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe -> Tai nghe Bluetooth
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000009'),
    order: 6.010101,
    name: 'Tai nghe Bluetooth',
    image: '/public/uploads/categories/bluetooth.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Tai nghe -> Tai nghe có dây
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000010'),
    order: 6.010102,
    name: 'Tai nghe có dây',
    image: '/public/uploads/categories/earphone.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000008'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị âm thanh -> Loa
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000011'),
    order: 6.0102,
    name: 'Loa',
    image: '/public/uploads/categories/speaker.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000007'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  // Phụ kiện -> Thiết bị lưu trữ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000012'),
    order: 6.02,
    name: 'Thiết bị lưu trữ',
    image: '/public/uploads/categories/data-storage.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> Thẻ nhớ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000013'),
    order: 6.0201,
    name: 'Thẻ nhớ',
    image: '/public/uploads/categories/sd-storage.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> USB
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000014'),
    order: 6.0202,
    name: 'USB',
    image: '/public/uploads/categories/usb.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Thiết bị lưu trữ -> Ổ cứng di động
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000015'),
    order: 6.0203,
    name: 'Ổ cứng di động',
    image: '/public/uploads/categories/hdd.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000012'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000016'),
    order: 6.03,
    name: 'Phụ kiện điện thoại',
    image: '/public/uploads/categories/phone-accessories.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Pin sạc dự phòng
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000017'),
    order: 6.0301,
    name: 'Pin sạc dự phòng',
    image: '/public/uploads/categories/power-bank.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Sim, thẻ
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000018'),
    order: 6.0302,
    name: 'Sim, thẻ',
    image: '/public/uploads/categories/sim.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Miếng dán màn hình
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000019'),
    order: 6.0303,
    name: 'Miếng dán màn hình',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Ốp lưng, bao da
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001a'),
    order: 6.0304,
    name: 'Ốp lưng, bao da',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Gậy tự sướng
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001b'),
    order: 6.0305,
    name: 'Gậy tự sướng',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001c'),
    order: 6.0306,
    name: 'Cáp sạc',
    image: '/public/uploads/categories/cable.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000016'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp micro USB
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001d'),
    order: 6.0307,
    name: 'Cáp micro USB',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp type C
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001e'),
    order: 6.0308,
    name: 'Cáp type C',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện điện thoại -> Cáp sạc -> Cáp lightning
  {
    _id: mongoose.Types.ObjectId('c0000000000000000000001f'),
    order: 6.0309,
    name: 'Cáp lightning',
    parent: mongoose.Types.ObjectId('c0000000000000000000001c'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000020'),
    order: 6.04,
    name: 'Phụ kiện máy tính',
    image: '/public/uploads/categories/computer-maintenance.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Bàn phím
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000021'),
    order: 6.0401,
    name: 'Bàn phím',
    image: '/public/uploads/categories/keyboard.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Chuột
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000022'),
    order: 6.0402,
    name: 'Chuột',
    image: '/public/uploads/categories/mouse.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Màn hình
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000023'),
    order: 6.0403,
    name: 'Màn hình',
    image: '/public/uploads/categories/monitor.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Máy in
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000024'),
    order: 6.0404,
    name: 'Máy in',
    image: '/public/uploads/categories/printer.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Balo, túi chống sốc
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000025'),
    order: 6.0405,
    name: 'Balo, túi chống sốc',
    image: '/public/uploads/categories/laptop-sleeve.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy tính -> Phần mềm
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000026'),
    order: 6.0406,
    name: 'Phần mềm',
    image: '/public/uploads/categories/software-dvd.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000020'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện máy ảnh
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000027'),
    order: 6.05,
    name: 'Phụ kiện máy ảnh',
    image: '/public/uploads/categories/camera-change.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  },
  // Phụ kiện -> Phụ kiện khác
  {
    _id: mongoose.Types.ObjectId('c00000000000000000000028'),
    order: 6.06,
    name: 'Phụ kiện khác',
    image: '/public/uploads/categories/others.svg',
    parent: mongoose.Types.ObjectId('c00000000000000000000006'),
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001"),
  }
];

const brandData = [
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000001'),
    name: 'Vsmart',
    desc: 'Vsmart là thương hiệu mang tính công nghệ và trí tuệ Việt, mang tinh thần của một Việt Nam mới mẻ, hiện đại, là nền tảng hội tụ kết nối trí tuệ, đồng thời là đại diện của Vingroup trong lộ trình toàn cầu hóa, vươn ra thế giới.',
    country: 'Việt Nam',
    image: '/public/uploads/brands/vsmart.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")

  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000002'),
    name: 'Samsung',
    desc: 'Thương hiệu chiếm lĩnh thị trường smartphone Việt. Samsung là tập đoàn đa quốc gia có trụ sở được đặt tại thủ đô Seoul, Hàn Quốc',
    country: 'Hàn Quốc',
    image: '/public/uploads/brands/samsung.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000003'),
    name: 'Apple',
    desc: 'Apple Inc. là một công ty công nghệ đa quốc gia của Mỹ có trụ sở chính tại Cupertino, California, chuyên thiết kế, phát triển và bán thiết bị điện tử tiêu dùng, phần mềm máy tính và các dịch vụ trực tuyến',
    country: 'Mỹ',
    image: '/public/uploads/brands/apple.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000004'),
    name: 'LG Electronics',
    desc: 'LG Electronics Inc. là một công ty điện tử đa quốc gia của Hàn Quốc có trụ sở chính tại Yeouido-dong, Seoul, Hàn Quốc. LG Electronics là một phần của tập đoàn chaebol lớn thứ tư ở Hàn Quốc và doanh thu toàn cầu của nó đạt 55,91 tỷ USD vào năm 2014.',
    country: 'Hàn Quốc',
    image: '/public/uploads/brands/lg-electronics.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000005'),
    name: 'Philips',
    desc: 'Koninklijke Philips N.V. là một tập đoàn đa quốc gia của Hà Lan được thành lập tại Eindhoven. Kể từ năm 1997, nó chủ yếu có trụ sở chính ở Amsterdam, mặc dù trụ sở chính của Benelux vẫn ở Eindhoven',
    country: 'Hà Lan',
    image: '/public/uploads/brands/philips.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000006'),
    name: 'Sony',
    desc: 'Sony là một trong những thương hiệu toàn cầu nổi tiếng nhất về điện tử tiêu dùng nhờ vào những sáng tạo đột phá mang tính cách mạng và chất lượng sản phẩm. Thành công của Sony tại thị trường Việt Nam là bởi thương hiệu Sony luôn thể hiện được bản sắc riêng một cách mạnh mẽ và ấn tượng, kết hợp giữa chất lượng sản phẩm-công nghệ hàng đầu-kiểu dáng thiết kế độc đáo và cách xây dựng thương hiệu sáng tạo-tôn trọng văn hóa bản địa tiếp tục nâng cao tinh thần sáng tạo của mình để luôn tạo ra sản phẩm chất lượng cho người dùng.',
    country: 'Nhật Bản',
    image: '/public/uploads/brands/sony.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000007'),
    name: 'ASUS',
    desc: 'ASUS đam mê công nghệ và được thúc đẩy bởi sự đổi mới. Chúng tôi mơ ước, chúng tôi dám và chúng tôi cố gắng để tạo ra một cuộc sống kỹ thuật số dễ dàng và thú vị cho tất cả mọi người. Chúng tôi luôn tìm kiếm những ý tưởng và trải nghiệm đáng kinh ngạc, và chúng tôi mong muốn cung cấp những điều đó trong mọi việc chúng tôi làm.',
    country: 'Đài Loan',
    image: '/public/uploads/brands/asus.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000008'),
    name: 'Dell',
    desc: 'Dell là một công ty công nghệ máy tính đa quốc gia của Mỹ chuyên phát triển, bán, sửa chữa và hỗ trợ máy tính cũng như các sản phẩm và dịch vụ liên quan và thuộc sở hữu của công ty mẹ Dell Technologies.',
    country: 'Mỹ',
    image: '/public/uploads/brands/dell.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000009'),
    name: 'MSI',
    desc: 'Micro-Star International Co., Ltd là một tập đoàn công nghệ thông tin đa quốc gia của Đài Loan có trụ sở chính tại thành phố Tân Đài Bắc, Đài Loan.',
    country: 'Đài Loan',
    image: '/public/uploads/brands/msi.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000010'),
    name: 'Nikon',
    desc: 'Nikon Corporation, còn được gọi là Nikon, là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Tokyo, Nhật Bản, chuyên về quang học và các sản phẩm hình ảnh',
    country: 'Nhật Bản',
    image: '/public/uploads/brands/nikon.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  },
  {
    _id: mongoose.Types.ObjectId('b00000000000000000000011'),
    name: 'Canon',
    desc: 'Canon Inc. là một tập đoàn đa quốc gia của Nhật Bản có trụ sở chính tại Ōta, Tokyo, Nhật Bản, chuyên về các sản phẩm quang học, hình ảnh và công nghiệp, chẳng hạn như ống kính, máy ảnh, thiết bị y tế, máy quét, máy in và thiết bị sản xuất chất bán dẫn.',
    country: 'Nhật Bản',
    image: '/public/uploads/brands/canon.png',
    createdBy: mongoose.Types.ObjectId("a00000000000000000000001"),
    updatedBy: mongoose.Types.ObjectId("a00000000000000000000001")
  }
];


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

    await newCategory.save();
    console.log(`[${i + 1}/${categoryData.length}] Inserted category: ` + element.name);
  }

  console.log('--> Insert category data');
  for (let i = 0; i < brandData.length; i++) {
    const element = brandData[i];
    const newBrand = new Brand(element);
    await newBrand.save();
    console.log(`[${i + 1}/${brandData.length}] Inserted brand: ` + element.name);
  }

  console.log('\nINSERT SAMPLE DATA DONE');
  console.log((new Date()).toLocaleString());
  process.exit(1);
}