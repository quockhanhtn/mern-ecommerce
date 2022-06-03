import 'package:intl/intl.dart';

class FormatUtils {
  static final _fVNCurrency = NumberFormat("#,##0", "vi_VN");

  static String currency(double price, {language = 'vn'}) {
    return "${_fVNCurrency.format(price)} đ";
  }

  static String formatDateTime(String isoDateTime) {
    var dateValue = DateFormat("yyyy-MM-ddTHH:mm:ssZ").parseUTC(isoDateTime).toLocal();
    String formattedDate = DateFormat("dd/MM/yyyy HH:mm:ss").format(dateValue);
    return formattedDate;
  }
}
