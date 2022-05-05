import 'dart:ffi';

import 'package:flutter/material.dart';

import '../../../size_config.dart';

class SectionTitle extends StatelessWidget {
  const SectionTitle({
    Key? key,
    required this.title,
    required this.press,
    this.viewMoreText,
  }) : super(key: key);

  final String title;
  final GestureTapCallback press;
  final String? viewMoreText;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: getProportionateScreenWidth(18),
            color: Colors.black,
          ),
        ),
        GestureDetector(
          onTap: press,
          child: Text(
            viewMoreText ?? "Xem thêm",
            style: const TextStyle(color: Color(0xFFBBBBBB)),
          ),
        ),
      ],
    );
  }
}
