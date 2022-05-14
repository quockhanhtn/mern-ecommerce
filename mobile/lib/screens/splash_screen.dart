import 'package:after_layout/after_layout.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/preference_util.dart';
import 'package:hk_mobile/screens/home/home_screen.dart';
import 'package:hk_mobile/screens/intro/intro_screen.dart';
import 'package:hk_mobile/screens/main/main_screen.dart';
import 'package:hk_mobile/size_config.dart';

class SplashScreen extends StatefulWidget {
  static String routeName = "/splash";

  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with AfterLayoutMixin<SplashScreen> {
  Future checkFirstSeen() async {
    bool _seen = PreferenceUtil.getBool('seen', false);

    if (_seen) {
      // Get.to(const HomeScreen());
      Get.to(const MainScreen());
      //Navigator.pushNamed(context, HomeScreen.routeName);
    } else {
      Get.to(const IntroScreen());
      //Navigator.pushNamed(context, IntroScreen.routeName);
    }
  }

  @override
  void afterFirstLayout(BuildContext context) => checkFirstSeen();

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);

    return const Scaffold(
      body: Center(
        child: Text('Loading...'),
      ),
    );
  }
}
