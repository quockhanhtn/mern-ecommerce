import 'package:flutter/material.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/screens/address_book/components/address_list_view.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';
import 'package:hk_mobile/size_config.dart';

class AddressBookScreen extends StatelessWidget {
  AddressBookScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: renderAppBar(),
      body: renderBody(),
      bottomNavigationBar: renderBottom(context),
    );
  }

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  PreferredSizeWidget renderAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [Text("Địa chỉ", style: TextStyle(color: Colors.black))],
      ),
    );
  }

  Widget renderBody() {
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

  Widget renderBottom(BuildContext context) {
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
          onTap: () {},
        ),
      ),
    );
  }
}
