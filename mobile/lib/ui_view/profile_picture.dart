import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:getwidget/components/avatar/gf_avatar.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/utils/str_util.dart';

class ProfilePicture extends StatelessWidget {
  ProfilePicture({Key? key, required this.url}) : super(key: key);
  final String url;

  @override
  Widget build(BuildContext context) {
    Widget avatar = SizedBox();
    if (StrUtil.isNullOrEmpty(url)) {
      avatar = GFAvatar();
    }
    avatar = NetworkImg(imageUrl: url);
    return SizedBox(
      height: 115,
      width: 115,
      child: Stack(
        fit: StackFit.expand,
        clipBehavior: Clip.none,
        children: [
          avatar,
          Positioned(
            right: -16,
            bottom: 0,
            child: SizedBox(
              height: 46,
              width: 46,
              child: TextButton(
                style: TextButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                    side: const BorderSide(color: Colors.white),
                  ),
                  primary: Colors.white,
                  backgroundColor: const Color(0xFFF5F6F9),
                ),
                onPressed: () {},
                child: SvgPicture.asset("assets/icons/ic_camera.svg"),
              ),
            ),
          )
        ],
      ),
    );
  }
}
