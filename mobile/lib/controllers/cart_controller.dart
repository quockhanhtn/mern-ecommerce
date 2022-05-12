import 'package:get/get.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/dto/product_dto.dart';

class CartController extends GetxController {
  var list = <CartDto>[].obs;
  var subTotal = 0.0.obs;

  @override
  void onInit() {
    super.onInit();

    // todo
  }

  void add(ProductDto dto) {
    var findIndex = list.indexWhere((cart) => cart.product.id == dto.id);
    if (findIndex < 0) {
      list.add(CartDto(product: dto, numOfItem: 1));
    } else {
      list[findIndex].numOfItem++;
    }

    calculate();
    list.refresh();
  }

  void removeItem(int index) {
    if (index >= 0) {
      list.removeAt(index);
      calculate();
      list.refresh();
    }
  }

  void calculate() {
    double price = 0;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      price += item.numOfItem * item.product.variants[0].price;
    }
    subTotal(price);
  }
}
