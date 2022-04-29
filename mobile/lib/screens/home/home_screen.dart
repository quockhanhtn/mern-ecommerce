import 'package:flutter/material.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/core/components/custom_bottom_nav_bar.dart';
import 'package:hk_mobile/size_config.dart';

import 'components/body.dart';

class HomeScreen extends StatelessWidget {
  static String routeName = "/home";

  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return const Scaffold(
      body: Body(),
      bottomNavigationBar: CustomBottomNavBar(selectedMenu: MenuState.home, activeIconColor: kPrimaryColor,),
    );
  }
}
