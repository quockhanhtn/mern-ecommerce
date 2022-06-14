import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/screens/address_book/components/address_card.dart';

class AddressListView extends StatelessWidget {
  AddressListView({Key? key}) : super(key: key);

  final AccountController accountController = Get.put(AccountController());

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (accountController.isLoadingAdd.isTrue) {
        return const Padding(
          padding: EdgeInsets.only(top: 20),
          child: GFLoader(
            type: GFLoaderType.ios,
            size: GFSize.LARGE * 2,
          ),
        );
      }

      if (accountController.lstAdd.isEmpty) {
        return const Center(
          child: Padding(
            padding: EdgeInsets.only(left: 20),
            child: GFTypography(
              text: 'Danh sách địa chỉ trống',
              showDivider: false,
            ),
          ),
        );
      }

      return ListView.builder(
        padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
        itemCount: accountController.lstAdd.length,
        scrollDirection: Axis.vertical,
        itemBuilder: _buildItem,
      );
    });
  }

  Widget _buildItem(BuildContext context, int index) {
    return Obx(() {
      return AddressCard(
        accountController.lstAdd[index],
        onEdit: _handleEditAddress,
        onSetDefault: (addressId) => _handleSetDefaultAddress(context, addressId),
        onDelete: (addressId, name) => _handleDeleteAddress(context, addressId, name),
      );
    });
  }

  void _handleEditAddress(String addressId) {}

  void _handleDeleteAddress(BuildContext context, String addressId, String addName) {
    AlertUtil.showYesNo(
      context,
      content: Column(
        children: [
          const GFTypography(
            text: 'Xác nhận xóa',
          ),
          const SizedBox(height: 10),
          Text.rich(
            TextSpan(
              style: const TextStyle(color: Colors.black, fontSize: 14),
              children: [
                const TextSpan(text: "Bạn có muốn xóa địa chỉ\n"),
                TextSpan(
                  text: addName,
                  style: const TextStyle(
                    fontSize: (16),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            textAlign: TextAlign.left,
          )
        ],
      ),
      onYes: () {
        GetXUtil.showOverlay(
          asyncFunction: () => accountController.deleteAddAsync(addressId, () {
            GetXUtil.showSnackBarSuccess('Xóa địa chỉ thành công !');
          }, (error) {
            GetXUtil.showSnackbarError(error);
          }),
        );
      },
      onNo: () {},
    );
  }

  void _handleSetDefaultAddress(BuildContext context, String addressId) {
    GetXUtil.showOverlay<void>(
      asyncFunction: () =>
          accountController.setDefaultAddressAsync(addressId, (mgs) => GetXUtil.showSnackBarSuccess(mgs)),
    );
  }
}
