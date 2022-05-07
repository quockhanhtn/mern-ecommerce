import 'package:hk_mobile/dto/product_dto.dart';

class CartDto {
  ProductDto product;
  int numOfItem;

  CartDto({required this.product, required this.numOfItem});
}

// Demo data for our cart

// List<Cart> demoCarts = [
//   Cart(product: demoProducts[0], numOfItem: 2),
//   Cart(product: demoProducts[1], numOfItem: 1),
//   Cart(product: demoProducts[3], numOfItem: 1),
// ];
