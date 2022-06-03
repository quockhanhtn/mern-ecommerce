import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';

class CustomRadio<T> extends StatelessWidget {
  CustomRadio({
    Key? key,
    required this.onChanged,
    required this.value,
    required this.groupValue,
    required this.titleText,
    required this.subTitleText,
    required this.assetImage,
  }) : super(key: key);

  Function(T) onChanged;
  final T value;
  final T groupValue;
  final String titleText;
  final String subTitleText;
  final String assetImage;

  @override
  Widget build(BuildContext context) {
    return GFRadioListTile<T>(
      onChanged: (value) => onChanged(value as T),
      value: value,
      groupValue: groupValue,
      titleText: titleText,
      subTitleText: subTitleText,
      avatar: GFAvatar(
        backgroundImage: AssetImage(assetImage),
        foregroundColor: GFColors.TRANSPARENT,
        shape: GFAvatarShape.standard,
      ),
      size: 25,
      activeBorderColor: AppTheme.nearlyBlue,
      radioColor: AppTheme.nearlyBlue,
      focusColor: AppTheme.nearlyBlue,
      type: GFRadioType.basic,
    );
  }
}
