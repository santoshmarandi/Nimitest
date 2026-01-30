import 'package:flutter/material.dart';
import '../models/vernier_caliper.dart';
import '../utils/constants.dart';
import '../utils/localization.dart';
import '../widgets/vernier_simulation.dart';

class PracticeScreen extends StatefulWidget {
  const PracticeScreen({super.key});

  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  final VernierCaliperLogic _logic = VernierCaliperLogic();
  late VernierCaliperReading _currentQuestion;
  double _currentValue = 0.0;

  final TextEditingController _controller = TextEditingController();

  bool _isChecked = false;
  bool _isCorrect = false;
  String _feedbackMessage = '';

  @override
  void initState() {
    super.initState();
    _generateNewQuestion();
  }

  void _generateNewQuestion() {
    setState(() {
      _currentQuestion = _logic.generateQuestion();
      _currentValue = _currentQuestion.value;
      _controller.clear();
      _isChecked = false;
      _feedbackMessage = '';
    });
  }

  void _checkAnswer() {
    if (_controller.text.isEmpty) return;

    double userReading = double.tryParse(_controller.text) ?? -1.0;

    setState(() {
      _isChecked = true;
      _isCorrect = _logic.checkAnswer(userReading, _currentQuestion.value);
      _feedbackMessage = _isCorrect
          ? AppLocalization.get('correct')
          : AppLocalization.get('wrong');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalization.get('practice')),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Simulation Area
            Container(
              height: 250,
              padding: const EdgeInsets.all(8.0),
              color: Colors.grey[100],
              child: Column(
                children: [
                   const SizedBox(height: 10),
                   Expanded(
                     child: VernierSimulation(
                       value: _currentValue,
                       onValueChanged: (val) {
                         // In practice mode (Random Question), usually the caliper is set
                         // and the user reads it. So maybe we shouldn't allow moving it?
                         // "Student must read and enter measurement manually" implies fixed question.
                         // But "Practice Modes" -> "Random measurement generation".
                         // If it's a "Set the caliper to X" mode, then we need movement.
                         // If it's "Read the caliper", we lock it.
                         // Let's assume "Read the caliper" for now, so interaction is disabled.
                       },
                       isInteractive: false,
                     ),
                   ),
                   const Text("Zoom: Pinch or use InteractiveViewer (Not impl in this basic view)"),
                ],
              ),
            ),

            const Divider(),

            // Input Area
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  TextField(
                    controller: _controller,
                    keyboardType: const TextInputType.numberWithOptions(decimal: true),
                    decoration: InputDecoration(
                      labelText: AppLocalization.get('enter_reading'),
                      border: const OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                        onPressed: _isChecked ? null : _checkAnswer,
                        child: Text(AppLocalization.get('check_answer')),
                      ),
                      ElevatedButton(
                        onPressed: _generateNewQuestion,
                        child: Text(AppLocalization.get('next')),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Feedback & Solution Area
            if (_isChecked)
              Container(
                padding: const EdgeInsets.all(16),
                color: _isCorrect ? Colors.green[50] : Colors.red[50],
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _feedbackMessage,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: _isCorrect ? Colors.green : Colors.red,
                      ),
                    ),
                    const SizedBox(height: 10),
                    if (!_isCorrect)
                      ElevatedButton.icon(
                        icon: const Icon(Icons.lightbulb),
                        label: Text(AppLocalization.get('show_solution')),
                        onPressed: () {
                          showModalBottomSheet(
                            context: context,
                            builder: (ctx) => _buildSolutionSheet(ctx)
                          );
                        },
                      ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildSolutionSheet(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            "Solution for ${_currentQuestion.value} mm",
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const Divider(),
          Text("${AppLocalization.get('solution_step_1')} ${_currentQuestion.msr} mm"),
          Text("${AppLocalization.get('solution_step_2')} ${_currentQuestion.vsr}"),
          Text("${AppLocalization.get('solution_step_3')}"),
          const SizedBox(height: 10),
          Text(
            "${_currentQuestion.msr} + (${_currentQuestion.vsr} × ${InstrumentConstants.leastCount}) = ${_currentQuestion.value} mm",
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blue),
          ),
        ],
      ),
    );
  }
}
