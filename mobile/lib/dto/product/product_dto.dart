import 'package:hk_mobile/dto/brand_dto.dart';
import 'package:hk_mobile/dto/category_dto.dart';
import 'package:hk_mobile/dto/generic_dto.dart';
import 'package:hk_mobile/dto/product/product_variant_dto.dart';

class ProductDto extends GenericDto {
  ProductDto(this.id, this.name, this.slug, this.desc, this.video,
      this.tags, this.warrantyPeriod, this.origin, this.category,
      this.brand, this.views, this.rates, this.policies, this.hightLightPics,
      this.variants, this.isHide, this.isOutOfStock, this.crawlKey);

  final String id;
  final String name;
  final String? slug;
  final String? desc;
  final String? video;
  final List<Object>? tags;
  final int? warrantyPeriod;
  final String? origin;
  final CategoryDto? category;
  final BrandDto? brand;
  final int? views;
  final List<Object>? rates;
  final List<Object>? policies;
  final List<Object>? hightLightPics;
  final List<ProductVariantDto> variants;
  final bool isHide;
  final bool isOutOfStock;
  final String? crawlKey;

  factory ProductDto.fromJson(Map<String, dynamic> json) {
    return ProductDto(
      json['_id'] as String,
      json['name'] as String,
      json['slug'] as String,
      json['desc'] as String?,
      json['video'] as String?,
      json['tags'] as List<Object>?,
      json['warrantyPeriod'] as int?,
      json['origin'] as String,
      json['category'] as CategoryDto,
      json['brand'] as BrandDto,
      json['views'] as int?,
      json['rates'] as List<Object>?,
      json['policies'] as List<Object>?,
      json['hightLightPics'] as List<Object>?,
      json['variants'] as List<ProductVariantDto>,
      json['isHide'] as bool,
      json['isOutOfStock'] as bool,
      json['crawlKey'] as String?,
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
    'rates': rates,
    'policies': policies,
    'hightLightPics': hightLightPics,
    'variants': variants,
    'isHide': isHide,
    'isOutOfStock': isOutOfStock,
    'crawlKey': crawlKey,
  };
}
