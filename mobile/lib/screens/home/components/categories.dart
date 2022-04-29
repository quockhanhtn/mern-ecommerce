import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/category_controller.dart';
import 'package:hk_mobile/dto/category_dto.dart';

import '../../../size_config.dart';

class Categories extends StatelessWidget {
  List<Map<String, dynamic>> categories = [
    {"icon": "assets/icons/Flash Icon.svg", "text": "Flash Deal"},
    {"icon": "assets/icons/ic_bill.svg", "text": "Hóa\n đơn"},
    {"icon": "assets/icons/Parcel.svg", "text": "Đơn hàng"},
    {"icon": "assets/icons/Gift Icon.svg", "text": "Khuyến mãi"},
    {"icon": "assets/icons/Discover.svg", "text": "Xem thêm"},
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.all(getProportionateScreenWidth(20)),
        child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: List.generate(
              categories.length,
              (index) => CategoryCard(
                icon: categories[index]["icon"],
                text: categories[index]["text"],
                press: () {},
              ),
            )));
  }
}

class CategoryCard extends StatelessWidget {
  const CategoryCard({
    Key? key,
    required this.icon,
    required this.text,
    required this.press,
  }) : super(key: key);

  final String? icon, text;
  final GestureTapCallback press;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: press,
      child: SizedBox(
        width: getProportionateScreenWidth(55),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(getProportionateScreenWidth(15)),
              height: getProportionateScreenWidth(55),
              width: getProportionateScreenWidth(55),
              decoration: BoxDecoration(
                color: kPrimaryColorLighter,
                borderRadius: BorderRadius.circular(10),
              ),
              child: SvgPicture.asset(icon!),
            ),
            const SizedBox(height: 5),
            Text(text!, textAlign: TextAlign.center)
          ],
        ),
      ),
    );
  }
}
