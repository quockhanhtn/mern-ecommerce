import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/discount_dto.dart';

class DiscountController extends GetxController {
  final list = <DiscountDto>[].obs;
  final isLoading = true.obs;
  final errorMgs = ''.obs;

  @override
  void onInit() {
    fetchDiscounts();
    super.onInit();
  }

  void fetchDiscounts() {
    isLoading(true);
    DioUtil.get('discounts', onSuccess: (data) {
      var result = data["data"]
          .map((e) => DiscountDto.fromJson(e as Map<String, dynamic>))
          .toList();
      list.value = result.cast<DiscountDto>();
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }
}
