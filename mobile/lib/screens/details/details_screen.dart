import 'package:flutter/material.dart';

import 'package:hk_mobile/dto/product_dto.dart';
import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";

  const DetailsScreen({Key? key, required this.productDto}) : super(key: key);
  final ProductDto productDto;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6F9),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: const CustomAppBar(rating: 4.5),
      ),
      body: Body(product: productDto),
    );
  }
}
