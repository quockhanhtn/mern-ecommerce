import 'package:hk_mobile/core/utils/str_util.dart';

class AddressDto {
  AddressDto(
    this.id,
    this.name,
    this.phone,
    this.isDefault,
    this.province,
    this.district,
    this.ward,
    this.street,
    this.type,
    this.note,
  );

  String id;
  String name;
  String phone;
  bool isDefault;

  String province;
  String district;
  String ward;
  String street;

  String type;
  String note;

  factory AddressDto.fromJson(Map<String, dynamic> json) {
    return AddressDto(
      (json['_id'] as String?) ?? '',
      (json['name'] as String?) ?? '',
      (json['phone'] as String?) ?? '',
      json['isDefault'] ?? false,
      (json['province'] as String?) ?? '',
      (json['district'] as String?) ?? '',
      (json['ward'] as String?) ?? '',
      (json['street'] as String?) ?? '',
      (json['type'] as String?) ?? '',
      (json['note'] as String?) ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['name'] = name;
    _data['phone'] = phone;
    _data['type'] = type;
    _data['note'] = note;
    _data['street'] = street;
    _data['ward'] = ward;
    _data['district'] = district;
    _data['province'] = province;
    return _data;
  }

  String getDetailAddress() => StrUtil.join([street, ward, district, province]);
}
