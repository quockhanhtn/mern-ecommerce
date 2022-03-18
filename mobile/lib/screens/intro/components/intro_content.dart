import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lottie/lottie.dart';

import '../../../constants.dart';
import '../../../size_config.dart';

class IntroContent extends StatelessWidget {
  const IntroContent({
    Key? key,
    this.title,
    this.text,
    this.lottieSrc,
  }) : super(key: key);
  final String? title, text, lottieSrc;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const Spacer(flex: 2),
        SvgPicture.asset(
          "assets/logo/hk_full.svg",
          color: kPrimaryColor,
          width: getProportionateScreenWidth(225),
          height: getProportionateScreenWidth(45),
        ),
        const SizedBox(height: 30),
        Text(
          title!,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 10),
        SizedBox(
            width: getProportionateScreenWidth(275),
            child: Text(
              text!,
              textAlign: TextAlign.center,
            )),
        const Spacer(flex: 2),
        LottieBuilder.asset(lottieSrc!,
            width: getProportionateScreenWidth(235),
            height: getProportionateScreenHeight(265)),
      ],
    );
  }
}
