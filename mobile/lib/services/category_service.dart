import 'dart:convert';

import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/dto/api_response_dto.dart';
import 'package:hk_mobile/dto/category_dto.dart';
import 'package:http/http.dart' as http;

class CategoryService {
  String resource = "categories";

  Future<List<CategoryDto>> getAll() async {
    final response = await http.get(Uri.parse(kApiBaseUrl + resource));
    return parseResponse(response);
  }

  // Future<List<CategoryDto>> fetchPlayersByName(String name) async {
  //   final response = await http.get(baseUrl + "name=" + name);
  //
  //   return parseResponse(response);
  // }

  List<CategoryDto> parseResponse(http.Response response) {
    final responseString = jsonDecode(response.body);

    if (response.statusCode == 200) {
      var apiResult = ApiResponseDto.fromJson(responseString);
      if (apiResult.success) {
        return apiResult.data.map((e) => CategoryDto(e as Map<String, dynamic>)).toList();
      }
      return List.empty();
    } else {
      throw Exception('Failed to load categories');
    }
  }
}
