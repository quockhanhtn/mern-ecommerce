import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class UserDto extends GenericDto {
  late String id;
  late String firstName;
  late String lastName;
  late String gender;
  late String email;
  late String phone;
  late String username;
  late bool emptyPassword;
  late String role;
  late String status;
  late String fullName;
  late String avatar;

  UserDto(Map<String, dynamic> json) : super(json) {
    id = MapUtil.getString(json, '_id');
    firstName = MapUtil.getString(json, 'firstName');
    lastName = MapUtil.getString(json, 'lastName');
    gender = MapUtil.getString(json, 'gender');
    email = MapUtil.getString(json, 'email');
    phone = MapUtil.getString(json, 'phone');
    username = MapUtil.getString(json, 'username');
    emptyPassword = MapUtil.getBool(json, 'emptyPassword');
    role = MapUtil.getString(json, 'role');
    status = MapUtil.getString(json, 'status');
    fullName = MapUtil.getString(json, 'fullName');
    avatar = MapUtil.getString(json, 'avatar');
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        '_id': id,
        'firstName': firstName,
        'lastName': lastName,
        'gender': gender,
        'email': email,
        'phone': phone,
        'username': username,
        'emptyPassword': emptyPassword,
        'role': role,
        'status': status,
        'fullName': fullName,
      };
}
