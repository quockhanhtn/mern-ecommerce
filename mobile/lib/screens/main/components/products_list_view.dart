import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/product_controller.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/screens/details/details_screen.dart';

const kItemRatio = 0.8;

class ProductsListView extends StatefulWidget {
  const ProductsListView({Key? key, this.mainScreenAnimationController, this.mainScreenAnimation}) : super(key: key);

  final AnimationController? mainScreenAnimationController;
  final Animation<double>? mainScreenAnimation;
  @override
  _ProductsListViewState createState() => _ProductsListViewState();
}

class _ProductsListViewState extends State<ProductsListView> with TickerProviderStateMixin {
  final ProductController productController = Get.put(ProductController());
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
              transform: Matrix4.translationValues(
                0.0,
                30 * (1.0 - widget.mainScreenAnimation!.value),
                0.0,
              ),
              child: Obx(() {
                double ratio = 2 / 5;

                if (productController.isLoading.isTrue) {
                  ratio = 1;
                } else if (productController.list.isNotEmpty) {
                  ratio = (kItemRatio) / (kItemRatio * (productController.list.length / 4));
                  // ratio = kItemRatio;
                }

                return AspectRatio(
                  aspectRatio: ratio,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 8, right: 8),
                    child: renderGridView(),
                  ),
                );
              })),
        );
      },
    );
  }

  Widget renderGridView() {
    if (productController.isLoading.isTrue) {
      return const Center(
        child: SizedBox(
          width: 100,
          height: 100,
          child: CircularProgressIndicator(),
        ),
      );
    } else if (productController.errorMgs.isNotEmpty) {
      return Text('Error: ' + productController.errorMgs.toString(),
          style: const TextStyle(color: Colors.red), textAlign: TextAlign.center);
    }

    return GridView(
      padding: const EdgeInsets.all(16),
      physics: const BouncingScrollPhysics(),
      scrollDirection: Axis.vertical,
      children: List<Widget>.generate(
        productController.list.length,
        (int index) {
          final int count = productController.list.length;
          animationController?.forward();
          return ProductView(
            product: productController.list[index],
            animation: Tween<double>(begin: 0.0, end: 1.0).animate(
              CurvedAnimation(
                parent: animationController!,
                curve: Interval((1 / count) * index, 1.0, curve: Curves.fastOutSlowIn),
              ),
            ),
            animationController: animationController!,
          );
        },
      ),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
        childAspectRatio: kItemRatio,
      ),
    );
  }
}

class ProductView extends StatelessWidget {
  const ProductView({
    Key? key,
    required this.product,
    this.animationController,
    this.animation,
  }) : super(key: key);

  final ProductDto product;
  final AnimationController? animationController;
  final Animation<double>? animation;

  void onTap() {
    Get.to(() => DetailsScreen(productDto: product));
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animationController!,
      builder: (BuildContext context, Widget? child) {
        return FadeTransition(
          opacity: animation!,
          child: Transform(
            transform: Matrix4.translationValues(0.0, 50 * (1.0 - animation!.value), 0.0),
            child: Container(
              decoration: BoxDecoration(
                color: AppTheme.white,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(8.0),
                  bottomLeft: Radius.circular(8.0),
                  bottomRight: Radius.circular(8.0),
                  topRight: Radius.circular(8.0),
                ),
                boxShadow: <BoxShadow>[
                  BoxShadow(color: AppTheme.grey.withOpacity(0.4), offset: const Offset(1.1, 1.1), blurRadius: 10.0),
                ],
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  focusColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  hoverColor: Colors.transparent,
                  borderRadius: const BorderRadius.all(Radius.circular(8.0)),
                  splashColor: AppTheme.nearlyDarkBlue.withOpacity(0.2),
                  onTap: onTap,
                  child: AspectRatio(
                    aspectRatio: 2,
                    child: Stack(
                      children: [
                        AspectRatio(
                          aspectRatio: 1,
                          child: NetworkImg(
                            imageUrl: product.variants[0].thumbnail!,
                            imageFit: BoxFit.scaleDown,
                            progressSize: 50,
                          ),
                        ),
                        Positioned(
                            bottom: 1,
                            left: 0,
                            right: 0,
                            child: Column(
                              children: [
                                Text(
                                  product.name,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.w700,
                                    fontSize: 13,
                                  ),
                                  textAlign: TextAlign.center,
                                  maxLines: 2,
                                ),
                                Text(
                                  FormatUtils.currency(product.variants[0].price),
                                  style: const TextStyle(
                                    fontSize: (15),
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.primaryColor,
                                  ),
                                ),
                              ],
                            )),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
