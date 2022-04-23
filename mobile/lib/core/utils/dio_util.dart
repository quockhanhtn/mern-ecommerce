import 'package:dio/dio.dart';

class DioUtil {
  static late Dio _instance;

  static void init(String baseUrl) {
    _instance = Dio(BaseOptions(baseUrl: baseUrl));
  }

  static void setHeader(String key, String value) {
    _instance.options.headers[key] = value;
  }

  static Future<Response<dynamic>> getAsync(String path,
      {Map<String, dynamic>? queryParameters}) async {
    return _instance.get(path, queryParameters: queryParameters);
  }

  static Future<Response<dynamic>> postAsync(String path,
      {Map<String, String>? data, Map<String, dynamic>? queryParameters}) async {
    return _instance.post(path, data: data, queryParameters: queryParameters);
  }

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
