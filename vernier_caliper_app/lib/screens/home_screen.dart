import 'package:flutter/material.dart';
import '../utils/localization.dart';
import 'practice_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  void _toggleLanguage() {
    setState(() {
      AppLocalization.currentLanguage =
          AppLocalization.currentLanguage == 'en' ? 'hi' : 'en';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalization.get('app_title')),
        actions: [
          IconButton(
            icon: const Icon(Icons.language),
            onPressed: _toggleLanguage,
            tooltip: AppLocalization.get('select_language'),
          )
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const PracticeScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
              ),
              child: Text(
                AppLocalization.get('start_practice'),
                style: const TextStyle(fontSize: 18),
              ),
            ),
            const SizedBox(height: 20),
            // Placeholder buttons for other features
            OutlinedButton(
              onPressed: null, // To be implemented
              child: Text(AppLocalization.get('tutorial')),
            ),
            OutlinedButton(
              onPressed: null, // To be implemented
              child: Text(AppLocalization.get('history')),
            ),
          ],
        ),
      ),
    );
  }
}
