import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/dto/admin_unit_dto.dart';

class AddressController extends GetxController {
  var provinceMap = (<Key, AdminUnitDto?>{}).obs;
  var districtMap = (<Key, AdminUnitDto?>{}).obs;
  var wardMap = (<Key, AdminUnitDto?>{}).obs;

  void setProvince(Key key, AdminUnitDto province) {
    AdminUnitDto? currentProvince = getProvince(key);
    if (currentProvince == null || currentProvince != province) {
      provinceMap[key] = province;
      provinceMap.refresh();
      districtMap[key] = null;
      districtMap.refresh();
      wardMap[key] = null;
      wardMap.refresh();
    }
  }

  void setDistrict(Key key, AdminUnitDto district) {
    AdminUnitDto? currentDistrict = getDistrict(key);
    if (currentDistrict == null || currentDistrict != district) {
      districtMap[key] = district;
      districtMap.refresh();
      wardMap[key] = null;
      wardMap.refresh();
    }
  }

  void setWard(Key key, AdminUnitDto ward) {
    AdminUnitDto? currentWard = getWard(key);
    if (currentWard == null || currentWard != ward) {
      wardMap[key] = ward;
      wardMap.refresh();
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
}
