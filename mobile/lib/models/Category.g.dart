// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Category.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Category _$CategoryFromJson(Map<String, dynamic> json) {
  $checkKeys(
    json,
    requiredKeys: const ['_id', 'slug'],
  );
  return Category(
    json['_id'] as String,
    json['slug'] as String,
    json['name'] as String,
    json['image'] as String,
    (json['children'] as List<dynamic>)
        .map((e) => Category.fromJson(e as Map<String, dynamic>))
        .toList(),
  );
}

Map<String, dynamic> _$CategoryToJson(Category instance) => <String, dynamic>{
      '_id': instance.id,
      'slug': instance.slug,
      'name': instance.name,
      'image': instance.image,
      'children': instance.children,
    };
