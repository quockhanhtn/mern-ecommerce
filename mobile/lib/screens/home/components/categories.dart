import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mobile/dto/category_dto.dart';
import 'package:mobile/repositories/category_repository.dart';

import '../../../size_config.dart';

class Categories extends StatelessWidget {
  const Categories({Key? key}) : super(key: key);

  List<Widget> renderChild(List<CategoryDto> source) {
    List<Widget> child = [];
    if (source.isEmpty) {
      return child;
    }
    for (var i = 0; i < source.length; i++) {
      child.add(CategoryCard(
          icon: "assets/icons/Flash Icon.svg",
          text: source[i].name,
          press: () => {}));
    }
    return child;
  }

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> categories = [
      {"icon": "assets/icons/Flash Icon.svg", "text": "Flash Deal"},
      {"icon": "assets/icons/Bill Icon.svg", "text": "Hóa\n đơn"},
      {"icon": "assets/icons/Parcel.svg", "text": "Đơn hàng"},
      {"icon": "assets/icons/Gift Icon.svg", "text": "Khuyến mãi"},
      {"icon": "assets/icons/Discover.svg", "text": "Xem thêm"},
    ];
    return Padding(
        padding: EdgeInsets.all(getProportionateScreenWidth(20)),
        child: FutureBuilder<List<CategoryDto>>(
            future: CategoryRepository().getAll(),
            builder: (context, snapshot) {
              if (snapshot.hasData && snapshot.data != null) {
                return Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: renderChild(snapshot.data as List<CategoryDto>));
              } else if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              }
              return const CircularProgressIndicator();
            })
        // Row(
        //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
        //   crossAxisAlignment: CrossAxisAlignment.start,
        //   children: List.generate(
        //     categories.length,
        //     (index) => CategoryCard(
        //       icon: categories[index]["icon"],
        //       text: categories[index]["text"],
        //       press: () {},
        //     ),
        //   ),
        // ),
        );
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