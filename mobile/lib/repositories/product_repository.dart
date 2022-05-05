import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/services/product_service.dart';

class ProductRepository {
  ProductService service = ProductService();

  Future<List<ProductDto>> getAll() => service.getAll();
}
