import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/dto/generic_dto.dart';

class BrandDto extends GenericDto {
  BrandDto(Map<String, dynamic> json) : super(json) {
    id = MapUtil.getString(json, '_id');
    slug = MapUtil.getString(json, 'slug');
    name = MapUtil.getString(json, 'name');
    image = MapUtil.getString(json, 'image');
    headQuarters = MapUtil.getString(json, 'headQuarters');
    country = MapUtil.getString(json, 'country');
    founded = MapUtil.getInt(json, 'founded');
  }

  late String id;
  late String slug;
  late String name;
  late String image;
  late String headQuarters;
  late String country;
  late int founded;

  @override
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
