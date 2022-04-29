import 'package:flutter/material.dart';

class SearchField extends StatelessWidget {
  SearchField(
      {Key? key,
      this.text,
      this.hintText,
      this.width,
      this.boxColor,
      required this.horizontalPadding,
      required this.verticalPadding,
      this.onSubmitted})
      : super(key: key);

  final String? text;
  final String? hintText;
  final double? width;
  final Color? boxColor;
  final double horizontalPadding;
  final double verticalPadding;
  final Function? onSubmitted;

  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (text != null) {
      _controller.value = _controller.value.copyWith(
        text: text,
        selection: const TextSelection.collapsed(offset: 0),
      );
    }
    return Container(
      width: width,
      decoration: BoxDecoration(
        color: boxColor,
        borderRadius: BorderRadius.circular(15),
      ),
      child: TextField(
        controller: _controller,
        textAlignVertical: TextAlignVertical.center,
        onChanged: (value) => {},
        textInputAction: TextInputAction.search,
        onSubmitted: (value) {
          if (onSubmitted != null) {
            onSubmitted!(value);
          }
        },
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
