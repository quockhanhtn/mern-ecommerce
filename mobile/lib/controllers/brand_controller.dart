import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/brand_dto.dart';

class BrandController extends GetxController {
  final list = <BrandDto>[].obs;
  final isLoading = true.obs;
  final errorMgs = ''.obs;

  @override
  void onInit() {
    fetchBrands();
    super.onInit();
  }

  void fetchBrands() {
    isLoading(true);
    DioUtil.get('brands', onSuccess: (data) {
      var result = data["data"]
          .map((e) => BrandDto.fromJson(e as Map<String, dynamic>))
          .toList();
      list.value = result.cast<BrandDto>();
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }
}
