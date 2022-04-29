import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/authentication_controller.dart';
import 'package:hk_mobile/core/components/custom_bottom_nav_bar.dart';

import 'components/body.dart';

class ProfileScreen extends StatelessWidget {
  static String routeName = "/profile";

  late AuthenticationController authController;

  ProfileScreen({Key? key}) : super(key: key) {
    authController = Get.put(AuthenticationController());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Tài khoản"),
      ),
      body: Body(),
      bottomNavigationBar: const CustomBottomNavBar(
        selectedMenu: MenuState.profile,
        activeIconColor: kPrimaryColor,
      ),
    );
  }
}
