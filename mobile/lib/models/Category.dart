// ignore_for_file: file_names

import 'package:json_annotation/json_annotation.dart';

part 'Category.g.dart';

@JsonSerializable()
class Category {
  Category(this.id, this.slug, this.name, this.image, this.children);

  @JsonKey(name: '_id', required: true)
  final String id;

  @JsonKey(name: 'slug', required: true)
  final String slug;

  @JsonKey(name: 'name', required: false)
  final String name;

  @JsonKey(name: 'image', required: false)
  final String image;

  @JsonKey(name: 'children', required: false, includeIfNull: false)
  final List<Category> children;

  factory Category.fromJson(Map<String, dynamic> json) =>
      _$CategoryFromJson(json);

  Map<String, dynamic> toJson() => _$CategoryToJson(this);
}
