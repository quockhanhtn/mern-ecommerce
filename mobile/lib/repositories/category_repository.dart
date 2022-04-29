import 'package:hk_mobile/dto/category_dto.dart';
import 'package:hk_mobile/services/category_service.dart';

class CategoryRepository {
  CategoryService service = CategoryService();

  Future<List<CategoryDto>> getAll() => service.getAll();
}
