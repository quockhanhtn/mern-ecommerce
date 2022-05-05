import 'package:intl/intl.dart';

class FormatUtils {
  static final _fVNCurrency = NumberFormat("#,##0", "vi_VN");

  static String currency(double price, {language = 'vn'}) {
    return "${_fVNCurrency.format(price)} đ";
  }
}
