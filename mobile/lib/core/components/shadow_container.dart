import 'package:flutter/material.dart';

class ShadowContainer extends StatelessWidget {
  const ShadowContainer({
    Key? key,
    this.padding = const EdgeInsets.all(0),
    this.margin = const EdgeInsets.all(0),
    this.color = Colors.white,
    this.borderRadius = const BorderRadius.all(Radius.circular(10)),
    this.border,
    required this.child,
    this.boxShadowColor = Colors.grey,
    this.boxShadowColorOpacity = 0.4,
    this.boxShadowSpreadRadius = 3,
    this.boxShadowBlurRadius = 7,
    this.boxShadowOffset = const Offset(0, 3),
    this.onTap,
    this.height,
  }) : super(key: key);

  final EdgeInsetsGeometry padding;
  final EdgeInsets margin;
  final Color color;
  final BorderRadiusGeometry borderRadius;
  final BoxBorder? border;
  final Widget child;

  final Color boxShadowColor;
  final double boxShadowColorOpacity;
  final double boxShadowSpreadRadius;
  final double boxShadowBlurRadius;
  final Offset boxShadowOffset;

  final double? height;
  final Function? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap as void Function()?,
      child: Container(
        height: height,
        margin: margin,
        decoration: BoxDecoration(
            color: color,
            borderRadius: borderRadius,
            boxShadow: [
              BoxShadow(
                color: boxShadowColor.withOpacity(boxShadowColorOpacity), // Colors.grey.withOpacity(0.4),
                spreadRadius: boxShadowSpreadRadius,
                blurRadius: boxShadowBlurRadius,
                offset: boxShadowOffset,
              ),
            ],
            border: border),
        child: Padding(
          padding: padding,
          child: child,
        ),
      ),
    );
  }
}
