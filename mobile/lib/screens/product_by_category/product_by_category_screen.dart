import 'package:flutter/material.dart';
import 'package:hk_mobile/size_config.dart';

import 'components/body.dart';

class ProductByCategoryScreen extends StatelessWidget {
  const ProductByCategoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return const Scaffold(body: Body());
  }
}
