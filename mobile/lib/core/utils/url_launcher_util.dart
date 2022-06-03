import 'package:url_launcher/url_launcher.dart';

class UrlLauncherUtil {
  static void openUrl(String url, {Function? onError}) async {
    final Uri _url = Uri.parse(url);
    if (!await launchUrl(_url, mode: LaunchMode.externalApplication)) {
      if (onError != null) {
        onError();
      }
    }
  }
}
