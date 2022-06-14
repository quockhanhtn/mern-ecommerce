import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/screens/cart/cart_screen.dart';
import 'package:hk_mobile/screens/main/my_profile_screen.dart';
import 'package:hk_mobile/screens/search/search_screen.dart';
import 'package:hk_mobile/screens/main/components/bottom_bar_view.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

import 'my_home_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> with TickerProviderStateMixin {
  AnimationController? animationController;

  List<TabIconData> tabIconsList = TabIconData.tabIconsList;
  List<Widget> bodyItems = [];

  Widget tabBody = Container(
    color: AppTheme.background,
  );

  @override
  void initState() {
    for (TabIconData tab in tabIconsList) {
      tab.isSelected = false;
    }
    tabIconsList[0].isSelected = true;

    animationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    bodyItems.insert(0, MyHomeScreen(animationController: animationController));
    bodyItems.insert(1, MyProfileScreen());
    bodyItems.insert(2, CartScreen());
    bodyItems.insert(3, MyProfileScreen());

    tabBody = bodyItems[0];
    super.initState();
  }

  @override
  void dispose() {
    animationController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme.background,
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Stack(
          children: <Widget>[
            tabBody,
            _buildBottomBar(),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomBar() {
    return Column(
      children: <Widget>[
        const Expanded(
          child: SizedBox(),
        ),
        BottomBarView(
          tabIconsList: tabIconsList,
          addClick: () {
            Get.to(() => const SearchScreen());
          },
          changeIndex: (int index) {
            if (index == 1) {
              AlertUtil.showSimple(
                context,
                content: 'Tính năng đang phát triển',
                type: AlertType.warning,
              );
              return;
            }
            animationController?.reverse().then<dynamic>((data) {
              if (!mounted) {
                return;
              }
              setState(() {
                tabBody = bodyItems[index];
              });
            });
          },
        ),
      ],
    );
  }
}
