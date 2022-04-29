import 'package:flutter/material.dart';

import 'package:hk_mobile/dto/Product.dart';
import 'package:hk_mobile/dto/product/product_dto.dart';
import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";

  const DetailsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ProductDetailsArguments agrs =
        ModalRoute.of(context)!.settings.arguments as ProductDetailsArguments;
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6F9),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: agrs.product.variants[0].price),
      ),
      body: Body(product: agrs.product),
    );
  }
}

class ProductDetailsArguments {
  final ProductDto product;

  ProductDetailsArguments({required this.product});
}
