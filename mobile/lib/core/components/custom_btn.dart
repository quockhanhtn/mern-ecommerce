import 'package:flutter/material.dart';

class CustomBtn extends StatelessWidget {
  const CustomBtn({
    Key? key,
    required this.text,
    this.subText,
    required this.btnColor,
    required this.textColor,
    required this.btnPadding,
    this.onTap,
    this.textFontSize = 18.0,
    this.subtextFontSize = 10.0,
  }) : super(key: key);

  final String text;
  final String? subText;
  final Color btnColor;
  final Color textColor;
  final EdgeInsetsGeometry btnPadding;
  final Function? onTap;
  final double textFontSize;
  final double subtextFontSize;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: btnPadding,
        child: GestureDetector(
          onTap: onTap as void Function()?,
          child: Container(
            height: 48,
            decoration: BoxDecoration(
              color: btnColor,
              borderRadius: const BorderRadius.all(
                Radius.circular(16.0),
              ),
              boxShadow: <BoxShadow>[
                BoxShadow(color: btnColor.withOpacity(0.5), offset: const Offset(1.1, 1.1), blurRadius: 10.0),
              ],
            ),
            child: Center(
              child: renderTextElement(),
            ),
          ),
        ),
      ),
    );
  }

  Widget renderTextElement() {
    if (subText == null || subText!.isEmpty) {
      return Text(
        text,
        textAlign: TextAlign.left,
        style: TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 18,
          letterSpacing: 0.0,
          color: textColor,
        ),
      );
    }
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
        style: TextStyle(
          fontSize: textFontSize,
          color: Colors.white,
        ),
        children: <TextSpan>[
          TextSpan(text: '$text\n'),
          TextSpan(
              text: subText,
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: subtextFontSize,
              )),
        ],
      ),
    );
  }
}
