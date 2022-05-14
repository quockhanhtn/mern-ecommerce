import 'package:flutter/material.dart';
import 'package:flutter_image_slideshow/flutter_image_slideshow.dart';
import 'package:hk_mobile/controllers/discount_controller.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/components/network_img.dart';

import '../../../size_config.dart';

class DiscountBanner extends StatelessWidget {
  final DiscountController discountController = Get.put(DiscountController());
  DiscountBanner({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(getProportionateScreenWidth(5)),
      padding: EdgeInsets.symmetric(
        horizontal: getProportionateScreenWidth(0),
        vertical: getProportionateScreenWidth(5),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Obx(() {
        if (discountController.isLoading.isTrue) {
          return const SizedBox(
            child: CircularProgressIndicator(),
            height: 100.0,
            width: 100.0,
          );
        }
        return SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: ImageSlideshow(
            /// Width of the [ImageSlideshow].
            width: double.infinity,

            /// Height of the [ImageSlideshow].
            height: 200,

            /// The page to show when first creating the [ImageSlideshow].
            initialPage: 0,

            /// The color to paint the indicator.
            indicatorColor: Colors.blue,

            /// The color to paint behind th indicator.
            indicatorBackgroundColor: Colors.grey,

            /// The widgets to display in the [ImageSlideshow].
            /// Add the sample image file into the images folder
            children: [
              ...List.generate(
                discountController.list.length,
                (index) {
                  var imageUrl = discountController.list[index].image.toString();
                  if (discountController.list[index].image == '') {
                    imageUrl = 'https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2020/06/Q.png';
                  }
                  return NetworkImg(
                    imageUrl: imageUrl,
                    imageFit: BoxFit.contain,
                    progressSize: 100,
                  );
                },
              ),
            ],

            /// Auto scroll interval.
            /// Do not auto scroll with null or 0.
            autoPlayInterval: 10000,

            /// Loops back to first slide.
            isLoop: true,
          ),
        );
      }),
    );
  }
}
