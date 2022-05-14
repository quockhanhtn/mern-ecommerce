import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  const SearchBar({
    Key? key,
    this.text,
    this.hintText,
    this.width,
    this.boxColor,
    required this.horizontalPadding,
    required this.verticalPadding,
    this.onSubmitted,
    this.onChanged,
  }) : super(key: key);

  final String? text;
  final String? hintText;
  final double? width;
  final Color? boxColor;
  final double horizontalPadding;
  final double verticalPadding;
  final Function? onSubmitted;
  final Function? onChanged;

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
        onChanged: (value) {
          if (onChanged != null) {
            onChanged!(value);
          }
        },
        textInputAction: TextInputAction.search,
        onSubmitted: (value) {
          if (onSubmitted != null) {
            onSubmitted!(value);
          }
        },
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: verticalPadding),
          border: InputBorder.none,
          focusedBorder: InputBorder.none,
          enabledBorder: InputBorder.none,
          hintText: hintText,
          suffixIcon: const Icon(Icons.search),
        ),
      ),
    );
  }
}
