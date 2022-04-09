class PaginationDto {
  int countAll;
  int total;
  int totalPages;
  int limit;
  int page;
  bool? hasNextPage;
  int? nextPage;
  bool? hasPrevPage;
  int? prevPage;

  PaginationDto(
      this.countAll,
      this.total,
      this.totalPages,
      this.limit,
      this.page,
      this.nextPage,
      this.hasNextPage,
      this.hasPrevPage,
      this.prevPage);
}

class ApiResponseDto<T> {
  bool success;
  String message;
  List<dynamic> data;

  ApiResponseDto(this.success, this.message, this.data);

  factory ApiResponseDto.fromJson(Map<String, dynamic> json) {
    return ApiResponseDto(json['success'] as bool, json['message'] as String,
        json['data'] as List<dynamic>);
  }
}
