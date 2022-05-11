import 'package:hk_mobile/dto/discount_dto.dart';
import 'package:hk_mobile/services/discount_service.dart';

class DiscountRepository {
  DiscountService service = DiscountService();

  Future<List<DiscountDto>> getAll() => service.getAll();
}
