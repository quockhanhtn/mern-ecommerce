import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';

class AddressBottomSheet extends StatelessWidget {
  AddressBottomSheet(
    this.controller, {
    Key? key,
  }) : super(key: key);

  GFBottomSheetController controller;

  @override
  Widget build(BuildContext context) {
    return GFBottomSheet(
      animationDuration: 500,
      controller: controller,
      maxContentHeight: 500,
      contentBody: Container(
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 0),
        child: Column(
          children: [
            const Divider(height: 2),
            const SizedBox(height: 10),
            const GFTypography(text: 'Thêm địa chỉ mới'),
            ListView(
              shrinkWrap: true,
              physics: const ScrollPhysics(),
              children: [AddressPicker(UniqueKey())],
            ),
          ],
        ),
      ),
      // stickyFooter: Padding(
      //   padding: const EdgeInsets.only(left: 30, right: 30, bottom: 10),
      //   child: Container(
      //     color: GFColors.TRANSPARENT,
      //     child: CustomBtn(
      //       text: 'Hủy',
      //       btnColor: AppTheme.darkGrey.withOpacity(0.3),
      //       textColor: AppTheme.nearlyWhite,
      //       btnPadding: const EdgeInsets.all(0),
      //     ),
      //   ),
      // ),
      stickyFooterHeight: 60,
    );
  }
}
