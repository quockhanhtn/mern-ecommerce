import 'package:hk_mobile/dto/generic_dto.dart';

class DiscountDto extends GenericDto {
  DiscountDto(
    this.id,
    this.slug,
    this.name,
    this.desc,
    this.code,
    // this.fromDate,
    // this.endDate,
    this.quantity,
    this.discount,
    this.image,
  );

  final String id;
  final String slug;
  final String name;
  final String? desc;
  final String code;
  // final DateTime fromDate;
  // final DateTime endDate;
  final int? quantity;
  final int? discount;
  final String? image;


  factory DiscountDto.fromJson(Map<String, dynamic> json) {
    return DiscountDto(
      json['_id'] as String,
      json['slug'] as String,
      json['name'] as String,
      json['desc'] as String?,
      json['code'] as String,
      // json['fromDate'] as DateTime,
      // json['endDate'] as DateTime,
      json['quantity'] as int?,
      json['discount'] as int?,
      json['image'] as String?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
    '_id': id,
    'slug': slug,
    'name': name,
    'desc': desc,
    'code': code,
    // 'fromDate': fromDate,
    // 'endDate': endDate,
    'quantity': quantity,
    'discount': discount,
    'image': image,
  };
}
