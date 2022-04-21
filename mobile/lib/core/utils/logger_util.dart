import 'package:logger/logger.dart';

class LoggerUtil {
  static late Logger ins;

  static void init() {
    ins = Logger();
  }
}
