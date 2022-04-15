import 'package:logger/logger.dart';

class LoggerUtils {
  static late Logger ins;

  static void init() {
    ins = Logger();
  }
}
