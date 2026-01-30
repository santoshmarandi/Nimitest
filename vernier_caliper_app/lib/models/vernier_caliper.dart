import 'dart:math';
import '../utils/constants.dart';

class VernierCaliperReading {
  final double value;
  final int msr;
  final int vsr;

  VernierCaliperReading({required this.value, required this.msr, required this.vsr});

  @override
  String toString() => 'Value: $value, MSR: $msr, VSR: $vsr';
}

class VernierCaliperLogic {
  final Random _random = Random();

  /// Generates a random measurement value respecting the least count.
  /// Max range default is 100mm.
  VernierCaliperReading generateQuestion({double maxRange = 100.0}) {
    // Generate total steps of least count
    int maxSteps = (maxRange / InstrumentConstants.leastCount).floor();
    int steps = _random.nextInt(maxSteps);

    double value = double.parse((steps * InstrumentConstants.leastCount).toStringAsFixed(2));

    return calculateReadingFromValue(value);
  }

  /// Calculates MSR and VSR from a given double value
  VernierCaliperReading calculateReadingFromValue(double value) {
    int msr = value.floor();
    // Calculate remainder
    double remainder = value - msr;
    // Calculate VSR index
    int vsr = (remainder / InstrumentConstants.leastCount).round();

    // Correct for floating point jitter if needed, though round() usually handles it.
    // Ensure vsr is within bounds (0 to 50)
    if (vsr >= InstrumentConstants.vernierDivisions) {
      // This case should rarely happen with proper math, but if it does (e.g. 0.999),
      // it means we are closer to next mm.
       msr += 1;
       vsr = 0;
    }

    return VernierCaliperReading(value: value, msr: msr, vsr: vsr);
  }

  /// Checks if the user's answer is correct within tolerance
  bool checkAnswer(double userValue, double correctValue) {
    return (userValue - correctValue).abs() <= InstrumentConstants.tolerance;
  }
}
