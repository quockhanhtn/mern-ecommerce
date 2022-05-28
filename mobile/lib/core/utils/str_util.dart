import 'package:diacritic/diacritic.dart';

class StrUtil {
  static bool isNullOrEmpty(String? str) => str == null || str.isEmpty || str.trim().isEmpty;

  static String removeAccent(String? str) {
    if (StrUtil.isNullOrEmpty(str)) {
      return '';
    }
    return removeDiacritics(str!);
  }
}
