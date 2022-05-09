import 'package:flutter/material.dart';
import 'package:flutter_image_slideshow/flutter_image_slideshow.dart';

import '../../../size_config.dart';

class DiscountBanner extends StatelessWidget {
  const DiscountBanner({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(getProportionateScreenWidth(5)),
      padding: EdgeInsets.symmetric(
        horizontal: getProportionateScreenWidth(10),
        vertical: getProportionateScreenWidth(5),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(5),
      ),
      child:  ImageSlideshow(

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
          Image.asset(
            'assets/images/Profile Image.png',
            fit: BoxFit.contain,
          ),
          Image.asset(
            'assets/images/Profile Image.png',
            fit: BoxFit.contain,
          ),
          Image.asset(
            'assets/images/Profile Image.png',
            fit: BoxFit.contain,
          ),
        ],
        /// Auto scroll interval.
        /// Do not auto scroll with null or 0.
        autoPlayInterval: 3000,

        /// Loops back to first slide.
        isLoop: true,
      ),
    );
  }
}
