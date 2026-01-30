import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'utils/localization.dart';

void main() {
  runApp(const VernierCaliperApp());
}

class VernierCaliperApp extends StatelessWidget {
  const VernierCaliperApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vernier Caliper Practice',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
