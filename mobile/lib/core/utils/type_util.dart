class TypeUtil {
  static String toStr(dynamic object, {String defaultValue = ""}) {
    if (object == null) {
      return defaultValue;
    }
    return (object as String?) ?? "";
  }

  static int toInt(dynamic object, {int defaultValue = 0, int radix = 10}) {
    if (object == null) {
      return defaultValue;
    }
    return int.tryParse(object, radix: radix) ?? defaultValue;
  }

  static double toDouble(dynamic object, {double defaultValue = 0}) {
    if (object == null) {
      return defaultValue;
    }
    return double.tryParse(object) ?? defaultValue;
  }

  static bool toBool(dynamic object, {bool defaultValue = false}) {
    if (object == null) {
      return defaultValue;
    }
    return (object as bool?) ?? defaultValue;
  }
}
