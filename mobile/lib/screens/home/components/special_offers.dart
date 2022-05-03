import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/category_controller.dart';
import 'package:hk_mobile/core/components/network_img.dart';

import '../../../size_config.dart';
import 'section_title.dart';

// ignore: use_key_in_widget_constructors
class SpecialOffers extends StatelessWidget {
  final CategoryController categoryController = Get.put(CategoryController());

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(
            title: "Danh mục",
            press: () {},
          ),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Obx(() {
              if (categoryController.isLoading.isTrue) {
                return const CircularProgressIndicator();
              } else if (categoryController.errorMgs.isNotEmpty) {
                return Text('Error: ' + categoryController.errorMgs.toString(),
                    style: const TextStyle(color: Colors.red), textAlign: TextAlign.center);
              } else {
                return Row(children: [
                  SizedBox(width: getProportionateScreenWidth(10)),
                  ...List.generate(
                    categoryController.list.length,
                    (index) {
                      var category = categoryController.list[index];
                      return SpecialOfferCard(
                        image: category.coverImage!,
                        category: category.name,
                        countProduct: index * 2 + 10,
                        press: () {},
                      );
                    },
                  ),
                  SizedBox(width: getProportionateScreenWidth(10))
                ]);
              }
            })),
      ],
    );
  }
}

class SpecialOfferCard extends StatelessWidget {
  const SpecialOfferCard({
    Key? key,
    required this.category,
    required this.image,
    required this.countProduct,
    required this.press,
  }) : super(key: key);

  final String category, image;
  final int countProduct;
  final GestureTapCallback press;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
      child: GestureDetector(
        onTap: press,
        child: SizedBox(
          width: getProportionateScreenWidth(242),
          height: getProportionateScreenWidth(100),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(
              children: [
                NetworkImg(imageUrl: image, imageFit: BoxFit.cover),
                Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        const Color(0xFF343434).withOpacity(0.4),
                        const Color(0xFF343434).withOpacity(0.15),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(15.0),
                    vertical: getProportionateScreenWidth(10),
                  ),
                  child: Text.rich(
                    TextSpan(
                      style: const TextStyle(color: Colors.white),
                      children: [
                        TextSpan(
                          text: "$category\n",
                          style: TextStyle(
                            fontSize: getProportionateScreenWidth(18),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        TextSpan(text: "$countProduct sản phẩm")
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
