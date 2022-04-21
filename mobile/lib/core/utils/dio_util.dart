import 'package:dio/dio.dart';

class DioUtil {
  static late Dio _instance;

  static void init(String baseUrl) {
    _instance = Dio(BaseOptions(baseUrl: baseUrl));
  }

  // static Future<Response<dynamic>> get(String path,
  //     {Map<String, dynamic>? queryParameters}) async {
  //   return _instance.get(path, queryParameters: queryParameters);
  // }

  static void get(
    String path, {
    Map<String, dynamic>? queryParameters,
    required Function(dynamic data) onSuccess,
    required Function(dynamic error) onError,
    Function()? onFinally,
  }) {
    _instance.get(path, queryParameters: queryParameters).then((res) {
      if (res.statusCode! >= 200 && res.statusCode! < 300) {
        onSuccess(res.data);
      }
      if (onFinally != null) {
        onFinally();
      }
    }).catchError((e) {
      onError(e);
      if (onFinally != null) {
        onFinally();
      }
    });
  }
}
