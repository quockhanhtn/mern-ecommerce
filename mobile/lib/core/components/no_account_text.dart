import 'package:flutter/material.dart';

import '../../constants.dart';
import '../../size_config.dart';

class NoAccountText extends StatelessWidget {
  NoAccountText({
    Key? key,
    this.onTap,
  }) : super(key: key);

  Function()? onTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Chưa có tài khoản? ",
          style: TextStyle(fontSize: getProportionateScreenWidth(16)),
        ),
        GestureDetector(
          onTap: onTap,
          child: Text(
            "Đăng ký",
            style: TextStyle(
              fontSize: getProportionateScreenWidth(16),
              color: kPrimaryColor,
            ),
          ),
        ),
      ],
    );
  }
}
