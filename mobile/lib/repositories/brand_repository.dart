import 'package:hk_mobile/dto/brand_dto.dart';
import 'package:hk_mobile/services/brand_service.dart';

class BrandRepository {
  BrandService service = BrandService();

  Future<List<BrandDto>> getAll() => service.getAll();
}
