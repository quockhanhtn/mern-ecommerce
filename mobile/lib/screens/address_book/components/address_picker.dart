import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/address_controller.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/dto/admin_unit_dto.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

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
  final Key controllerKey;

  AddressPicker(this.controllerKey, {Key? key}) : super(key: key);

  final AddressController addController = Get.put(AddressController());
  final TextEditingController provinceTextEController = TextEditingController();
  final TextEditingController districtTextEController = TextEditingController();
  final TextEditingController wardTextEController = TextEditingController();

  Iterable<AdminUnitDto> getProvinces(pattern) {
    return AdminUnitDto.getProvinces(pattern);
  }

  Iterable<AdminUnitDto> _getDistricts(pattern) {
    var province = addController.getProvince(controllerKey);
    if (province == null) {
      return const Iterable.empty();
    }
    return AdminUnitDto.getDistricts(pattern, province.code);
  }

  Iterable<AdminUnitDto> _getWards(pattern) {
    var district = addController.getDistrict(controllerKey);
    if (district == null) {
      return const Iterable.empty();
    }
    return AdminUnitDto.getWards(pattern, district.code);
  }

  void handleChangeProvince(AdminUnitDto suggestion) {
    addController.setProvince(controllerKey, suggestion);
    provinceTextEController.text = suggestion.name;
    districtTextEController.clear();
    wardTextEController.clear();
  }

  void _handleChangeDistrict(AdminUnitDto suggestion) {
    addController.setDistrict(controllerKey, suggestion);
    districtTextEController.text = suggestion.name;
    wardTextEController.clear();
  }

  void _handleChangeWard(AdminUnitDto suggestion) {
    addController.setWard(controllerKey, suggestion);
    wardTextEController.text = suggestion.name;
  }

  void handleClearProvince() {
    addController.clearProvince(controllerKey);
    provinceTextEController.clear();
    districtTextEController.clear();
    wardTextEController.clear();
  }

  void _handleClearDistrict() {
    addController.clearDistrict(controllerKey);
    districtTextEController.clear();
    wardTextEController.clear();
  }

  void _handleClearWard() {
    addController.clearWard(controllerKey);
    wardTextEController.clear();
  }

  void _handleTapDistrict(context) {
    if (addController.getProvince(controllerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Tỉnh / Thành phố", type: AlertType.error);
    }
  }

  void _handleTapWard(context) {
    if (addController.getProvince(controllerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Tỉnh / Thành phố", type: AlertType.error);
    } else if (addController.getDistrict(controllerKey) == null) {
      AlertUtil.showSimple(context, content: "Vui lòng chọn Quận / Huyện", type: AlertType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AdminUnitPicker(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
          label: 'Tỉnh / Thành phố',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: provinceTextEController,
          handleSuggestionsCallback: getProvinces,
          handleSuggestionSelected: handleChangeProvince,
          onClear: handleClearProvince,
        ),
        AdminUnitPicker(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
          label: 'Quận / Huyện',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: districtTextEController,
          handleSuggestionsCallback: _getDistricts,
          handleSuggestionSelected: _handleChangeDistrict,
          onClear: _handleClearDistrict,
          onTapText: () => _handleTapDistrict(context),
        ),
        AdminUnitPicker(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
          label: 'Xã / Phường',
          notFoundLabel: 'Không tìm thấy kết quả',
          textController: wardTextEController,
          handleSuggestionsCallback: _getWards,
          handleSuggestionSelected: _handleChangeWard,
          onClear: _handleClearWard,
          onTapText: () => _handleTapWard(context),
        ),
        Obx(() {
          var pSelect = addController.getProvince(controllerKey);
          var dSelect = addController.getDistrict(controllerKey);
          var wSelect = addController.getWard(controllerKey);

          return Column(children: [
            Text(pSelect == null ? 'no select' : pSelect.name),
            Text(dSelect == null ? 'no select' : dSelect.name),
            Text(wSelect == null ? 'no select' : wSelect.name),
          ]);
        }),
      ],
    );
  }
}
