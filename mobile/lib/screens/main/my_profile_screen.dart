import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/authentication_controller.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/screens/address_book/address_book_screen.dart';
import 'package:hk_mobile/screens/main/components/profile_menu.dart';
import 'package:hk_mobile/screens/order/list_order_screen.dart';
import 'package:hk_mobile/screens/sign_in/sign_in_screen.dart';
import 'package:hk_mobile/ui_view/profile_picture.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

class MyProfileScreen extends StatelessWidget {
  final AuthenticationController authController = Get.put(AuthenticationController());

  MyProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(context),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      automaticallyImplyLeading: false,
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [
          Text(
            "Tài khoản",
            style: TextStyle(color: Colors.black),
          )
        ],
      ),
    );
  }

  Widget _buildBody(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Obx(() {
        if (authController.isLoading.isTrue) {
          return const Center(child: CircularProgressIndicator());
        } else if (authController.isAuthenticated.isTrue) {
          return Column(children: _buildItems(context));
        } else {
          return Column(
            children: [
              ProfileMenu(
                text: "Đăng nhập",
                icon: "assets/icons/Log out.svg",
                press: () {
                  Get.to(() => const SignInScreen());
                },
              ),
            ],
          );
        }
      }),
    );
  }

  List<Widget> _buildItems(BuildContext context) {
    return [
      ProfilePicture(url: authController.list.first.avatar),
      const SizedBox(height: 20),
      ProfileMenu(
        text: "Địa chỉ",
        icon: "assets/icons/ic_location.svg",
        press: () {
          Get.to(() => AddressBookScreen());
        },
      ),
      ProfileMenu(
        text: "Đơn hàng",
        icon: "assets/icons/ic_bell.svg",
        press: () {
          Get.to(() => ListOrderScreen());
        },
      ),
      ProfileMenu(
        text: "Cài đặt",
        icon: "assets/icons/Settings.svg",
        press: () {
          AlertUtil.showSimple(
            context,
            content: 'Tính năng đang phát triển',
            type: AlertType.warning,
          );
        },
      ),
      ProfileMenu(
        text: "Hỗ trợ",
        icon: "assets/icons/Question mark.svg",
        press: () {
          AlertUtil.showSimple(
            context,
            content: 'Tính năng đang phát triển',
            type: AlertType.warning,
          );
        },
      ),
      ProfileMenu(
        text: "Đăng xuất",
        icon: "assets/icons/Log out.svg",
        press: () {
          authController.logout();
        },
      ),
    ];
  }
}
