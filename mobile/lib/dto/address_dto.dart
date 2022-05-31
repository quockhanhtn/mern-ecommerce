import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/core/utils/str_util.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class AddressDto extends GenericDto {
  AddressDto(Map<String, dynamic> json) : super(json) {
    id = MapUtil.getString(json, '_id');
    name = MapUtil.getString(json, 'name');
    phone = MapUtil.getString(json, 'phone');
    isDefault = MapUtil.getBool(json, 'isDefault');
    province = MapUtil.getString(json, 'province');
    district = MapUtil.getString(json, 'district');
    ward = MapUtil.getString(json, 'ward');
    street = MapUtil.getString(json, 'street');
    type = MapUtil.getString(json, 'type');
    note = MapUtil.getString(json, 'note');
  }

  AddressDto.fromValues({
    required this.name,
    required this.phone,
    required this.isDefault,
    required this.province,
    required this.district,
    required this.ward,
    required this.street,
    required this.type,
    required this.note,
  }) : super(<String, dynamic>{}) {
    id = '';
  }

  late String id;
  late String name;
  late String phone;
  late bool isDefault;

  late String province;
  late String district;
  late String ward;
  late String street;

  late String type;
  late String note;

  @override
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
