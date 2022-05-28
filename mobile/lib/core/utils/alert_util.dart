import 'package:flutter/material.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

class AlertUtil {
  static showSimple(
    BuildContext buildCtx, {
    String content = '',
    String btnText = 'OK',
    AlertType type = AlertType.none,
  }) {
    FocusManager.instance.primaryFocus?.unfocus(); // hide keyboard

    var padding = type != AlertType.none ? const EdgeInsets.only(top: 10) : EdgeInsets.zero;

    Alert(
      type: type,
      style: const AlertStyle(isCloseButton: false),
      context: buildCtx,
      content: Padding(
        padding: padding,
        child: Text(
          content,
          style: const TextStyle(fontSize: 18),
        ),
      ),
      buttons: [
        DialogButton(
          child: Text(
            btnText,
            style: const TextStyle(color: Colors.white, fontSize: 18),
          ),
          onPressed: () => Navigator.pop(buildCtx),
        ),
      ],
    ).show();
  }
}
