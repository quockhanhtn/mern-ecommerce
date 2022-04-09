// ignore_for_file: file_names

import 'package:flutter/material.dart';

class Product {
  final int id;
  final String title, description, price;
  final List<String> images;
  final List<Color> colors;
  final double rating;
  final bool isFavourite, isPopular;

  Product({
    required this.id,
    required this.images,
    required this.colors,
    this.rating = 0.0,
    this.isFavourite = false,
    this.isPopular = false,
    required this.title,
    required this.price,
    required this.description,
  });
}

// Our demo Products

List<Product> demoProducts = [
  Product(
    id: 1,
    images: [
      "assets/images/ip13/01.jpg",
      "assets/images/ip13/02.jpg",
      "assets/images/ip13/03.jpg",
      "assets/images/ip13/04.jpg",
      "assets/images/ip13/05.jpg",
    ],
    colors: const [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "iPhone 13 Pro Max",
    price: '33.990.000',
    description:
        "iPhone 13 Pro Max 128GB - siêu phẩm được mong chờ nhất ở nửa cuối năm 2021 đến từ Apple. Máy có thiết kế không mấy đột phá khi so với người tiền nhiệm, bên trong đây vẫn là một sản phẩm có màn hình siêu đẹp, tần số quét được nâng cấp lên 120 Hz mượt mà, cảm biến camera có kích thước lớn hơn, cùng hiệu năng mạnh mẽ với sức mạnh đến từ Apple A15 Bionic, sẵn sàng cùng bạn chinh phục mọi thử thách.",
    rating: 4.8,
    isFavourite: true,
    isPopular: true,
  ),
  Product(
    id: 2,
    images: [
      "assets/images/s22/01.jpg",
      "assets/images/s22/02.jpg",
      "assets/images/s22/03.jpg",
      "assets/images/s22/04.jpg",
    ],
    colors: const [
      Colors.black,
      Color(0xff344E47),
      Colors.red,
      Colors.white,
    ],
    title: "Galaxy S22 Ultra",
    price: '30.990.000',
    description:
        "Điện thoại Samsung Galaxy S22 với loạt cải tiến đột phá, sức mạnh vô song",
    rating: 4.1,
    isPopular: true,
  ),
  Product(
    id: 3,
    images: [
      "assets/images/mi11/01.jpg",
      "assets/images/mi11/02.jpg",
      "assets/images/mi11/03.jpg",
      "assets/images/mi11/04.jpg",
      "assets/images/mi11/05.jpg"
    ],
    colors: const [
      Colors.grey,
    ],
    title: "Xiaomi 11T Pro 5G",
    price: '11.990.000',
    description:
        "Xiaomi 11T Pro 5G 8GB sử dụng con chip Snapdragon 888 mạnh mẽ, camera chính 108 MP, hỗ trợ sạc nhanh 120 W, màn hình rộng với tốc độ làm tươi lên đến 120 Hz, tận hưởng trải nghiệm tuyệt vời trong từng khoảnh khắc.",
    rating: 4.1,
    isFavourite: true,
    isPopular: true,
  ),
  Product(
    id: 4,
    images: [
      "assets/images/wireless headset.png",
    ],
    colors: const [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "Logitech Head",
    price: '13.490.000',
    description: description,
    rating: 4.1,
    isFavourite: true,
  ),
];

const String description =
    "Wireless Controller for PS4™ gives you what you want in your gaming from over precision control your games to sharing …";
