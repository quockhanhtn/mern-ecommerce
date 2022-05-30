import 'package:hk_mobile/core/utils/type_util.dart';

class MapUtil {
  static String getString(Map<String, dynamic> map, String key, {String defaultValue = ""}) {
    if (map.containsKey(key)) {
      return TypeUtil.toStr(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static int getInt(Map<String, dynamic> map, String key, {int defaultValue = 0}) {
    if (map.containsKey(key)) {
      return TypeUtil.toInt(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static double getDouble(Map<String, dynamic> map, String key, {double defaultValue = 0}) {
    if (map.containsKey(key)) {
      return TypeUtil.toDouble(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }

  static bool getBool(Map<String, dynamic> map, String key, {bool defaultValue = false}) {
    if (map.containsKey(key)) {
      return TypeUtil.toBool(map[key], defaultValue: defaultValue);
    }
    return defaultValue;
  }
}
