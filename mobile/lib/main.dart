import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/l10n/l10n.dart';
import 'package:hk_mobile/routes.dart';
import 'package:hk_mobile/screens/splash_screen.dart';
import 'package:hk_mobile/theme.dart';
import 'package:hk_mobile/core/utils/logger_util.dart';
import 'package:hk_mobile/core/utils/preference_util.dart';
import 'package:intl/intl.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  //SecureStorageUtil.init();
  LoggerUtil.init();
  DioUtil.init(kApiBaseUrl);
  await PreferenceUtil.init();

  String formattedDate =
      DateFormat('yyyy-MM-dd HH:mm:ss').format(DateTime.now());
  LoggerUtil.ins.i('Starting app at $formattedDate ...');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      onGenerateTitle: (BuildContext context) =>
          AppLocalizations.of(context)!.title,
      theme: theme(),
      // home: SplashScreen(),
      // We use routeName so that we don't need to remember the name
      initialRoute: SplashScreen.routeName,
      routes: routes,
      supportedLocales: L10n.all,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
    );
  }
}
