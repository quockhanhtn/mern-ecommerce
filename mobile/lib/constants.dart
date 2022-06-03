import 'package:flutter/material.dart';
import 'package:hk_mobile/size_config.dart';

//const kApiBaseUrl = 'https://api-mobile7076.herokuapp.com/api/v2/';
const kApiBaseUrl = 'http://192.168.1.84:3001/api/v2/';

const kPrimaryColorLighter = Color(0xFFC8FACD);
const kPrimaryColorLight = Color(0xFF5BE584);
// const kPrimaryColor = Color(0xFF00AB55);
const kPrimaryColor = Color(0xff00B6F0);
const kPrimaryColorDark = Color(0xFF007B55);
const kPrimaryColorDarker = Color(0xFF005249);

const kPrimaryGradientColor = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [Color(0xFF5BE584), Color(0xFF00AB55)],
);
const kSecondaryColor = Color(0xFF979797);
const kTextColor = Color(0xFF757575);

const kAnimationDuration = Duration(milliseconds: 200);

final headingStyle = TextStyle(
  fontSize: getProportionateScreenWidth(28),
  fontWeight: FontWeight.bold,
  color: Colors.black,
  height: 1.5,
);

const defaultDuration = Duration(milliseconds: 250);

// Form Error
final RegExp emailValidatorRegExp = RegExp(r"^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
const String kEmailNullError = "Vui lòng nhập địa chỉ email";
const String kInvalidEmailError = "Email không hợp lệ";
const String kPassNullError = "Vui lòng nhập mật khẩu";
const String kShortPassError = "Mật khầu quá ngắn";
const String kMatchPassError = "Nhập lại mật khẩu không khớp";
const String kNameNullError = "Vui lòng nhậo tên";
const String kPhoneNumberNullError = "Vui lòng nhập số điện thoại";
const String kAddressNullError = "Vui lòng nhập địa chỉ";

final otpInputDecoration = InputDecoration(
  contentPadding: EdgeInsets.symmetric(vertical: getProportionateScreenWidth(15)),
  border: outlineInputBorder(),
  focusedBorder: outlineInputBorder(),
  enabledBorder: outlineInputBorder(),
);

OutlineInputBorder outlineInputBorder() {
  return OutlineInputBorder(
    borderRadius: BorderRadius.circular(getProportionateScreenWidth(15)),
    borderSide: const BorderSide(color: kTextColor),
  );
}

const List<String> kOrderStatus = [
  'pending',
  'confirmed',
  'shipping',
  'completed',
  'cancelled',
];
const List<String> kOrderStatusName = [
  'Chờ xác nhận',
  'Đã xác nhận',
  'Đang vận chuyển',
  'Đã hoàn thành',
  'Đã hủy',
];

const List<String> kOrderPaymentMethod = [
  'cash',
  'cod',
  'vnpay',
];
const List<String> kOrderPaymentMethodName = [
  'Tiền mặt',
  'COD',
  'VN Pay',
];

const List<String> kOrderPaymentStatus = [
  'pending',
  'paid',
  'cancelled',
];
const List<String> kOrderPaymentStatusName = [
  'Chờ thanh toán',
  'Đã thanh toán',
  'Thanh toán thất bại',
];
