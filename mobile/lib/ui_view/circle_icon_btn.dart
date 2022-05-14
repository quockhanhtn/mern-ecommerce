import 'package:badges/badges.dart';
import 'package:flutter/material.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/core/hex_color.dart';

class CircleIconBtn extends StatelessWidget {
  const CircleIconBtn({
    Key? key,
    this.badgeContent,
    this.badgeColor,
    this.iconData,
    this.iconColor = AppTheme.grey,
    this.customIcon,
    this.onPress,
  }) : super(key: key);

  final String? badgeContent;
  final Color? badgeColor;
  final IconData? iconData;
  final Color? iconColor;
  final Widget? customIcon;
  final Function? onPress;

  @override
  Widget build(BuildContext context) {
    var iconWidget = Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: AppTheme.white,
        boxShadow: <BoxShadow>[
          BoxShadow(color: AppTheme.grey.withOpacity(0.2), offset: const Offset(1.1, 1.1), blurRadius: 10.0)
        ],
      ),
      child: CircleAvatar(
        radius: 30,
        backgroundColor: Colors.white,
        child: InkWell(
          highlightColor: Colors.transparent,
          borderRadius: const BorderRadius.all(Radius.circular(32.0)),
          onTap: () {
            onPress!();
          },
          child: Center(
            child: customIcon ?? Icon(iconData, color: iconColor),
          ),
        ),
      ),
    );

    if (badgeContent == null || badgeContent!.isEmpty || badgeContent == '0') {
      return iconWidget;
    }
    return Badge(
      badgeContent: Text(
        badgeContent!,
        style: const TextStyle(color: Colors.white),
      ),
      gradient: LinearGradient(
        colors: [
          AppTheme.nearlyDarkBlue.withOpacity(1),
          HexColor("#6F56E8").withOpacity(0.8),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      animationType: BadgeAnimationType.slide,
      child: iconWidget,
    );
  }
}
