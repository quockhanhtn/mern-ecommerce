import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  const CustomTextField({
    this.inputColor,
    this.hintText = '',
    this.prefixIcon,
    this.padding = const EdgeInsets.all(0),
    this.contentPadding = const EdgeInsets.all(0),
    this.keyboardType,
    this.controller,
    this.onChanged,
    Key? key,
  }) : super(key: key);

  final IconData? prefixIcon;
  final String hintText;
  final Color? inputColor;
  final EdgeInsets padding;
  final EdgeInsets contentPadding;
  final TextInputType? keyboardType;
  final TextEditingController? controller;
  final Function(String)? onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Container(
        decoration: BoxDecoration(
          color: inputColor,
          borderRadius: BorderRadius.circular(15),
        ),
        child: TextField(
          controller: controller,
          textAlignVertical: TextAlignVertical.center,
          textInputAction: TextInputAction.next,
          textCapitalization: TextCapitalization.sentences,
          keyboardType: keyboardType,
          decoration: InputDecoration(
            contentPadding: contentPadding,
            border: InputBorder.none,
            focusedBorder: InputBorder.none,
            enabledBorder: InputBorder.none,
            hintText: hintText,
            prefixIcon: Icon(prefixIcon),
          ),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
