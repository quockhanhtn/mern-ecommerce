import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/address_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';
import 'package:hk_mobile/size_config.dart';

class AddAddressScreen extends StatelessWidget {
  AddAddressScreen({Key? key}) : super(key: key);

  final AddressController addController = Get.put(AddressController());
  final AccountController accountController = Get.put(AccountController());
  final UniqueKey pickerKey = UniqueKey();

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
        children: const [Text("Thêm địa chỉ mới", style: TextStyle(color: Colors.black))],
      ),
    );
  }

  Widget _buildBody() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 0),
      child: Stack(
        children: <Widget>[
          AddressPicker(pickerKey),
        ],
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
        child: Row(
          children: [
            CustomBtn(
              text: 'Lưu',
              btnColor: AppTheme.nearlyBlue,
              textColor: AppTheme.nearlyWhite,
              btnMargin: const EdgeInsets.only(right: 5),
              onTap: () {
                if (addController.validate(pickerKey)) {
                  accountController.addNew(addController.getUserInput(pickerKey), () {
                    GetXUtil.showSnackBarSuccess('Thêm địa chỉ thành công !');
                    Navigator.pop(context);
                  }, (String errMgs) {
                    GetXUtil.showSnackbarError(errMgs);
                  });
                }
              },
            ),
            CustomBtn(
              text: 'Hủy',
              btnColor: AppTheme.darkGrey.withOpacity(0.5),
              textColor: AppTheme.nearlyWhite,
              btnMargin: const EdgeInsets.only(left: 5),
              onTap: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
