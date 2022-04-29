class UserDto {
  final String id;
  final String firstName;
  final String lastName;
  final String gender;
  final String email;
  final String? phone;
  final String username;
  final bool emptyPassword;
  final String role;
  final String status;
  final String fullName;
  final String? avatar;

  UserDto(
      this.id,
      this.firstName,
      this.lastName,
      this.gender,
      this.email,
      this.phone,
      this.username,
      this.emptyPassword,
      this.role,
      this.status,
      this.fullName,
      this.avatar);

  factory UserDto.fromJson(Map<String, dynamic> json) {
    return UserDto(
        json['_id'] as String,
        json['firstName'] as String,
        json['lastName'] as String,
        json['gender'] as String,
        json['email'] as String,
        json['phone'] as String?,
        json['username'] as String,
        json['emptyPassword'] as bool,
        json['role'] as String,
        json['status'] as String,
        json['fullName'] as String,
        json['avatar'] as String?);
  }

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
        'fullName': fullName
      };
}
