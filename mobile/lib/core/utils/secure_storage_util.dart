// import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// class SecureStorageUtil {
//   static late FlutterSecureStorage _instance;

//   static void init() {
//     _instance = const FlutterSecureStorage();
//   }

//   static Future<String> read(String key, {String defaultValue = ''}) async {
//     String? value = await _instance.read(key: key);
//     return value ?? defaultValue;
//   }

//   static Future<Map<String, String>> readAll() async {
//     var result = await _instance.readAll();
//     return result;
//   }

//   static Future<void> write(String key, String value) async {
//     await _instance.write(key: key, value: value);
//   }

//   static Future<void> delete(String key) async {
//     await _instance.delete(key: key);
//   }

//   static Future<void> deleteAll() async {
//     await _instance.deleteAll();
//   }
// }
