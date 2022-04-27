import 'package:hk_mobile/dto/generic_dto.dart';

class ProductVariantDto extends GenericDto {
  ProductVariantDto(this.sku, this.slug, this.variantName, this.price,
      this.marketPrice, this.quantity, this.sold, this.thumbnail, this.pictures);

  final String sku;
  final String slug;
  final String variantName;
  final double price;
  final double marketPrice;
  final int quantity;
  final int? sold;
  final String? thumbnail;
  final List<String>? pictures;

  factory ProductVariantDto.fromJson(Map<String, dynamic> json) {
    return ProductVariantDto(
      json['sku'] as String,
      json['slug'] as String,
      json['variantName'] as String,
      json['price'] as double,
      json['marketPrice'] as double,
      json['quantity'] as int,
      json['sold'] as int?,
      json['thumbnail'] as String?,
      json['pictures'] as List<String>?,
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
