import 'package:get/get.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/core/utils/map_util.dart';
import 'package:hk_mobile/core/utils/str_util.dart';
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

  RxBool isLoadingList = false.obs;
  RxBool hasFetch = false.obs;
  RxString errorMgList = ''.obs;
  RxList<OrderDto> list = <OrderDto>[].obs;

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

  Future<void> createAsync(Function(String) onSuccess) async {
    isLoading(true);
    isLoading(true);

    final _data = <String, dynamic>{};
    _data['items'] = items.map((e) => e.toJsonMin()).toList();
    _data['address'] = address.value;
    _data['customerInfo'] = <String, dynamic>{
      'name': customerName.value,
      'phone': customerPhone.value,
    };
    _data['paymentMethod'] = paymentMethod.value;
    _data['receiveMethod'] = receiveMethod.value;
    _data['isReceiveAtStore'] = isReceiveAtStore.value;
    _data['clientUrl'] = 'https://mern-ecommerce-b848d.web.app';

    try {
      var response = await DioUtil.postAsync('orders', data: _data);
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        var data = response.data;
        String paymentUrl = MapUtil.getString(data, 'paymentUrl');
        String id = MapUtil.getString(data["data"], '_id');
        setViewOrderId(id);
        errorMgs('');
        await cartController.removeLstItemsAsync(items.value);
        onSuccess(paymentUrl);
      }
    } catch (e) {
      errorMgs(e.toString());
    }
    isLoading(false);
  }

  void createOrder(Function(String) onSuccess) {
    isLoading(true);

    final _data = <String, dynamic>{};
    _data['items'] = items.map((e) => e.toJsonMin()).toList();
    _data['address'] = address.value;
    _data['customerInfo'] = <String, dynamic>{
      'name': customerName.value,
      'phone': customerPhone.value,
    };
    _data['paymentMethod'] = paymentMethod.value;
    _data['receiveMethod'] = receiveMethod.value;
    _data['isReceiveAtStore'] = isReceiveAtStore.value;
    _data['clientUrl'] = 'https://mern-ecommerce-b848d.web.app';

    DioUtil.post(
      'orders',
      data: _data,
      onSuccess: (data) {
        String paymentUrl = MapUtil.getString(data, 'paymentUrl');
        String id = MapUtil.getString(data["data"], '_id');
        setViewOrderId(id);
        errorMgs('');
        onSuccess(paymentUrl);
      },
      onError: (e) {
        errorMgs(e.toString());
      },
      onFinally: () {
        isLoading(false);
      },
    );
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

  void reloadOrder() {
    setViewOrderId(viewOrderId.value);
  }

  Future<void> repayAsync(Function(String paymentUrl) onSuccess) async {
    try {
      var response = await DioUtil.getAsync('orders/re-pay/${viewOrderId.value}');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        String paymentUrl = MapUtil.getString(response.data, 'data');
        onSuccess(paymentUrl);
      }
    } catch (e) {}
  }

  Future<void> fetchListAsync() async {
    hasFetch(true);
    isLoadingList(true);
    try {
      var response = await DioUtil.getAsync('orders');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        list.clear();
        var data = response.data;
        if (data != null && data.runtimeType != String) {
          var result = data["data"].map((e) => OrderDto(e as Map<String, dynamic>)).toList();
          list.value = result.cast<OrderDto>();
        }
      }
      list.refresh();
      errorMgList('');
    } catch (e) {
      errorMgList(e.toString());
    }
    isLoadingList(false);
  }
}
