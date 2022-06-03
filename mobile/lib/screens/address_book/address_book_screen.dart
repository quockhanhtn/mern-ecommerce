import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/screens/address_book/add_address_screen.dart';
import 'package:hk_mobile/screens/address_book/components/address_list_view.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';
import 'package:hk_mobile/size_config.dart';

class AddressBookScreen extends StatelessWidget {
  AddressBookScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
      bottomNavigationBar: _buildBottom(context),
    );
  }

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [Text("Địa chỉ", style: TextStyle(color: Colors.black))],
      ),
    );
  }

  Widget _buildBody() {
    return Stack(
      children: <Widget>[
        AddressListView(),
        // AddressPicker(UniqueKey()),
      ],
    );
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          children: <Widget>[
            AddressListView(),
            AddressPicker(UniqueKey()),
          ],
        ),
      ),
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
