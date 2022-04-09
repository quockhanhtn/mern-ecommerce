import 'package:flutter/widgets.dart';
import 'package:mobile/screens/cart/cart_screen.dart';
import 'package:mobile/screens/complete_profile/complete_profile_screen.dart';
import 'package:mobile/screens/details/details_screen.dart';
import 'package:mobile/screens/forgot_password/forgot_password_screen.dart';
import 'package:mobile/screens/home/home_screen.dart';
import 'package:mobile/screens/intro/intro_screen.dart';
import 'package:mobile/screens/login_success/login_success_screen.dart';
import 'package:mobile/screens/otp/otp_screen.dart';
import 'package:mobile/screens/profile/profile_screen.dart';
import 'package:mobile/screens/sign_in/sign_in_screen.dart';
import 'package:mobile/screens/splash_screen.dart';

import 'screens/sign_up/sign_up_screen.dart';

// We use name route
// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  CartScreen.routeName: (context) => const CartScreen(),
  CompleteProfileScreen.routeName: (context) => const CompleteProfileScreen(),
  DetailsScreen.routeName: (context) => const DetailsScreen(),
  ForgotPasswordScreen.routeName: (context) => const ForgotPasswordScreen(),
  HomeScreen.routeName: (context) => const HomeScreen(),
  IntroScreen.routeName: (context) => const IntroScreen(),
  LoginSuccessScreen.routeName: (context) => const LoginSuccessScreen(),
  OtpScreen.routeName: (context) => const OtpScreen(),
  ProfileScreen.routeName: (context) => const ProfileScreen(),
  SignInScreen.routeName: (context) => const SignInScreen(),
  SignUpScreen.routeName: (context) => const SignUpScreen(),
  SplashScreen.routeName: (context) => const SplashScreen(),
};
