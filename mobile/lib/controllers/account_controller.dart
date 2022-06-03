// ignore_for_file: empty_catches

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
      var result = data["data"].map((e) => AddressDto(e as Map<String, dynamic>)).toList();
      lstAdd.value = result.cast<AddressDto>();
      lstAdd.refresh();
      errorMgsAdd('');
    }, onError: (e) {
      errorMgsAdd(e.toString());
    }, onFinally: () {
      isLoadingAdd(false);
    });
  }

  Future<void> fetchAddressAsync() async {
    isLoadingAdd(true);
    try {
      var response = await DioUtil.getAsync('account/addresses');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        var data = response.data;
        var result = data["data"].map((e) => AddressDto(e as Map<String, dynamic>)).toList();
        lstAdd.value = result.cast<AddressDto>();
        lstAdd.refresh();
        errorMgsAdd('');
      }
    } catch (e) {}
    isLoadingAdd(false);
  }

  Future<void> setDefaultAddressAsync(String addressId, Function(String) onSuccess) async {
    isUpdateAdd(true);
    try {
      var response = await DioUtil.patchAsync('account/addresses/setDefault/$addressId');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        await fetchAddressAsync();
        onSuccess('Đặt địa chỉ làm mặc định thành công !');
      }
    } catch (e) {}
    isUpdateAdd(false);
  }

  void _addNew(AddressDto addressDto, Function() onSuccess, Function(String) onError) {
    DioUtil.post(
      'account/addresses',
      data: addressDto.toJson(),
      onSuccess: (data) {
        if (data["success"]) {
          fetchAddress();
          onSuccess();
        }
      },
      onError: (e) {
        onError(e.toString());
      },
    );
  }

  Future<void> addAddressAsync(AddressDto addressDto, Function() onSuccess, Function(String) onError) async {
    isLoadingAdd(true);
    try {
      var response = await DioUtil.postAsync('account/addresses', data: addressDto.toJson());
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        await fetchAddressAsync();
        onSuccess();
      } else {
        onError("Thêm thất bại");
      }
    } catch (e) {
      onError(e.toString());
    }
    isLoadingAdd(false);
  }

  Future<void> deleteAddAsync(
    String addressId,
    Function() onSuccess,
    Function(String) onError,
  ) async {
    try {
      var response = await DioUtil.deleteAsync('account/addresses/$addressId');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        await fetchAddressAsync();
        onSuccess();
      } else {
        onError("Xóa thất bại");
      }
    } catch (e) {
      onError(e.toString());
    }
  }
}
