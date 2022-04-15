// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values, avoid_escaping_inner_quotes

class S {
  S();

  static S? _current;

  static S get current {
    assert(_current != null,
        'No instance of S was loaded. Try to initialize the S delegate before accessing S.current.');
    return _current!;
  }

  static const AppLocalizationDelegate delegate = AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false)
        ? locale.languageCode
        : locale.toString();
    final localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      final instance = S();
      S._current = instance;

      return instance;
    });
  }

  static S of(BuildContext context) {
    final instance = S.maybeOf(context);
    assert(instance != null,
        'No instance of S present in the widget tree. Did you add S.delegate in localizationsDelegates?');
    return instance!;
  }

  static S? maybeOf(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  /// `English`
  String get language {
    return Intl.message(
      'English',
      name: 'language',
      desc: '',
      args: [],
    );
  }

  /// `HK Mobile`
  String get title {
    return Intl.message(
      'HK Mobile',
      name: 'title',
      desc: '',
      args: [],
    );
  }

  /// `Next`
  String get next {
    return Intl.message(
      'Next',
      name: 'next',
      desc: '',
      args: [],
    );
  }

  /// `Start`
  String get start {
    return Intl.message(
      'Start',
      name: 'start',
      desc: '',
      args: [],
    );
  }

  /// `Title 01`
  String get introTitle00 {
    return Intl.message(
      'Title 01',
      name: 'introTitle00',
      desc: '',
      args: [],
    );
  }

  /// `Content 01`
  String get introText00 {
    return Intl.message(
      'Content 01',
      name: 'introText00',
      desc: '',
      args: [],
    );
  }

  /// `Title 02`
  String get introTitle01 {
    return Intl.message(
      'Title 02',
      name: 'introTitle01',
      desc: '',
      args: [],
    );
  }

  /// `Content 02`
  String get introText01 {
    return Intl.message(
      'Content 02',
      name: 'introText01',
      desc: '',
      args: [],
    );
  }

  /// `Title 03`
  String get introTitle02 {
    return Intl.message(
      'Title 03',
      name: 'introTitle02',
      desc: '',
      args: [],
    );
  }

  /// `Content 03`
  String get introText02 {
    return Intl.message(
      'Content 03',
      name: 'introText02',
      desc: '',
      args: [],
    );
  }

  /// `Search product`
  String get productSearchHint {
    return Intl.message(
      'Search product',
      name: 'productSearchHint',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'vi'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    for (var supportedLocale in supportedLocales) {
      if (supportedLocale.languageCode == locale.languageCode) {
        return true;
      }
    }
    return false;
  }
}
