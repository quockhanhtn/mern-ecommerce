import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/authentication_controller.dart';
import 'package:hk_mobile/screens/sign_in/sign_in_screen.dart';

import 'profile_menu.dart';
import 'profile_pic.dart';

// ignore: use_key_in_widget_constructors
class Body extends StatelessWidget {
  final AuthenticationController authController =
      Get.put(AuthenticationController());

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Obx(() {
          if (authController.isLoading.isTrue) {
            return const Center(child: CircularProgressIndicator());
          } else if (authController.isAuthenticated.isTrue) {
            return Column(
              children: [
                const ProfilePic(),
                const SizedBox(height: 20),
                ProfileMenu(
                  text: "Tài khoản",
                  icon: "assets/icons/ic_user.svg",
                  press: () => {},
                ),
                ProfileMenu(
                  text: "Thông báo",
                  icon: "assets/icons/ic_bell.svg",
                  press: () {},
                ),
                ProfileMenu(
                  text: "Cài đặt",
                  icon: "assets/icons/Settings.svg",
                  press: () {},
                ),
                ProfileMenu(
                  text: "Hỗ trợ",
                  icon: "assets/icons/Question mark.svg",
                  press: () {},
                ),
                ProfileMenu(
                  text: "Đăng xuất",
                  icon: "assets/icons/Log out.svg",
                  press: () {
                    authController.logout();
                  },
                ),
              ],
            );
          } else {
            return Column(
              children: [
                ProfileMenu(
                  text: "Đăng nhập",
                  icon: "assets/icons/Log out.svg",
                  press: () {
                    Navigator.pushNamed(context, SignInScreen.routeName);
                  },
                ),
              ],
            );
          }
        }));
  }
}
