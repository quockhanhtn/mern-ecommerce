import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';

class GetXUtil {
  static void showSnackBarSuccess(
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

  static void showSnackbarError(
    String mgs, {
    String title = 'Xảy ra lỗi',
    int duration = 3,
  }) {
    Get.snackbar(
      title,
      mgs,
      icon: const Icon(Icons.error, color: AppTheme.colorError),
      //colorText: AppTheme.colorSuccess,
      duration: Duration(seconds: duration),
      snackPosition: SnackPosition.BOTTOM,
      backgroundColor: Colors.white,
    );
  }

  static showOverlay<T>({
    required Future<T> Function() asyncFunction,
    Color opacityColor = Colors.white,
    Widget? loadingWidget,
    double opacity = 0.5,
  }) {
    Get.showOverlay(
      asyncFunction: asyncFunction,
      opacityColor: opacityColor,
      loadingWidget: const Center(
        child: GFLoader(
          type: GFLoaderType.ios,
          size: GFSize.LARGE * 2,
        ),
      ),
      opacity: opacity,
    );
  }
}
