import 'package:mobile/dto/category_dto.dart';
import 'package:mobile/services/category_service.dart';

class CategoryRepository {
  CategoryService service = CategoryService();

  Future<List<CategoryDto>> getAll() => service.getAll();
}
