import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/discount_controller.dart';
import 'package:hk_mobile/core/components/network_img.dart';

import '../../../size_config.dart';

class DiscountBanner extends StatelessWidget {
  final DiscountController discountController = Get.put(DiscountController());

  DiscountBanner({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      // margin: EdgeInsets.all(getProportionateScreenWidth(5)),
      padding: EdgeInsets.symmetric(
        horizontal: getProportionateScreenWidth(0),
        vertical: getProportionateScreenWidth(5),
      ),
      // decoration: BoxDecoration(
      //   color: Colors.white,
      //   borderRadius: BorderRadius.circular(10),
      // ),
      child: Obx(() {
        if (discountController.isLoading.isTrue) {
          return const Center(
              child: SizedBox(
            child: CircularProgressIndicator(),
            height: 100.0,
            width: 100.0,
          ));
        }

        return CarouselSlider(
          options: CarouselOptions(
            autoPlay: true,
            aspectRatio: 2.0,
            enlargeCenterPage: true,
          ),
          items: renderListImage(),
        );
      }),
    );
  }

  List<Widget> renderListImage() {
    return discountController.list
        .map((item) => Container(
              margin: const EdgeInsets.all(5.0),
              child: ClipRRect(
                  borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                  child: Stack(
                    children: <Widget>[
                      NetworkImg(
                        imageUrl: item.image ?? '',
                        imageFit: BoxFit.cover,
                        progressSize: 1000.0,
                      ),
                      Positioned(
                        bottom: 0.0,
                        left: 0.0,
                        right: 0.0,
                        child: Container(
                          // decoration: BoxDecoration(
                          //   gradient: LinearGradient(
                          //     colors: [Color.fromARGB(200, 0, 0, 0), Color.fromARGB(0, 0, 0, 0)],
                          //     begin: Alignment.bottomCenter,
                          //     end: Alignment.topCenter,
                          //   ),
                          // ),
                          padding: const EdgeInsets.symmetric(
                            vertical: 5,
                            horizontal: 5,
                          ),
                          child: Text(
                            item.name,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 15.0,
                              fontWeight: FontWeight.bold,
                              shadows: <Shadow>[
                                Shadow(
                                  offset: Offset(3, 3),
                                  blurRadius: 3.0,
                                  color: Color.fromARGB(255, 0, 0, 0),
                                ),
                                Shadow(
                                  offset: Offset(-5, -5),
                                  blurRadius: 8.0,
                                  color: Color.fromARGB(125, 0, 0, 255),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  )),
            ))
        .toList();
  }
}
