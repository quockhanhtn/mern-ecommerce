import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/core/utils/str_util.dart';
import 'package:hk_mobile/dto/address_dto.dart';
import 'package:hk_mobile/dto/admin_unit_dto.dart';

class AddressController extends GetxController {
  var nameMap = (<Key, String>{}).obs;
  var phoneMap = (<Key, String>{}).obs;
  var typeMap = (<Key, String>{}).obs;
  var noteMap = (<Key, String>{}).obs;
  var isDefaultMap = (<Key, bool>{}).obs;
  var provinceMap = (<Key, AdminUnitDto?>{}).obs;
  var districtMap = (<Key, AdminUnitDto?>{}).obs;
  var wardMap = (<Key, AdminUnitDto?>{}).obs;
  var streetMap = (<Key, String?>{}).obs;

  var errorsMap = (<Key, List<String>>{}).obs;

  void setProvince(Key key, AdminUnitDto province) {
    AdminUnitDto? currentProvince = getProvince(key);
    if (currentProvince == null || currentProvince != province) {
      provinceMap[key] = province;
      provinceMap.refresh();
      districtMap[key] = null;
      districtMap.refresh();
      wardMap[key] = null;
      wardMap.refresh();
      validate(key);
    }
  }

  void setDistrict(Key key, AdminUnitDto district) {
    AdminUnitDto? currentDistrict = getDistrict(key);
    if (currentDistrict == null || currentDistrict != district) {
      districtMap[key] = district;
      districtMap.refresh();
      wardMap[key] = null;
      wardMap.refresh();
      validate(key);
    }
  }

  void setWard(Key key, AdminUnitDto ward) {
    AdminUnitDto? currentWard = getWard(key);
    if (currentWard == null || currentWard != ward) {
      wardMap[key] = ward;
      wardMap.refresh();
      validate(key);
    }
  }

  AdminUnitDto? getProvince(Key key) {
    return provinceMap.containsKey(key) ? provinceMap[key] : null;
  }

  AdminUnitDto? getDistrict(Key key) {
    return districtMap.containsKey(key) ? districtMap[key] : null;
  }

  AdminUnitDto? getWard(Key key) {
    return wardMap.containsKey(key) ? wardMap[key] : null;
  }

  void clearProvince(Key key) {
    if (provinceMap.containsKey(key)) {
      provinceMap[key] = null;
      districtMap[key] = null;
      wardMap[key] = null;
    }
  }

  void clearDistrict(Key key) {
    if (districtMap.containsKey(key)) {
      districtMap[key] = null;
      wardMap[key] = null;
    }
  }

  void clearWard(Key key) {
    if (wardMap.containsKey(key)) {
      wardMap[key] = null;
    }
  }

  void setStreet(Key key, String street) {
    streetMap[key] = street;
    streetMap.refresh();
    validate(key);
  }

  void setName(Key key, String name) {
    nameMap[key] = name;
    nameMap.refresh();
    validate(key);
  }

  void setPhone(Key key, String phone) {
    phoneMap[key] = phone;
    phoneMap.refresh();
    validate(key);
  }

  void setType(Key key, String type) {
    typeMap[key] = type;
    typeMap.refresh();
  }

  void setNote(Key key, String note) {
    noteMap[key] = note;
    noteMap.refresh();
  }

  void setIsDefault(Key key, bool isDefault) {
    isDefaultMap[key] = isDefault;
    isDefaultMap.refresh();
  }

  List<String> getErrors(Key key) {
    if (errorsMap.containsKey(key)) {
      return errorsMap[key]!.whereType<String>().toList();
    }
    return [];
  }

  bool validate(Key key) {
    List<String> errorMgs = [];

    if (StrUtil.isNullOrEmpty(nameMap[key])) {
      errorMgs.add('Vui lòng nhập Họ tên');
    }

    if (StrUtil.isNullOrEmpty(phoneMap[key])) {
      errorMgs.add('Vui lòng nhập Số điện thoại');
    }

    if (getProvince(key) == null) {
      errorMgs.add('Vui lòng chọn Tỉnh / Thành phố');
    }
    if (getDistrict(key) == null) {
      errorMgs.add('Vui lòng chọn Quận / Huyện');
    }
    if (getWard(key) == null) {
      errorMgs.add('Vui lòng chọn Xã / Phường');
    }
    if (StrUtil.isNullOrEmpty(streetMap[key])) {
      errorMgs.add('Vui lòng nhập Địa chỉ cụ thể');
    }

    if (errorMgs.isEmpty) {
      errorsMap[key] = [];
      return true;
    }

    errorsMap[key] = errorMgs;
    return false;
  }

  AddressDto getUserInput(Key key) {
    return AddressDto.fromValues(
      name: MapUtil.getString<Key>(nameMap, key),
      phone: MapUtil.getString<Key>(phoneMap, key),
      isDefault: MapUtil.getBool<Key>(isDefaultMap, key),
      province: provinceMap.containsKey(key) ? provinceMap[key]!.name : '',
      district: districtMap.containsKey(key) ? districtMap[key]!.name : '',
      ward: wardMap.containsKey(key) ? wardMap[key]!.name : '',
      street: MapUtil.getString<Key>(streetMap, key),
      type: MapUtil.getString<Key>(typeMap, key),
      note: MapUtil.getString<Key>(noteMap, key),
    );
  }
}
