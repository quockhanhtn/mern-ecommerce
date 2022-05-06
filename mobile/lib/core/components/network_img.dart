import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class NetworkImg extends StatelessWidget {
  const NetworkImg({
    Key? key,
    required this.imageUrl,
    this.imageFit,
    this.progressSize = 0,
    this.imgPadding,
  }) : super(key: key);

  final String imageUrl;
  final BoxFit? imageFit;
  final double? progressSize;
  final EdgeInsetsGeometry? imgPadding;

  @override
  Widget build(BuildContext context) {
    var widget = CachedNetworkImage(
      imageUrl: imageUrl,
      imageBuilder: (context, imageProvider) => Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: imageProvider,
            fit: imageFit ?? BoxFit.cover,
          ),
        ),
      ),
      progressIndicatorBuilder: (context, url, downloadProgress) => renderProgressIndicator(downloadProgress.progress),
      errorWidget: (context, url, error) => const Icon(Icons.error),
    );

    if (imgPadding != null) {
      return Padding(
        padding: imgPadding!,
        child: widget,
      );
    }

    return widget;
  }

  Widget renderProgressIndicator(value) {
    if (progressSize! != 0) {
      return Center(
        child: SizedBox(
          width: progressSize,
          height: progressSize,
          child: CircularProgressIndicator(value: value),
        ),
      );
    }
    return CircularProgressIndicator(value: value);
  }
}
