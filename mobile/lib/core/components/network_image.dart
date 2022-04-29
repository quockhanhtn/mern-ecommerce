import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class NetWorkImage extends StatelessWidget {
  const NetWorkImage(
      {Key? key,
      required this.imageUrl,
      this.imageFit,
      this.filterColor,
      this.filterBlendMode})
      : super(key: key);

  final String imageUrl;
  final BoxFit? imageFit;
  final Color? filterColor;
  final BlendMode? filterBlendMode;

  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imageUrl,
      imageBuilder: (context, imageProvider) => Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: imageProvider,
            fit: imageFit ?? BoxFit.cover,
            // colorFilter: ColorFilter.mode(filterColor ?? Colors.red,
            //     filterBlendMode ?? BlendMode.colorBurn)
          ),
        ),
      ),
      progressIndicatorBuilder: (context, url, downloadProgress) =>
          CircularProgressIndicator(value: downloadProgress.progress),
      errorWidget: (context, url, error) => const Icon(Icons.error),
    );
  }
}
