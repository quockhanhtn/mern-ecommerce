import 'package:flutter/material.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/screens/details/details_screen.dart';

import '../../constants.dart';
import '../../size_config.dart';

class ProductCard extends StatelessWidget {
  const ProductCard({
    Key? key,
    this.width = 140,
    this.aspectRatio = 1.02,
    required this.product,
  }) : super(key: key);

  final double width, aspectRatio;
  final ProductDto product;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: getProportionateScreenWidth(10)),
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
                      child: NetworkImg(imageUrl: product.variants[0].thumbnail.toString(), imageFit: BoxFit.contain)),
                ),
              ),
              const SizedBox(height: 10),
              Text(
                product.name,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(color: Colors.black, fontWeight: FontWeight.w700),
                maxLines: 2,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    FormatUtils.currency(product.variants[0].price),
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
              SizedBox(height: getProportionateScreenWidth(20)),
            ],
          ),
        ),
      ),
    );
  }
}
