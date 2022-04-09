import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile/dto/api_response_dto.dart';

import 'package:mobile/dto/category_dto.dart';
import 'package:mobile/constants.dart';

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
        return apiResult.data
            .map((e) => CategoryDto.fromJson(e as Map<String, dynamic>))
            .toList();
      }
      return List.empty();
    } else {
      throw Exception('failed to load players');
    }
  }
}
