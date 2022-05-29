import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/core/utils/get_snackbar_util.dart';
import 'package:hk_mobile/screens/address_book/components/address_card.dart';

class AddressListView extends StatelessWidget {
  AddressListView({Key? key}) : super(key: key);

  final AccountController accountController = Get.put(AccountController());

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (accountController.isLoadingAdd.isTrue) {
        return const Text('Loading ..');
      }

      return ListView.builder(
        padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
        itemCount: accountController.lstAdd.length,
        scrollDirection: Axis.vertical,
        itemBuilder: (BuildContext context, int index) => AddressCard(
          accountController.lstAdd[index],
          onEdit: _handleEditAddress,
          onSetDefault: (addressId) => _handleSetDefaultAddress(context, addressId),
          onDelete: _handleDeleteAddress,
        ),
      );
    });
  }

  void _handleEditAddress(String addressId) {}

  void _handleDeleteAddress(String addressId) {}

  void _handleSetDefaultAddress(BuildContext context, String addressId) {
    accountController.setDefaultAddress(
      addressId,
      (mgs) => GetSnackbarUtil.showSuccess(mgs),
    );
  }
}
