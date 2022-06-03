import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/dto/address_dto.dart';
import 'package:hk_mobile/screens/address_book/add_address_screen.dart';
import 'package:hk_mobile/screens/address_book/components/address_card.dart';

class SelectAddressListView extends StatelessWidget {
  SelectAddressListView({Key? key}) : super(key: key);

  final AccountController accountController = Get.put(AccountController());
  final OrderController orderController = Get.put(OrderController());

  @override
  Widget build(BuildContext context) {
    orderController.setSelectedAddress('');
    return Obx(() {
      if (accountController.isLoadingAdd.isTrue) {
        return const Text('Loading ..');
      }

      return ListView.builder(
        padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
        itemCount: accountController.lstAdd.length + 1,
        scrollDirection: Axis.vertical,
        itemBuilder: _buildItem,
      );
    });
  }

  Widget _buildItem(BuildContext context, int index) {
    if (index == accountController.lstAdd.length) {
      return Stack(
        children: [
          CustomBtn(
            btnMargin: const EdgeInsets.only(top: 20, right: 0, left: 0),
            text: 'Thêm địa chỉ',
            btnColor: AppTheme.darkGrey,
            textColor: AppTheme.nearlyWhite,
            btnPadding: const EdgeInsets.all(0),
            onTap: () {
              Get.to(() => AddAddressScreen());
            },
          ),
        ],
      );
    }

    AddressDto item = accountController.lstAdd[index];
    return Stack(
      alignment: Alignment.center,
      children: [
        AddressCard(
          item,
          onEdit: _handleEditAddress,
          onSetDefault: (addressId) => _handleSetDefaultAddress(context, addressId),
          onDelete: _handleDeleteAddress,
          padding: const EdgeInsets.only(top: 10, left: 40, right: 20, bottom: 10),
          onTap: () => orderController.setSelectedAddress(item.id),
        ),
        Positioned(
          left: 10,
          child: Obx(() {
            return GFRadio<String>(
              onChanged: (value) {
                orderController.setSelectedAddress(value);
              },
              value: item.id,
              size: GFSize.MEDIUM * 2 / 3,
              radioColor: AppTheme.nearlyBlue,
              activeBgColor: AppTheme.nearlyBlue.withOpacity(0.2),
              activeBorderColor: AppTheme.nearlyBlue,
              type: GFRadioType.basic,
              // activeIcon: const Icon(
              //   Icons.check,
              //   size: 15,
              //   color: Colors.white,
              // ),
              groupValue: orderController.selectedAddressId.value,
              // inactiveIcon: inactiveIcon,
              // checkColor: checkColor,
            );
          }),
        ),
      ],
    );
  }

  void _handleEditAddress(String addressId) {}

  void _handleDeleteAddress(String addressId) {}

  void _handleSetDefaultAddress(BuildContext context, String addressId) {
    accountController.setDefaultAddress(
      addressId,
      (mgs) => GetXUtil.showSnackBarSuccess(mgs),
    );
  }
}
