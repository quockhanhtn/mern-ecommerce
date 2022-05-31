import 'package:get/get.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';

class OrderController extends GetxController {
  final CartController cartController = Get.put(CartController());
  final AccountController accountController = Get.put(AccountController());

  RxList<CartDto> items = <CartDto>[].obs;
  RxMap address = <String, dynamic>{}.obs;
  RxString customerName = ''.obs;
  RxString customerPhone = ''.obs;
  RxString paymentMethod = ''.obs;
  RxString receiveMethod = ''.obs;
  RxBool isReceiveAtStore = false.obs;

  RxBool isLoading = false.obs;
  RxString errorMgs = ''.obs;

  void updateSelectedItem() {
    items.value = cartController.list.where((e) => e.isSelected).toList();
    items.refresh();
  }

  void setSelectedAddress(String id) {
    int index = accountController.lstAdd.indexWhere((element) => element.id == id);
    if (index < 0) {
      errorMgs('Vui lòng chọn địa chỉ');
    } else {
      address.value = accountController.lstAdd[index].toJson();
      customerName(accountController.lstAdd[index].name);
      customerPhone(accountController.lstAdd[index].phone);
    }
  }

  void createOrder() {
    isLoading(true);

    final _data = <String, dynamic>{};
    _data['items'] = items.map((e) => e.toJsonMin()).toList();
    _data['address'] = address;
    _data['customerInfo'] = <String, dynamic>{
      'name': customerName,
      'phone': customerPhone,
    };
    _data['paymentMethod'] = paymentMethod.value;
    _data['receiveMethod'] = receiveMethod.value;
    _data['isReceiveAtStore'] = isReceiveAtStore.value;

    DioUtil.post('', data: _data, onSuccess: (data) {
      var result = data["data"];
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }
}
