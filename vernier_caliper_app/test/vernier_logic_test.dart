import 'package:flutter_test/flutter_test.dart';
import 'package:vernier_caliper_app/models/vernier_caliper.dart';
import 'package:vernier_caliper_app/utils/constants.dart';

void main() {
  group('Vernier Caliper Logic', () {
    final logic = VernierCaliperLogic();

    test('Least Count is correct', () {
      expect(InstrumentConstants.leastCount, 0.02);
    });

    test('Calculate Reading 0.0', () {
      final reading = logic.calculateReadingFromValue(0.0);
      expect(reading.msr, 0);
      expect(reading.vsr, 0);
    });

    test('Calculate Reading 1.0', () {
      final reading = logic.calculateReadingFromValue(1.0);
      expect(reading.msr, 1);
      expect(reading.vsr, 0);
    });

    test('Calculate Reading 0.02', () {
      final reading = logic.calculateReadingFromValue(0.02);
      expect(reading.msr, 0);
      expect(reading.vsr, 1);
    });

    test('Calculate Reading 15.48', () {
      final reading = logic.calculateReadingFromValue(15.48);
      expect(reading.msr, 15);
      // 0.48 / 0.02 = 24
      expect(reading.vsr, 24);
    });

    test('Generate Question returns valid value', () {
      final reading = logic.generateQuestion(maxRange: 50.0);
      expect(reading.value >= 0 && reading.value <= 50.0, true);
      // Check if value is a multiple of least count (floating point safe)
      double remainder = reading.value % InstrumentConstants.leastCount;
      expect(remainder < 0.0001 || (InstrumentConstants.leastCount - remainder) < 0.0001, true);
    });

    test('Check Answer within tolerance', () {
      expect(logic.checkAnswer(10.00, 10.00), true);
      expect(logic.checkAnswer(10.01, 10.00), true); // within 0.02
      expect(logic.checkAnswer(10.02, 10.00), true); // within 0.02
      expect(logic.checkAnswer(10.03, 10.00), false); // outside 0.02
    });
  });
}
