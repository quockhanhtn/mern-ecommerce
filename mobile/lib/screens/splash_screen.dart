import 'package:after_layout/after_layout.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
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
  //WebSocketChannel channel = WebSocketChannel.connect(Uri.parse(URL));
  TextEditingController controller = TextEditingController();
  var sub;
  late String text;

  Future checkFirstSeen() async {
    bool _seen = PreferenceUtil.getBool('seen', false);

    if (_seen) {
      Get.to(const HomeScreen());
      //Navigator.pushNamed(context, HomeScreen.routeName);
    } else {
      Get.to(const IntroScreen());
      //Navigator.pushNamed(context, IntroScreen.routeName);
    }
  }

  @override
  void afterFirstLayout(BuildContext context) => checkFirstSeen();

  @override
  void initState() {
    super.initState();

    FlutterLocalNotificationsPlugin notifications = FlutterLocalNotificationsPlugin();
    const androidInit = AndroidInitializationSettings('app_icon');
    const iOSInit = IOSInitializationSettings();
    const init = InitializationSettings(
      android: androidInit,
      iOS: iOSInit,
    );

    notifications.initialize(init).then((done) {
      // sub = channel.stream.listen((newData) {
      //   setState(() {
      //     text = newData;
      //   });

      notifications.show(
          0,
          "New announcement",
          "asd data",
          const NotificationDetails(
            android: AndroidNotificationDetails("announcement_app_0", "Announcement App"),
            iOS: IOSNotificationDetails(),
          ));
      //});
    });
  }

  @override
  void dispose() {
    super.dispose();
    //channel.sink.close(statusCodes.goingAway);
    sub.cancel();
  }

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
