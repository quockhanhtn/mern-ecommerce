import 'package:hk_mobile/dto/generic_dto.dart';

class BrandDto extends GenericDto {
  BrandDto(this.id, this.slug, this.name, this.image,
      this.headQuarters, this.country, this.founded);

  final String id;
  final String slug;
  final String name;
  final String? image;
  final String? headQuarters;
  final String? country;
  final int? founded;

  factory BrandDto.fromJson(Map<String, dynamic> json) {
    return BrandDto(
      json['_id'] as String,
      json['slug'] as String,
      json['name'] as String,
      json['image'] as String?,
      json['headQuarters'] as String?,
      json['country'] as String?,
      json['founded'] as int?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
    '_id': id,
    'slug': slug,
    'name': name,
    'image': image,
    'headQuarters': headQuarters,
    'country': country,
    'founded': founded,
  };
}
