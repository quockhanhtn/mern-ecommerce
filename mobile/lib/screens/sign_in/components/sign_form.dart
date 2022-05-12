import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/authentication_controller.dart';
import 'package:hk_mobile/core/components/components.dart';
import 'package:hk_mobile/helper/keyboard.dart';
import 'package:hk_mobile/screens/forgot_password/forgot_password_screen.dart';
import 'package:hk_mobile/screens/login_success/login_success_screen.dart';
import 'package:hk_mobile/screens/profile/profile_screen.dart';

import '../../../constants.dart';
import '../../../size_config.dart';

class SignForm extends StatefulWidget {
  SignForm({Key? key, this.onLoginSuccess}) : super(key: key);

  Function? onLoginSuccess;
  @override
  _SignFormState createState() => _SignFormState();
}

class _SignFormState extends State<SignForm> {
  final _formKey = GlobalKey<FormState>();
  String? email;
  String? password;
  bool? remember = false;
  final List<String?> errors = [];

  final AuthenticationController authController = Get.put(AuthenticationController());

  void addError({String? error}) {
    if (!errors.contains(error)) {
      setState(() {
        errors.add(error);
      });
    }
  }

  void removeError({String? error}) {
    if (errors.contains(error)) {
      setState(() {
        errors.remove(error);
      });
    }
  }

  void handleLogin() async {
    await authController.login(email!, password!);
    if (authController.isAuthenticated.isTrue) {
      widget.onLoginSuccess!();
      // Navigator.pop(context);
      //Get.back();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          buildEmailFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildPasswordFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          Row(
            children: [
              Checkbox(
                value: remember,
                activeColor: kPrimaryColor,
                onChanged: (value) {
                  setState(() {
                    remember = value;
                  });
                },
              ),
              const Text("Lưu đăng nhập"),
              const Spacer(),
              GestureDetector(
                onTap: () => Navigator.pushNamed(context, ForgotPasswordScreen.routeName),
                child: const Text(
                  "Quên mật khẩu",
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
          Obx(() {
            if (authController.errorMgs.isNotEmpty) {
              errors.clear();
              errors.add(authController.errorMgs.toString());
            }
            return FormError(errors: errors);
          }),
          SizedBox(height: getProportionateScreenHeight(20)),
          Obx(() {
            if (authController.isLoading.isTrue) {
              return const Center(child: CircularProgressIndicator());
            }
            if (authController.isAuthenticated.isTrue) {
              Navigator.pushNamed(context, ProfileScreen.routeName);
            }
            return DefaultButton(
              text: "Tiếp tục",
              press: () {
                if (_formKey.currentState!.validate()) {
                  _formKey.currentState!.save();

                  // if all are valid then go to success screen
                  KeyboardUtil.hideKeyboard(context);
                  authController.login(email!, password!);
                  //Navigator.pushNamed(context, LoginSuccessScreen.routeName);
                }
              },
            );
          })
        ],
      ),
    );
  }

  TextFormField buildPasswordFormField() {
    return TextFormField(
      obscureText: true,
      onSaved: (newValue) => password = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kPassNullError);
        } else if (value.length >= 8) {
          removeError(error: kShortPassError);
        }
        return;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kPassNullError);
          return "";
        } else if (value.length < 8) {
          addError(error: kShortPassError);
          return "";
        }
        return null;
      },
      decoration: const InputDecoration(
        labelText: "Mật khẩu",
        hintText: "Nhập mật khẩu",
        // If  you are using latest version of flutter then label text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSuffixIcon(svgIcon: "assets/icons/Lock.svg"),
      ),
    );
  }

  TextFormField buildEmailFormField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      onSaved: (newValue) => email = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kEmailNullError);
        } else if (emailValidatorRegExp.hasMatch(value)) {
          removeError(error: kInvalidEmailError);
        }
        return;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kEmailNullError);
          return "";
        } else if (!emailValidatorRegExp.hasMatch(value)) {
          addError(error: kInvalidEmailError);
          return "";
        }
        return null;
      },
      decoration: const InputDecoration(
        labelText: "Email",
        hintText: "Nhập địa chỉ email",
        // If  you are using latest version of flutter then label text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSuffixIcon(svgIcon: "assets/icons/Mail.svg"),
      ),
    );
  }
}
