import 'package:flutter/material.dart';

class HKLogo extends StatelessWidget {
  const HKLogo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      // mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        Image.asset(
          'assets/logo/hk_full.png',
          width: 120,
        ),
      ],
    );
  }
}
