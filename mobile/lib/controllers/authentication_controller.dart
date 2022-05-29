import 'package:get/get.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/core/utils/preference_util.dart';
import 'package:hk_mobile/dto/user_dto.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthenticationController extends GetxController {
  final list = <UserDto>[].obs;
  final isLoading = true.obs;
  final errorMgs = ''.obs;
  final isAuthenticated = false.obs;

  final AccountController accountController = Get.put(AccountController());

  @override
  void onInit() {
    checkAuthentication();
    super.onInit();
  }

  void checkAuthentication() async {
    isLoading(true);

    String accessToken = PreferenceUtil.getString('accessToken', defValue: '');
    if (accessToken.isNotEmpty && !JwtDecoder.isExpired(accessToken)) {
      DioUtil.setHeader('authorization', 'Bearer $accessToken');
      var res = await DioUtil.getAsync('account');
      if (res.data['success'] as bool) {
        list.clear();
        list.value = [UserDto.fromJson(res.data['data'])];
        isAuthenticated(true);
      } else {
        isAuthenticated(false);
      }
    } else {
      isAuthenticated(false);
    }

    isLoading(false);
    accountController.authenticatedChange(isAuthenticated.value);
  }

  Future<void> login(String username, String password) async {
    isLoading(true);

    try {
      var response = await DioUtil.postAsync('/auth/login', data: {'username': username, 'password': password});
      if (response.data['success'] as bool) {
        var userDto = UserDto.fromJson(response.data['data']['user']);
        list.clear();
        list.value = [userDto];
        isAuthenticated(true);
        await PreferenceUtil.setString('accessToken', response.data['data']['token']);
      }
    } catch (e) {
      errorMgs(e.toString());
    }

    isLoading(false);
    accountController.authenticatedChange(isAuthenticated.value);
  }

  Future<void> logout() async {
    isLoading(true);
    isAuthenticated(false);
    await PreferenceUtil.setString('accessToken', '');
    isLoading(false);
    accountController.authenticatedChange(false);
  }
}
