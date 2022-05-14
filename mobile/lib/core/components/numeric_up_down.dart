import 'package:flutter/material.dart';

class NumericUpDown extends StatelessWidget {
  const NumericUpDown({
    Key? key,
    required this.currentValue,
    this.onDecrease,
    this.onIncrease,
  }) : super(key: key);

  final int currentValue;
  final Function? onIncrease;
  final Function? onDecrease;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black26),
      ),
      child: Row(children: [
        IconButton(
          onPressed: onDecrease as void Function()?,
          icon: const Icon(Icons.remove, size: 14),
        ),
        Text(currentValue.toString()),
        IconButton(
          onPressed: onIncrease as void Function()?,
          icon: const Icon(Icons.add, size: 14),
        ),
      ]),
    );
  }
}
