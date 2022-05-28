import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/core/utils/logger_util.dart';
import 'package:hk_mobile/core/utils/str_util.dart';
import 'package:hk_mobile/dto/admin_unit_dto.dart';
import 'package:hk_mobile/screens/address_book/components/address_picker.dart';

class AddressBookScreen extends StatelessWidget {
  AddressBookScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: const [
            Text(
              "Địa chỉ",
              style: TextStyle(color: Colors.black),
            )
          ],
        ),
      ),
      body: renderBody(),
    );
  }

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _typeAheadController = TextEditingController();
  late String _selectedCity;

  Widget renderBody() {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          children: <Widget>[
            AddressPicker(UniqueKey()),
          ],
        ),
      ),
    );
  }
}
