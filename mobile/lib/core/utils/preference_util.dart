import 'dart:async' show Future;

import 'package:shared_preferences/shared_preferences.dart';

import 'logger_util.dart';

class PreferenceUtil {
  static late SharedPreferences _instance;

  // call this method from iniState() function of mainApp().
  static Future<void> init() async {
    _instance = await SharedPreferences.getInstance();
    LoggerUtil.ins.i('Init SharedPreferences ins done');
  }

  static String getString(String key, {String defValue = ''}) {
    return _instance.getString(key) ?? defValue;
  }

  static Future<bool> setString(String key, String value) async {
    return _instance.setString(key, value);
  }

  static bool getBool(String key, [bool? defValue]) {
    return _instance.getBool(key) ?? defValue ?? false;
  }

  static Future<bool> setBool(String key, bool value) async {
    return _instance.setBool(key, value);
  }
}
