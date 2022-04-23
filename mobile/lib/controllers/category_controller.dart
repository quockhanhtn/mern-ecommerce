import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/category_dto.dart';

class CategoryController extends GetxController {
  final list = <CategoryDto>[].obs;
  final isLoading = true.obs;
  final errorMgs = ''.obs;

  @override
  void onInit() {
    fetchCategories();
    super.onInit();
  }

  void fetchCategories() {
    isLoading(true);
    // list.value = await CategoryRepository().getAll();
    // isLoading(false);
    DioUtil.get('categories', onSuccess: (data) {
      var result = data["data"]
          .map((e) => CategoryDto.fromJson(e as Map<String, dynamic>))
          .toList();
      list.value = result.cast<CategoryDto>();
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }
}
