import 'package:hk_mobile/dto/brand_dto.dart';
import 'package:hk_mobile/dto/category_dto.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class ProductVariantDto extends GenericDto {
  ProductVariantDto(
    this.sku,
    this.slug,
    this.variantName,
    this.price,
    this.marketPrice,
    this.quantity,
    this.sold,
    this.thumbnail,
    this.pictures,
  );

  String sku;
  String slug;
  String variantName;
  double price;
  double marketPrice;
  int quantity;
  int? sold;
  String? thumbnail;
  List<String>? pictures;

  factory ProductVariantDto.fromJson(Map<String, dynamic> json) {
    return ProductVariantDto(
      json['sku'] as String,
      (json['slug'] as String?) ?? '',
      (json['variantName'] as String?) ?? '',
      json['price'].toDouble(),
      json['marketPrice'].toDouble(),
      (json['quantity'] as int?) ?? 0,
      json['sold'] as int?,
      json['thumbnail'] as String?,
      List<String>.from(json['pictures'] ?? List<String>.empty()),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'sku': sku,
        'slug': slug,
        'variantName': variantName,
        'price': price,
        'marketPrice': marketPrice,
        'quantity': quantity,
        'sold': sold,
        'thumbnail': thumbnail,
        'pictures': pictures,
      };
}

class ProductDto extends GenericDto {
  ProductDto(
    this.id,
    this.name,
    this.slug,
    this.desc,
    this.video,
    this.tags,
    this.warrantyPeriod,
    this.origin,
    this.category,
    this.brand,
    this.views,
    // this.rates,
    this.policies,
    this.hightLightPics,
    this.variants,
    this.isHide,
    this.isOutOfStock,
  );

  String id;
  String name;
  String? slug;
  String? desc;
  String? video;
  List<Object>? tags;
  int? warrantyPeriod;
  String? origin;
  CategoryDto? category;
  BrandDto? brand;
  int? views;
  // List<Object>? rates;
  List<Object>? policies;
  List<Object>? hightLightPics;
  List<ProductVariantDto> variants;
  bool isHide;
  bool isOutOfStock;

  factory ProductDto.fromJson(Map<String, dynamic> json) {
    return ProductDto(
      json['_id'] as String,
      json['name'] as String,
      (json['slug'] as String?) ?? '',
      json['desc'] as String?,
      json['video'] as String?,
      List<String>.from(json['tags'] ?? List<String>.empty()),
      json['warrantyPeriod'] as int?,
      json['origin'] as String?,
      json['category'] != null ? CategoryDto.fromJson(json['category']) : null,
      json['brand'] != null ? BrandDto.fromJson(json['brand']) : null,
      json['views'] as int?,
      //json['rates'] as List<Object>?,
      List<String>.from(json['policies'] ?? List<String>.empty()),
      List<String>.from(json['hightLightPics'] ?? List<String>.empty()),
      json['variants']
          .map((e) => ProductVariantDto.fromJson(e as Map<String, dynamic>))
          .toList()
          .cast<ProductVariantDto>(),
      json['isHide'] ?? false,
      json['isOutOfStock'] ?? false,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        '_id': id,
        'name': slug,
        'slug': name,
        'desc': desc,
        'video': video,
        'tags': tags,
        'warrantyPeriod': warrantyPeriod,
        'origin': origin,
        'category': category,
        'brand': brand,
        'views': views,
        // 'rates': rates,
        'policies': policies,
        'hightLightPics': hightLightPics,
        'variants': variants,
        'isHide': isHide,
        'isOutOfStock': isOutOfStock
      };
}
