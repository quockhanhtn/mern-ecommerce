import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/category_controller.dart';
import 'package:hk_mobile/dto/category_dto.dart';
import 'package:hk_mobile/controllers/product_controller.dart';

import '../../../size_config.dart';

class Categories extends StatelessWidget {
  final CategoryController categoryController = Get.put(CategoryController());
  final ProductController productController = Get.put(ProductController());

  List<Widget> renderChild(List<CategoryDto> source) {
    List<Widget> child = [];
    if (source.isEmpty) {
      return child;
    }
    for (var i = 0; i < source.length; i++) {
      child.add(CategoryCard(
          icon: source[i].image, text: source[i].name, press: () => {}));
    }
    return child;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.all(getProportionateScreenWidth(20)),
        child: Obx(() {
          if (categoryController.isLoading.isTrue) {
            return const CircularProgressIndicator();
          } else if (categoryController.errorMgs.isNotEmpty) {
            return Text('Error: ' + categoryController.errorMgs.toString(),
                style: const TextStyle(color: Colors.red),
                textAlign: TextAlign.center);
          } else {
            return Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: renderChild(categoryController.list.value));
          }
        }));
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
                color: const Color(0xFFFFECDF),
                borderRadius: BorderRadius.circular(10),
              ),
              child: SvgPicture.network(icon!),
            ),
            const SizedBox(height: 5),
            Text(text!, textAlign: TextAlign.center)
          ],
        ),
      ),
    );
  }
}
