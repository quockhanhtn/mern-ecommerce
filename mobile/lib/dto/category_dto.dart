import 'package:hk_mobile/dto/generic_dto.dart';

class CategoryDto extends GenericDto {
  CategoryDto(
    this.id,
    this.slug,
    this.name,
    this.image,
    this.coverImage,
    this.countProduct,
    this.children,
  );

  final String id;
  final String slug;
  final String name;
  final String? image;
  final String? coverImage;
  final int? countProduct;
  final List<CategoryDto> children;

  factory CategoryDto.fromJson(Map<String, dynamic> json) {
    List<dynamic> children = [];
    if (json['children'] != null) {
      children = json['children'] as List<dynamic>;
    }

    return CategoryDto(
      json['_id'] as String,
      json['slug'] as String,
      json['name'] as String,
      json['image'] as String?,
      json['coverImage'] as String?,
      json['countProduct'] as int?,
      children.map((e) => CategoryDto.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        '_id': id,
        'slug': slug,
        'name': name,
        'image': image,
        'coverImage': image,
        'countProduct': countProduct,
        'children': children,
      };
}
