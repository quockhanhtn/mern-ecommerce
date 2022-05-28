class ApiResponseDto<T> {
  bool success;
  String message;
  List<dynamic> data;
  PaginationDto? pagination;

  ApiResponseDto(
    this.success,
    this.message,
    this.data,
    this.pagination,
  );

  factory ApiResponseDto.fromJson(Map<String, dynamic> json) {
    return ApiResponseDto(
      json['success'] as bool,
      json['message'] as String,
      json['data'] as List<dynamic>,
      json['pagination'] != null ? PaginationDto.fromJson(json['pagination']) : null,
    );
  }
}

class PaginationDto {
  int? countAll;
  int? total;
  int? totalPages;
  int? limit;
  int? page;
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
    this.hasNextPage,
    this.nextPage,
    this.hasPrevPage,
    this.prevPage,
  );

  PaginationDto.fromJson(Map<String, dynamic> json) {
    countAll = json['countAll'];
    total = json['total'];
    totalPages = json['totalPages'];
    limit = json['limit'];
    page = json['page'];
    hasNextPage = json['hasNextPage'];
    nextPage = json['nextPage'];
    hasPrevPage = json['hasPrevPage'];
    prevPage = json['prevPage'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['countAll'] = countAll;
    data['total'] = total;
    data['totalPages'] = totalPages;
    data['limit'] = limit;
    data['page'] = page;
    data['hasNextPage'] = hasNextPage;
    data['nextPage'] = nextPage;
    data['hasPrevPage'] = hasPrevPage;
    data['prevPage'] = prevPage;
    return data;
  }
}
