import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/screens/home/home_screen.dart';
import 'package:hk_mobile/screens/profile/profile_screen.dart';

enum MenuState { home, favourite, message, profile }

class CustomBottomNavBar extends StatelessWidget {
  const CustomBottomNavBar({Key? key, required this.selectedMenu, required this.activeIconColor}) : super(key: key);

  final MenuState selectedMenu;
  final Color activeIconColor;

  @override
  Widget build(BuildContext context) {
    const Color inActiveIconColor = Color(0xFFB6B6B6);
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            offset: const Offset(0, -15),
            blurRadius: 20,
            color: const Color(0xFFDADADA).withOpacity(0.15),
          ),
        ],
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(40),
          topRight: Radius.circular(40),
        ),
      ),
      child: SafeArea(
          top: false,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(
                icon: SvgPicture.asset(
                  "assets/icons/ic_shop.svg",
                  color: MenuState.home == selectedMenu ? inActiveIconColor : inActiveIconColor,
                ),
                onPressed: () => Get.to(const HomeScreen()),
              ),
              IconButton(
                icon: SvgPicture.asset("assets/icons/ic_heart_outline.svg"),
                onPressed: () {},
              ),
              IconButton(
                icon: SvgPicture.asset("assets/icons/ic_chat_bubble.svg"),
                onPressed: () {},
              ),
              IconButton(
                  icon: SvgPicture.asset(
                    "assets/icons/ic_user.svg",
                    color: MenuState.profile == selectedMenu ? inActiveIconColor : inActiveIconColor,
                  ),
                  onPressed: () => Get.to(ProfileScreen())
                  // Navigator.pushNamed(context, ProfileScreen.routeName),
                  ),
            ],
          )),
    );
  }
}
