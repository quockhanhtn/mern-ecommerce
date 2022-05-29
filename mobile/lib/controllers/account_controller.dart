import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/address_dto.dart';

class AccountController extends GetxController {
  final lstAdd = <AddressDto>[].obs;
  final isLoadingAdd = true.obs;
  final isUpdateAdd = true.obs;
  final errorMgsAdd = ''.obs;

  void authenticatedChange(bool isAuth) {
    if (isAuth) {
      fetchAddress();
    } else {
      // clear data
      lstAdd.clear();
      lstAdd.refresh();
    }
  }

  void fetchAddress() {
    isLoadingAdd(true);
    DioUtil.get('account/addresses', onSuccess: (data) {
      var result = data["data"].map((e) => AddressDto.fromJson(e as Map<String, dynamic>)).toList();
      lstAdd.value = result.cast<AddressDto>();
      lstAdd.refresh();
      errorMgsAdd('');
    }, onError: (e) {
      errorMgsAdd(e.toString());
    }, onFinally: () {
      isLoadingAdd(false);
    });
  }

  void setDefaultAddress(String addressId, Function(String) onSuccess) {
    isUpdateAdd(true);
    DioUtil.patch('account/addresses/setDefault/$addressId', onSuccess: (data) {
      if (data["success"]) {
        onSuccess('Đặt địa chỉ làm mặc định thành công');
        fetchAddress();
      }
    }, onError: (e) {
      errorMgsAdd(e.toString());
    }, onFinally: () {
      isUpdateAdd(false);
    });
  }
}
