import 'package:after_layout/after_layout.dart';
import 'package:flutter/material.dart';
import 'package:hk_mobile/screens/home/home_screen.dart';
import 'package:hk_mobile/screens/intro/intro_screen.dart';
import 'package:hk_mobile/size_config.dart';
import 'package:hk_mobile/utils/preference_utils.dart';

class SplashScreen extends StatefulWidget {
  static String routeName = "/splash";

  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with AfterLayoutMixin<SplashScreen> {
  Future checkFirstSeen() async {
    bool _seen = PreferenceUtils.getBool('seen', false);

    if (_seen) {
      Navigator.pushNamed(context, HomeScreen.routeName);
    } else {
      Navigator.pushNamed(context, IntroScreen.routeName);
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
