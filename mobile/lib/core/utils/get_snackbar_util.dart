import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';

class GetSnackbarUtil {
  static void showSuccess(
    String mgs, {
    String title = 'Thành công',
    int duration = 3,
  }) {
    Get.snackbar(
      title,
      mgs,
      icon: const Icon(Icons.check, color: AppTheme.colorSuccess),
      //colorText: AppTheme.colorSuccess,
      duration: Duration(seconds: duration),
      snackPosition: SnackPosition.BOTTOM,
      backgroundColor: Colors.white,
    );
  }
}
