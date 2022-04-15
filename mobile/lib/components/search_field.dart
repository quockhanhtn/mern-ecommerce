import 'package:flutter/material.dart';

class SearchField extends StatelessWidget {
  const SearchField(
      {Key? key,
      this.hintText,
      this.width,
      this.boxColor,
      required this.horizontalPadding,
      required this.verticalPadding})
      : super(key: key);

  final String? hintText;
  final double? width;
  final Color? boxColor;
  final double horizontalPadding;
  final double verticalPadding;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      decoration: BoxDecoration(
        color: boxColor,
        borderRadius: BorderRadius.circular(15),
      ),
      child: TextField(
        textAlignVertical: TextAlignVertical.center,
        onChanged: (value) => {},
        decoration: InputDecoration(
            contentPadding: EdgeInsets.symmetric(
                horizontal: horizontalPadding, vertical: verticalPadding),
            border: InputBorder.none,
            focusedBorder: InputBorder.none,
            enabledBorder: InputBorder.none,
            hintText: hintText,
            prefixIcon: const Icon(Icons.search)),
      ),
    );
  }
}
