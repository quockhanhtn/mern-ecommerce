import 'package:get/get.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/dto/order_dto.dart';

class OrderController extends GetxController {
  final CartController cartController = Get.put(CartController());
  final AccountController accountController = Get.put(AccountController());

  RxList<CartDto> items = <CartDto>[].obs;
  RxMap address = <String, dynamic>{}.obs;
  RxString selectedAddressId = ''.obs;
  RxString customerName = ''.obs;
  RxString customerPhone = ''.obs;
  RxString paymentMethod = ''.obs;
  RxString receiveMethod = ''.obs;
  RxBool isReceiveAtStore = false.obs;

  RxBool isLoading = false.obs;
  RxString errorMgs = ''.obs;

  RxString viewOrderId = ''.obs;
  RxBool isLoadingViewOrder = false.obs;
  RxString errorMgsViewOrder = ''.obs;
  RxList<OrderDto> viewOrder = <OrderDto>[].obs; // use first

  void updateSelectedItem() {
    items.value = cartController.list.where((e) => e.isSelected).toList();
    items.refresh();
  }

  void setSelectedAddress(String id) {
    if (id.isEmpty) {
      var address = accountController.lstAdd.firstWhereOrNull((element) => element.isDefault);
      if (address != null) {
        id = address.id;
      } else {
        return;
      }
    }

    int index = accountController.lstAdd.indexWhere((element) => element.id == id);
    if (index < 0) {
      errorMgs('Vui lòng chọn địa chỉ');
    } else {
      selectedAddressId(id);
      selectedAddressId.refresh();
      address.value = accountController.lstAdd[index].toJson();
      customerName(accountController.lstAdd[index].name);
      customerPhone(accountController.lstAdd[index].phone);
    }
  }

  void setPaymentMethod(String med) {
    paymentMethod(med);
    paymentMethod.refresh();
  }

  void setReceiveMethod(String med) {
    receiveMethod(med);
    receiveMethod.refresh();
  }

  void setIsReceiveAtStore(bool v) {
    isReceiveAtStore(v);
    isReceiveAtStore.refresh();
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

  void setViewOrderId(id) {
    viewOrderId(id);
    isLoadingViewOrder(true);
    DioUtil.get(
      'orders/$id',
      onSuccess: (data) {
        if (data["success"]) {
          OrderDto rs = OrderDto(data["data"] as Map<String, dynamic>);
          viewOrder.clear();
          viewOrder.add(rs);
          viewOrder.refresh();
          errorMgsViewOrder('');
        }
      },
      onError: (e) => errorMgsViewOrder(e.toString()),
      onFinally: () => isLoadingViewOrder(false),
    );
  }
}
