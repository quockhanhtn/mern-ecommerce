import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class CartDto extends GenericDto {
  late String productId;
  late String name;
  late String sku;
  late int qty;
  late String variantName;
  late double price;
  late double marketPrice;
  late int quantity;
  late int sold;
  late String thumbnail;
  bool isSelected;

  CartDto(Map<String, dynamic> json, {this.isSelected = true}) : super(json) {
    productId = MapUtil.getString(json, 'productId');
    name = MapUtil.getString(json, 'name');
    sku = MapUtil.getString(json, 'sku');
    qty = MapUtil.getInt(json, 'qty');
    variantName = MapUtil.getString(json, 'variantName');
    price = MapUtil.getDouble(json, 'price');
    marketPrice = MapUtil.getDouble(json, 'marketPrice');
    quantity = MapUtil.getInt(json, 'quantity');
    sold = MapUtil.getInt(json, 'sold');
    thumbnail = json['thumbnail'] as String;
  }

  @override
  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['productId'] = productId;
    _data['name'] = name;
    _data['sku'] = sku;
    _data['qty'] = qty;
    _data['variantName'] = variantName;
    _data['price'] = price;
    _data['marketPrice'] = marketPrice;
    _data['quantity'] = quantity;
    _data['sold'] = sold;
    _data['thumbnail'] = thumbnail;
    return _data;
  }

  Map<String, dynamic> toJsonMin() {
    final _data = <String, dynamic>{};
    _data['productId'] = productId;
    _data['sku'] = sku;
    _data['qty'] = qty;
    return _data;
  }

  static Map<String, String> jsonForAdd(String pid, String sku, int qty) {
    final _data = <String, String>{};
    _data['productId'] = pid;
    _data['sku'] = sku;
    _data['qty'] = qty.toString();
    return _data;
  }
}
