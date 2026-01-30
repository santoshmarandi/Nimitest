class AppLocalization {
  static const Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'app_title': 'Vernier Caliper Practice',
      'practice': 'Practice',
      'test': 'Test',
      'history': 'History',
      'tutorial': 'Tutorial',
      'check_answer': 'Check Answer',
      'next': 'Next',
      'correct': 'Correct!',
      'wrong': 'Wrong!',
      'show_solution': 'Show Solution',
      'msr': 'Main Scale Reading (MSR)',
      'vsr': 'Vernier Scale Reading (VSR)',
      'total': 'Total Reading',
      'enter_reading': 'Enter Reading (mm)',
      'solution_step_1': 'MSR: The mark before Vernier zero is',
      'solution_step_2': 'VSR: The coinciding line is',
      'solution_step_3': 'Formula: MSR + (VSR × LC)',
      'select_language': 'Select Language',
      'start_practice': 'Start Practice',
      'submit': 'Submit',
    },
    'hi': {
      'app_title': 'वर्निअर कैलीपर अभ्यास',
      'practice': 'अभ्यास',
      'test': 'परीक्षा',
      'history': 'इतिहास',
      'tutorial': 'ट्यूटोरियल',
      'check_answer': 'उत्तर जांचें',
      'next': 'अगला',
      'correct': 'सही!',
      'wrong': 'गलत!',
      'show_solution': 'हल देखें',
      'msr': 'मेन स्केल रीडिंग (MSR)',
      'vsr': 'वर्निअर स्केल रीडिंग (VSR)',
      'total': 'कुल माप',
      'enter_reading': 'रीडिंग दर्ज करें (mm)',
      'solution_step_1': 'MSR: वर्निअर शून्य से पहले का निशान',
      'solution_step_2': 'VSR: मिलने वाली लाइन',
      'solution_step_3': 'सूत्र: MSR + (VSR × LC)',
      'select_language': 'भाषा चुनें',
      'start_practice': 'अभ्यास शुरू करें',
      'submit': 'जमा करें',
    },
  };

  static String currentLanguage = 'en';

  static String get(String key) {
    return _localizedValues[currentLanguage]?[key] ?? key;
  }
}
