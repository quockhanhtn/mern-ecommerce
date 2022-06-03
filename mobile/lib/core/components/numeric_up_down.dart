import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';

class NumericUpDown extends StatelessWidget {
  const NumericUpDown({
    Key? key,
    required this.currentValue,
    required this.min,
    required this.max,
    this.availableTxt,
    this.onDecrease,
    this.onIncrease,
  }) : super(key: key);

  final int currentValue;
  final int min;
  final int max;
  final String? availableTxt;
  final Function? onIncrease;
  final Function? onDecrease;

  @override
  Widget build(BuildContext context) {
    var numberBtnSize = GFSize.MEDIUM * 4 / 5;
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.black26),
          ),
          child: Row(
            children: [
              GFIconButton(
                size: numberBtnSize,
                onPressed: currentValue == min ? null : onDecrease as void Function()?,
                icon: Icon(Icons.remove, color: GFColors.DARK.withOpacity(currentValue == min ? 0.2 : 0.8)),
                type: GFButtonType.transparent,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 5, right: 5),
                child: Text(
                  currentValue.toString().padLeft(2),
                  textAlign: TextAlign.center,
                ),
              ),
              GFIconButton(
                size: numberBtnSize,
                onPressed: currentValue == max ? null : onIncrease as void Function()?,
                disabledColor: GFColors.DARK.withOpacity(0.2),
                icon: Icon(Icons.add, color: GFColors.DARK.withOpacity(currentValue == max ? 0.2 : 0.8)),
                type: GFButtonType.transparent,
              ),
            ],
          ),
        ),
        availableTxt != null
            ? Padding(
                padding: const EdgeInsets.only(top: 5),
                child: Text(
                  availableTxt!,
                  style: const TextStyle(fontSize: 12),
                ),
              )
            : Container()
      ],
    );
  }
}
