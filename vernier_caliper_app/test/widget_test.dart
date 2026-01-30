import 'package:flutter_test/flutter_test.dart';
import 'package:vernier_caliper_app/main.dart';

void main() {
  testWidgets('App starts and shows home screen', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const VernierCaliperApp());

    // Verify that our app starts.
    expect(find.text('Vernier Caliper Practice'), findsOneWidget); // AppBar title
    expect(find.text('Start Practice'), findsOneWidget); // Button
  });
}
