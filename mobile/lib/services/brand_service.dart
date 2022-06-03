import 'dart:convert';

import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/dto/api_response_dto.dart';
import 'package:hk_mobile/dto/brand_dto.dart';
import 'package:http/http.dart' as http;

class BrandService {
  String resource = "brands";

  Future<List<BrandDto>> getAll() async {
    final response = await http.get(Uri.parse(kApiBaseUrl + resource));
    return parseResponse(response);
  }

  List<BrandDto> parseResponse(http.Response response) {
    final responseString = jsonDecode(response.body);

    if (response.statusCode == 200) {
      var apiResult = ApiResponseDto.fromJson(responseString);
      if (apiResult.success) {
        return apiResult.data.map((e) => BrandDto(e as Map<String, dynamic>)).toList();
      }
      return List.empty();
    } else {
      throw Exception('Failed to load brands');
    }
  }
}
