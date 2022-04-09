class CategoryDto {
  CategoryDto(this.id, this.slug, this.name, this.image, this.children);

  final String id;
  final String slug;
  final String name;
  final String? image;
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
      children
          .map((e) => CategoryDto.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        '_id': id,
        'slug': slug,
        'name': name,
        'image': image,
        'children': children,
      };
}
