import 'package:hk_mobile/core/utils/type_util.dart';

class MapUtil {
  static String getString<T>(Map<T, dynamic> map, T key, {String defaultValue = ""}) {
    if (map.containsKey(key)) {
      return TypeUtil.toStr(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static int getInt<T>(Map<T, dynamic> map, T key, {int defaultValue = 0}) {
    if (map.containsKey(key)) {
      return TypeUtil.toInt(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static double getDouble<T>(Map<T, dynamic> map, T key, {double defaultValue = 0}) {
    if (map.containsKey(key)) {
      return TypeUtil.toDouble(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static bool getBool<T>(Map<T, dynamic> map, T key, {bool defaultValue = false}) {
    if (map.containsKey(key)) {
      return TypeUtil.toBool(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }
}
