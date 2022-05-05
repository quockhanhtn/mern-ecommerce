import 'package:flutter/material.dart';

class CustomBtn extends StatelessWidget {
  const CustomBtn({
    Key? key,
    required this.text,
    required this.btnColor,
    required this.textColor,
    required this.btnPadding,
    this.onTap,
  }) : super(key: key);

  final String text;
  final Color btnColor;
  final Color textColor;
  final EdgeInsetsGeometry btnPadding;
  final Function? onTap;

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
              child: Text(
                text,
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 18,
                  letterSpacing: 0.0,
                  color: textColor,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
