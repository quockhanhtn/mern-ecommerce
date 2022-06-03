import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/screens/address_book/add_address_screen.dart';
import 'package:hk_mobile/screens/address_book/components/address_list_view.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';
import 'package:hk_mobile/size_config.dart';

class AddressBookScreen extends StatelessWidget {
  AddressBookScreen({Key? key}) : super(key: key);

  final AccountController accountController = Get.put(AccountController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
      bottomNavigationBar: _buildBottom(context),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [Text("Địa chỉ", style: TextStyle(color: Colors.black))],
      ),
      actions: [
        IconButton(
          onPressed: () {
            accountController.fetchAddress();
          },
          icon: const Icon(Icons.refresh),
        ),
      ],
    );
  }

  Widget _buildBody() {
    return Stack(
      children: <Widget>[
        AddressListView(),
        // AddressPicker(UniqueKey()),
      ],
    );
  }

  Widget _buildBottom(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        vertical: getProportionateScreenWidth(15),
        horizontal: getProportionateScreenWidth(30),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        boxShadow: [
          BoxShadow(
            offset: const Offset(0, -15),
            blurRadius: 20,
            color: const Color(0xFFDADADA).withOpacity(0.15),
          )
        ],
      ),
      child: SafeArea(
        child: CustomBtn(
          text: 'Thêm địa chỉ',
          btnColor: AppTheme.nearlyBlue,
          textColor: AppTheme.nearlyWhite,
          btnPadding: const EdgeInsets.all(0),
          onTap: () {
            Get.to(() => AddAddressScreen());
          },
        ),
      ),
    );
  }
}
