import 'package:flutter/material.dart';
import 'package:hk_mobile/core/components/default_button.dart';
import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/size_config.dart';

import 'color_dots.dart';
import 'product_description.dart';
import 'top_rounded_container.dart';
import 'product_images.dart';

class Body extends StatelessWidget {
  final ProductDto product;

  const Body({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ProductImages(product: product),
        TopRoundedContainer(
          color: Colors.white,
          child: Column(
            children: [
              Padding(
                padding: EdgeInsets.all(getProportionateScreenWidth(5)),
                child: Text(
                  product.name,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w800,
                      fontSize: getProportionateScreenWidth(20)),
                  maxLines: 3,
                ),
              ),
              ProductDescription(
                desc: product.desc!,
                isFavorite: false,
                pressOnSeeMore: () {},
              ),
              // TopRoundedContainer(
              //   color: const Color(0xFFF6F7F9),
              //   child: Column(
              //     children: [
              //       // ColorDots(product: product),
              //       TopRoundedContainer(
              //         color: Colors.white,
              //         child: Padding(
              //           padding: EdgeInsets.only(
              //             left: SizeConfig.screenWidth * 0.15,
              //             right: SizeConfig.screenWidth * 0.15,
              //             bottom: getProportionateScreenWidth(40),
              //             top: getProportionateScreenWidth(15),
              //           ),
              //           child: DefaultButton(
              //             text: "Thêm vào giỏ hàng",
              //             press: () {},
              //           ),
              //         ),
              //       ),
              //     ],
              //   ),
              // ),
            ],
          ),
        ),
      ],
    );
  }
}
