import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/screens/home/home_screen.dart';
import 'package:hk_mobile/size_config.dart';

import 'package:hk_mobile/core/components/default_button.dart';
import 'package:hk_mobile/core/utils/preference_util.dart';
import 'intro_content.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  int currentPage = 0;

  @override
  Widget build(BuildContext context) {
    List<Map<String, String>> splashData = [
      {
        "title": AppLocalizations.of(context)!.introTitle00,
        "text": AppLocalizations.of(context)!.introText00,
        "lottieSrc": "assets/lotties/78619-verified.json"
      },
      {
        "title": AppLocalizations.of(context)!.introTitle01,
        "text": AppLocalizations.of(context)!.introText01,
        "lottieSrc": "assets/lotties/57404-time-animation.json"
      },
      {
        "title": AppLocalizations.of(context)!.introTitle02,
        "text": AppLocalizations.of(context)!.introText02,
        "lottieSrc": "assets/lotties/96305-device-insurance.json"
      },
    ];

    return SafeArea(
      child: SizedBox(
        width: double.infinity,
        child: Column(
          children: <Widget>[
            Expanded(
              flex: 3,
              child: PageView.builder(
                onPageChanged: (value) {
                  setState(() {
                    currentPage = value;
                  });
                },
                itemCount: splashData.length,
                itemBuilder: (context, index) => IntroContent(
                  lottieSrc: splashData[index]['lottieSrc'],
                  title: splashData[index]['title'],
                  text: splashData[index]['text'],
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: getProportionateScreenWidth(20)),
                child: Column(
                  children: <Widget>[
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(
                        splashData.length,
                        (index) => buildDot(index: index),
                      ),
                    ),
                    const Spacer(flex: 3),
                    DefaultButton(
                      text: AppLocalizations.of(context)!.next,
                      press: () {
                        PreferenceUtil.setBool('seen', true);
                        Navigator.pushNamed(context, HomeScreen.routeName);
                      },
                    ),
                    const Spacer(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  AnimatedContainer buildDot({int? index}) {
    return AnimatedContainer(
      duration: kAnimationDuration,
      margin: const EdgeInsets.only(right: 5),
      height: 6,
      width: currentPage == index ? 20 : 6,
      decoration: BoxDecoration(
        color: currentPage == index ? kPrimaryColor : const Color(0xFFD8D8D8),
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }
}
