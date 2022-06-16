import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:hk_mobile/controllers/account_controller.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
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
  final CartController cartController = Get.put(CartController());

  @override
  void onInit() {
    checkAuthentication();
    super.onInit();
  }

  void _notifyAuthStatusChange() {
    accountController.authenticatedChange(isAuthenticated.value);
    cartController.authenticatedChange(isAuthenticated.value);
  }

  void checkAuthentication() async {
    isLoading(true);

    String accessToken = PreferenceUtil.getString('accessToken', defValue: '');
    if (accessToken.isNotEmpty && !JwtDecoder.isExpired(accessToken)) {
      DioUtil.setHeader('authorization', 'Bearer $accessToken');
      var res = await DioUtil.getAsync('account');
      if (res.data['success'] as bool) {
        list.clear();
        list.value = [UserDto(res.data['data'])];
        isAuthenticated(true);
      } else {
        isAuthenticated(false);
      }
    } else {
      isAuthenticated(false);
    }

    isLoading(false);
    _notifyAuthStatusChange();
  }

  Future<void> login(
    String username,
    String password,
    Function() onSuccess,
    Function(String) onError,
  ) async {
    isLoading(true);

    try {
      var response = await DioUtil.postAsync('/auth/login', data: {'username': username, 'password': password});
      if (response.data['success'] as bool) {
        var userDto = UserDto(response.data['data']['user']);
        list.clear();
        list.value = [userDto];
        isAuthenticated(true);
        String accessToken = response.data['data']['token'];
        await PreferenceUtil.setString('accessToken', accessToken);
        DioUtil.setHeader('authorization', 'Bearer $accessToken');
        onSuccess();
      }
    } catch (e) {
      onError(e.toString());
      errorMgs(e.toString());
    }

    isLoading(false);
    _notifyAuthStatusChange();
  }

  Future<void> logout() async {
    isLoading(true);
    isAuthenticated(false);
    await PreferenceUtil.setString('accessToken', '');
    isLoading(false);
    _notifyAuthStatusChange();
  }

  Future<void> signInWithGoogle(Function() onSuccess, Function(String) onError) async {
    final GoogleSignIn googleSignIn = GoogleSignIn();

    try {
      if (!kIsWeb) {
        await googleSignIn.signOut();
      }
      await FirebaseAuth.instance.signOut();
    } catch (e) {}

    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth = await googleUser?.authentication;

    String clientId = '';
    if (Platform.isAndroid) {
      clientId = '121156975071-raj6o7il1j65r8nq4u6t9rc3fk0fvfik.apps.googleusercontent.com';
    } else if (Platform.isIOS) {
      clientId = '121156975071-ai3jl21e4kh4slobk5upp9j8e08tof57.apps.googleusercontent.com';
    }

    final postData = <String, dynamic>{};
    postData['googleCredential'] = googleAuth?.idToken;
    postData['clientId'] = clientId;

    try {
      var response = await DioUtil.postAsync('/auth/google', data: postData);
      var data = response.data;
      if (data['success'] as bool) {
        var userDto = UserDto(data['data']['user']);
        list.clear();
        list.value = [userDto];
        isAuthenticated(true);
        String accessToken = data['data']['token'];
        await PreferenceUtil.setString('accessToken', accessToken);
        DioUtil.setHeader('authorization', 'Bearer $accessToken');
        _notifyAuthStatusChange();
        onSuccess();
      } else {
        onError('Đăng nhập bằng google thất bại');
      }
    } catch (e) {
      onError(e.toString());
    }
  }
}
