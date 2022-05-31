import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/address_controller.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/dto/admin_unit_dto.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

class TextFiledCustom extends StatelessWidget {
  const TextFiledCustom(
    this.iconData,
    this.hintText, {
    required this.padding,
    required this.controller,
    Key? key,
  }) : super(key: key);

  final IconData iconData;
  final String hintText;
  final EdgeInsets padding;
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Container(
        decoration: BoxDecoration(
          color: kSecondaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(15),
        ),
        child: TextField(
          controller: controller,
          textAlignVertical: TextAlignVertical.center,
          textInputAction: TextInputAction.search,
          decoration: InputDecoration(
            contentPadding: const EdgeInsets.symmetric(horizontal: 0, vertical: 0),
            border: InputBorder.none,
            focusedBorder: InputBorder.none,
            enabledBorder: InputBorder.none,
            hintText: hintText,
            prefixIcon: Icon(iconData),
          ),
        ),
      ),
    );
  }
}

class AdminUnitPicker extends StatelessWidget {
  final EdgeInsetsGeometry padding;
  final String label;
  final String notFoundLabel;
  final TextEditingController textController;
  final void Function(AdminUnitDto) handleSuggestionSelected;
  final FutureOr<Iterable<AdminUnitDto>> Function(String) handleSuggestionsCallback;
  final void Function()? onClear;
  final void Function()? onTapText;

  const AdminUnitPicker({
    Key? key,
    required this.padding,
    required this.label,
    required this.notFoundLabel,
    required this.textController,
    required this.handleSuggestionsCallback,
    required this.handleSuggestionSelected,
    this.onClear,
    this.onTapText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Container(
        decoration: BoxDecoration(
          color: kSecondaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(15),
        ),
        child: TypeAheadFormField<AdminUnitDto>(
          textFieldConfiguration: TextFieldConfiguration(
            controller: textController,
            onTap: onTapText ?? () {},
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 15,
                vertical: 15,
              ),
              border: InputBorder.none,
              focusedBorder: InputBorder.none,
              enabledBorder: InputBorder.none,
              hintText: label,
              suffixIcon: IconButton(
                onPressed: onClear ?? textController.clear,
                icon: const Icon(Icons.clear),
              ),
            ),
          ),
          noItemsFoundBuilder: (context) => ListTile(title: Text(notFoundLabel)),
          suggestionsCallback: handleSuggestionsCallback,
          itemBuilder: (context, suggestion) {
            return ListTile(
              title: Text(suggestion.name),
            );
          },
          transitionBuilder: (context, suggestionsBox, controller) {
            return suggestionsBox;
          },
          onSuggestionSelected: handleSuggestionSelected,
        ),
      ),
    );
  }
}

class AddressPicker extends StatelessWidget {
  final Key getCtlerKey;

  AddressPicker(this.getCtlerKey, {Key? key}) : super(key: key);

  final AddressController addController = Get.put(AddressController());
  final TextEditingController nameTxtEditCtl = TextEditingController();
  final TextEditingController phoneTxtEditCtl = TextEditingController();
  final TextEditingController provinceTxtEditCtl = TextEditingController();
  final TextEditingController districtTxtEditCtl = TextEditingController();
  final TextEditingController wardTextTxtEditCtl = TextEditingController();

  Iterable<AdminUnitDto> getProvinces(pattern) {
    return AdminUnitDto.getProvinces(pattern);
  }

  Iterable<AdminUnitDto> _getDistricts(pattern) {
    var province = addController.getProvince(getCtlerKey);
    if (province == null) {
      return const Iterable.empty();
    }
    return AdminUnitDto.getDistricts(pattern, province.code);
  }

  Iterable<AdminUnitDto> _getWards(pattern) {
    var district = addController.getDistrict(getCtlerKey);
    if (district == null) {
      return const Iterable.empty();
    }
    return AdminUnitDto.getWards(pattern, district.code);
  }

  void handleChangeProvince(AdminUnitDto suggestion) {
    addController.setProvince(getCtlerKey, suggestion);
    provinceTxtEditCtl.text = suggestion.name;
    districtTxtEditCtl.clear();
    wardTextTxtEditCtl.clear();
  }

  void _handleChangeDistrict(AdminUnitDto suggestion) {
    addController.setDistrict(getCtlerKey, suggestion);
    districtTxtEditCtl.text = suggestion.name;
    wardTextTxtEditCtl.clear();
  }

  void _handleChangeWard(AdminUnitDto suggestion) {
    addController.setWard(getCtlerKey, suggestion);
    wardTextTxtEditCtl.text = suggestion.name;
  }

  void handleClearProvince() {
    addController.clearProvince(getCtlerKey);
    provinceTxtEditCtl.clear();
    districtTxtEditCtl.clear();
    wardTextTxtEditCtl.clear();
  }

  void _handleClearDistrict() {
    addController.clearDistrict(getCtlerKey);
    districtTxtEditCtl.clear();
    wardTextTxtEditCtl.clear();
  }

  void _handleClearWard() {
    addController.clearWard(getCtlerKey);
    wardTextTxtEditCtl.clear();
  }

  void _handleTapDistrict(context) {
    if (addController.getProvince(getCtlerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Tỉnh / Thành phố", type: AlertType.error);
    }
  }

  void _handleTapWard(context) {
    if (addController.getProvince(getCtlerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Tỉnh / Thành phố", type: AlertType.error);
    } else if (addController.getDistrict(getCtlerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Quận / Huyện", type: AlertType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    const inputPadding = EdgeInsets.only(top: 20, bottom: 0);
    return Obx(() {
      List<Widget> children = [];

      var pSelect = addController.getProvince(getCtlerKey);
      var dSelect = addController.getDistrict(getCtlerKey);
      var wSelect = addController.getWard(getCtlerKey);

      // return Column(children: [
      //   Text(pSelect == null ? 'no select' : pSelect.name),
      //   Text(dSelect == null ? 'no select' : dSelect.name),
      //   Text(wSelect == null ? 'no select' : wSelect.name),
      // ]);

      children.add(TextFiledCustom(
        Icons.account_box_rounded,
        'Họ tên',
        padding: inputPadding,
        controller: nameTxtEditCtl,
      ));
      children.add(TextFiledCustom(
        Icons.phone,
        'Số diện thoại',
        padding: inputPadding,
        controller: phoneTxtEditCtl,
      ));

      children.add(
        AdminUnitPicker(
          padding: inputPadding,
          label: 'Tỉnh / Thành phố',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: provinceTxtEditCtl,
          handleSuggestionsCallback: getProvinces,
          handleSuggestionSelected: handleChangeProvince,
          onClear: handleClearProvince,
        ),
      );

      children.add(
        AdminUnitPicker(
          padding: inputPadding,
          label: 'Quận / Huyện',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: districtTxtEditCtl,
          handleSuggestionsCallback: _getDistricts,
          handleSuggestionSelected: _handleChangeDistrict,
          onClear: _handleClearDistrict,
          onTapText: () => _handleTapDistrict(context),
        ),
      );

      children.add(
        AdminUnitPicker(
          padding: inputPadding,
          label: 'Xã / Phường',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: wardTextTxtEditCtl,
          handleSuggestionsCallback: _getWards,
          handleSuggestionSelected: _handleChangeWard,
          onClear: _handleClearWard,
          onTapText: () => _handleTapWard(context),
        ),
      );

      return Column(children: children);
    });
  }
}
