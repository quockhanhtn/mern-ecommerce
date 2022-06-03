import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/dto/address_dto.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class OrderDto extends GenericDto {
  late String id;
  late int numericId;

  late UserDto? user;
  late CustomerDto? customer;
  late AddressDto? address;

  late String status;
  late String paymentMethod;
  late String paymentStatus;
  late bool isReceiveAtStore;

  late List<CartDto> items;
  late double subTotal;
  late double shippingFee;
  late double discount;
  late double total;
  late String createdAt;
  late String updatedAt;

  OrderDto(Map<String, dynamic> json) : super(json) {
    id = MapUtil.getString(json, '_id');
    numericId = MapUtil.getInt(json, 'numericId');

    user = json['user'] != null ? UserDto(json['user']) : null;
    customer = json['customer'] != null ? CustomerDto(json['customer']) : null;
    address = json['address'] != null ? AddressDto(json['address']) : null;

    status = MapUtil.getString(json, 'status');
    paymentMethod = MapUtil.getString(json, 'paymentMethod');
    paymentStatus = MapUtil.getString(json, 'paymentStatus');
    isReceiveAtStore = MapUtil.getBool(json, 'isReceiveAtStore');

    items = <CartDto>[];
    if (json['items'] != null) {
      json['items'].forEach((v) {
        items.add(CartDto.fromOrder(v as Map<String, dynamic>));
      });
    }

    subTotal = MapUtil.getDouble(json, 'subTotal');
    shippingFee = MapUtil.getDouble(json, 'shippingFee');
    discount = MapUtil.getDouble(json, 'discount');
    total = MapUtil.getDouble(json, 'total');

    createdAt = MapUtil.getString(json, 'createdAt');
    updatedAt = MapUtil.getString(json, 'updatedAt');
  }

  String get getCustomerName {
    if (customer != null) {
      return customer!.name;
    }
    if (user != null) {
      return user!.id;
    }
    return '<Chưa cung cấp>';
  }

  String get getCustomerPhone {
    if (customer != null) {
      return customer!.phone;
    }
    if (user != null) {
      return user!.id;
    }
    return '<Chưa cung cấp>';
  }

  @override
  Map<String, dynamic> toJson() {
    return <String, dynamic>{};
  }
}

class UserDto extends GenericDto {
  late String id;

  UserDto(Map<String, dynamic> json) : super(json) {
    id = MapUtil.getString(json, '_id');
  }

  @override
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = id;
    return data;
  }
}

class CustomerDto extends GenericDto {
  late String name;
  late String phone;

  CustomerDto(Map<String, dynamic> json) : super(json) {
    name = MapUtil.getString(json, 'name');
    phone = MapUtil.getString(json, 'phone');
  }

  @override
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['name'] = name;
    data['phone'] = phone;
    return data;
  }
}
