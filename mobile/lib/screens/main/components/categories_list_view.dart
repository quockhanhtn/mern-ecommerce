import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/category_controller.dart';
import 'package:hk_mobile/core/components/network_image.dart';

class CategoriesListView extends StatefulWidget {
  const CategoriesListView({Key? key, this.mainScreenAnimationController, this.mainScreenAnimation}) : super(key: key);

  final AnimationController? mainScreenAnimationController;
  final Animation<double>? mainScreenAnimation;

  @override
  _CategoriesListViewState createState() => _CategoriesListViewState();
}

class _CategoriesListViewState extends State<CategoriesListView> with TickerProviderStateMixin {
  final CategoryController categoryController = Get.put(CategoryController());
  AnimationController? animationController;

  @override
  void initState() {
    animationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    super.initState();
  }

  @override
  void dispose() {
    animationController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.mainScreenAnimationController!,
      builder: (BuildContext context, Widget? child) {
        return FadeTransition(
          opacity: widget.mainScreenAnimation!,
          child: Transform(
            transform: Matrix4.translationValues(0.0, 30 * (1.0 - widget.mainScreenAnimation!.value), 0.0),
            child: Column(children: [
              const SizedBox(height: 10),
              // ignore: sized_box_for_whitespace
              Container(
                height: 100,
                // width: double.infinity,
                child: renderContent(),
              ),
              const SizedBox(height: 30),
            ]),
          ),
        );
      },
    );
  }

  Widget renderContent() {
    return Obx(() {
      if (categoryController.isLoading.isTrue) {
        return const SizedBox(
          width: 100,
          child: CircularProgressIndicator(),
        );
      } else if (categoryController.errorMgs.isNotEmpty) {
        return Text('Error: ' + categoryController.errorMgs.toString(),
            style: const TextStyle(color: Colors.red), textAlign: TextAlign.center);
      }

      return ListView.builder(
        padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
        itemCount: categoryController.list.length,
        scrollDirection: Axis.horizontal,
        itemBuilder: (BuildContext context, int index) {
          final int count = min(categoryController.list.length, 10);
          final Animation<double> animation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
              parent: animationController!, curve: Interval((1 / count) * index, 1.0, curve: Curves.fastOutSlowIn)));
          animationController?.forward();

          var category = categoryController.list[index];

          return CategoryView(
              animation: animation,
              animationController: animationController!,
              image: category.coverImage!,
              category: category.name,
              countProduct: index * 2 + 10,
              press: () {});
        },
      );
    });
  }
}

class CategoryView extends StatelessWidget {
  const CategoryView({
    Key? key,
    this.animationController,
    this.animation,
    required this.category,
    required this.image,
    required this.countProduct,
    this.press,
  }) : super(key: key);

  final AnimationController? animationController;
  final Animation<double>? animation;

  final String category, image;
  final int countProduct;
  final GestureTapCallback? press;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animationController!,
      builder: (BuildContext context, Widget? child) {
        return FadeTransition(
          opacity: animation!,
          child: Transform(
            transform: Matrix4.translationValues(100 * (1.0 - animation!.value), 0.0, 0.0),
            child: renderContent(),
          ),
        );
      },
    );
  }

  Widget renderContent() {
    return Padding(
      padding: const EdgeInsets.only(left: 20),
      child: GestureDetector(
        onTap: press,
        child: SizedBox(
          width: 242,
          height: 100,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(
              children: [
                NetWorkImage(imageUrl: image, imageFit: BoxFit.cover),
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
                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                  child: Text.rich(
                    TextSpan(
                      style: const TextStyle(color: Colors.white),
                      children: [
                        TextSpan(
                          text: "$category\n",
                          style: const TextStyle(
                            fontSize: (18),
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
