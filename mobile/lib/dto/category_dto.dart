import 'package:hk_mobile/dto/generic_dto.dart';

class CategoryDto extends GenericDto {
  CategoryDto(Map<String, dynamic> json) : super(json) {
    List<dynamic> childrenJson = [];
    if (json['children'] != null) {
      childrenJson = json['children'] as List<dynamic>;
    }

    id = json['_id'] as String;
    slug = json['slug'] as String;
    name = json['name'] as String;
    image = json['image'] as String?;
    coverImage = json['coverImage'] as String?;
    countProduct = json['countProduct'] as int?;
    children = childrenJson.map((e) => CategoryDto(e as Map<String, dynamic>)).toList();
  }

  late String id;
  late String slug;
  late String name;
  late String? image;
  late String? coverImage;
  late int? countProduct;
  late List<CategoryDto> children;

  @override
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
