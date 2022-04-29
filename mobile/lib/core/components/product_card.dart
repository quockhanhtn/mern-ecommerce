import 'package:flutter/material.dart';
import 'package:hk_mobile/core/components/network_image.dart';
import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/screens/details/details_screen.dart';

import '../../constants.dart';
import '../../size_config.dart';

class ProductCard extends StatelessWidget {
  ProductCard({
    Key? key,
    this.width = 140,
    this.aspectRatio = 1.02,
    required this.product,
  });

  final double width, aspectRatio;
  final ProductDto product;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: getProportionateScreenWidth(20)),
      child: SizedBox(
        width: getProportionateScreenWidth(width),
        child: GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailsScreen(productDto: product),
              ),
            );
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AspectRatio(
                aspectRatio: 1.02,
                child: Container(
                  padding: EdgeInsets.all(getProportionateScreenWidth(2)),
                  decoration: BoxDecoration(
                    color: kSecondaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Hero(
                      tag: product.id.toString(),
                      child: NetWorkImage(
                          imageUrl: product.variants[0].thumbnail.toString(),
                          imageFit: BoxFit.contain)),
                ),
              ),
              const SizedBox(height: 10),
              Text(
                product.name,
                style: const TextStyle(color: Colors.black),
                maxLines: 2,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "${product.variants[0].price} đ",
                    style: TextStyle(
                      fontSize: getProportionateScreenWidth(18),
                      fontWeight: FontWeight.w600,
                      color: kPrimaryColor,
                    ),
                  ),
                  const SizedBox(height: 40),
                  // InkWell(
                  //   borderRadius: BorderRadius.circular(50),
                  //   onTap: () {},
                  //   child: Container(
                  //     padding: EdgeInsets.all(getProportionateScreenWidth(8)),
                  //     height: getProportionateScreenWidth(28),
                  //     width: getProportionateScreenWidth(28),
                  //     decoration: BoxDecoration(
                  //       color: product.isFavourite
                  //           ? kPrimaryColor.withOpacity(0.15)
                  //           : kSecondaryColor.withOpacity(0.1),
                  //       shape: BoxShape.circle,
                  //     ),
                  //     child: SvgPicture.asset(
                  //       "assets/icons/ic_heart_fill.svg",
                  //       color: product.isFavourite
                  //           ? const Color(0xFFFF4848)
                  //           : const Color(0xFFDBDEE4),
                  //     ),
                  //   ),
                  // ),
                ],
              ),
              SizedBox(height: getProportionateScreenWidth(40)),
            ],
          ),
        ),
      ),
    );
  }
}
