import 'package:flutter/material.dart';

import '../../../size_config.dart';
import 'popular_product.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Column(children: [
          SizedBox(height: getProportionateScreenWidth(10)),
          PopularProducts(),
          SizedBox(height: getProportionateScreenWidth(30)),
        ]),
      ),
    );
  }
}
