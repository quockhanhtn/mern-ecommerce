// ignore_for_file: must_be_immutable

import 'package:flutter/material.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/dto/address_dto.dart';

enum PopupMenuOptions { edit, setDefault, delete }

class AddressCard extends StatelessWidget {
  AddressCard(
    this.address, {
    Key? key,
    required this.onEdit,
    required this.onSetDefault,
    required this.onDelete,
    this.onTap,
    this.padding = const EdgeInsets.only(top: 10, left: 10, right: 20, bottom: 10),
  }) : super(key: key);

  AddressDto address;
  Function(String) onEdit;
  Function(String) onSetDefault;
  Function(String) onDelete;
  Function()? onTap;
  EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ShadowContainer(
          onTap: onTap,
          child: _buildAddressInfo(context),
          padding: padding,
          margin: const EdgeInsets.symmetric(horizontal: 0, vertical: 5),
        ),
        Positioned(
          right: 5,
          top: 10,
          child: _buildPopupMenu(),
        ),
      ],
    );
  }

  Widget _buildAddressInfo(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Padding(
          padding: const EdgeInsets.only(bottom: 5, top: 5),
          child: Text(
            address.name + ' | ' + address.phone,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w500,
              color: AppTheme.darkText,
            ),
            maxLines: 2,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          address.getDetailAddress(),
          style: Theme.of(context).textTheme.bodyText1,
          maxLines: 2,
        ),
        const SizedBox(height: 5),
        Row(
          children: _buildAddressLabels(),
        )
      ],
    );
  }

  List<Widget> _buildAddressLabels() {
    List<Widget> labels = [];
    if (address.isDefault) {
      labels.add(
        Container(
          margin: const EdgeInsets.all(2),
          padding: const EdgeInsets.all(3),
          decoration: BoxDecoration(
            border: Border.all(color: AppTheme.colorSuccess),
            borderRadius: const BorderRadius.all(Radius.circular(10)),
          ),
          child: const Text('Mặc định'),
        ),
      );
    }
    if (address.type.isNotEmpty) {
      labels.add(
        Container(
          margin: const EdgeInsets.all(2),
          padding: const EdgeInsets.all(3),
          decoration: BoxDecoration(
            border: Border.all(color: AppTheme.colorInfo),
            borderRadius: const BorderRadius.all(Radius.circular(10)),
          ),
          child: Text(address.type),
        ),
      );
    }

    return labels;
  }

  Widget _buildPopupMenu() {
    return PopupMenuButton<PopupMenuOptions>(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(8.0)),
      ),
      itemBuilder: (ctx) {
        if (address.isDefault) {
          return [
            _buildPopupMenuItem(ctx, 'Chỉnh sửa', Icons.edit, PopupMenuOptions.edit),
            _buildPopupMenuItem(ctx, 'Xóa', Icons.delete, PopupMenuOptions.delete),
          ];
        }
        return [
          _buildPopupMenuItem(ctx, 'Chỉnh sửa', Icons.edit, PopupMenuOptions.edit),
          _buildPopupMenuItem(ctx, 'Đặt làm mặc định', Icons.flag_sharp, PopupMenuOptions.setDefault),
          _buildPopupMenuItem(ctx, 'Xóa', Icons.delete, PopupMenuOptions.delete),
        ];
      },
      onSelected: (value) {
        switch (value) {
          case PopupMenuOptions.edit:
            onEdit(address.id);
            break;
          case PopupMenuOptions.setDefault:
            onSetDefault(address.id);
            break;
          case PopupMenuOptions.delete:
            onDelete(address.id);
            break;
        }
      },
    );
  }

  PopupMenuItem<PopupMenuOptions> _buildPopupMenuItem(
    BuildContext context,
    String title,
    IconData iconData,
    PopupMenuOptions opt,
  ) {
    Color popupColor = Colors.black;
    switch (opt) {
      case PopupMenuOptions.edit:
        popupColor = AppTheme.colorInfo;
        break;
      case PopupMenuOptions.setDefault:
        popupColor = AppTheme.colorSuccess;
        break;
      case PopupMenuOptions.delete:
        popupColor = AppTheme.colorError;
        break;
    }
    return PopupMenuItem(
      padding: const EdgeInsets.only(left: 15, right: 0),
      value: opt,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Icon(iconData, color: popupColor, size: 24),
          const SizedBox(width: 10),
          Text(
            title,
            textAlign: TextAlign.start,
            style: Theme.of(context).textTheme.labelLarge,
          ),
          const SizedBox(width: 0),
        ],
      ),
    );
  }
}
