import 'package:flutter/material.dart';
import '../utils/constants.dart';

class VernierSimulation extends StatelessWidget {
  final double value;
  final Function(double) onValueChanged;
  final bool isInteractive;

  const VernierSimulation({
    super.key,
    required this.value,
    required this.onValueChanged,
    this.isInteractive = true,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return GestureDetector(
          onHorizontalDragUpdate: isInteractive
              ? (details) {
                  // Convert pixel delta to mm delta
                  // pixelsPerMm is defined in Constants
                  double deltaMm = details.delta.dx / InstrumentConstants.pixelsPerMm;
                  double newValue = (value + deltaMm).clamp(0.0, 150.0);

                  // Snap to least count?
                  // Real calipers don't snap, but for digital input matching visual it helps.
                  // However, for realistic feel, we let it slide smooth, but the "value" passed around
                  // might be what we use.
                  // To avoid "impossible" readings, let's just update the float.
                  // The Check Logic will handle tolerance.

                  onValueChanged(newValue);
                }
              : null,
          child: Container(
            color: Colors.white,
            width: constraints.maxWidth,
            height: 200,
            child: CustomPaint(
              painter: CaliperPainter(value: value),
            ),
          ),
        );
      },
    );
  }
}

class CaliperPainter extends CustomPainter {
  final double value; // The current measurement in mm

  CaliperPainter({required this.value});

  @override
  void paint(Canvas canvas, Size size) {
    final Paint mainScalePaint = Paint()
      ..color = Colors.black
      ..strokeWidth = 1.0;

    final Paint vernierScalePaint = Paint()
      ..color = Colors.blue.shade800
      ..strokeWidth = 1.0;

    final TextPainter textPainter = TextPainter(
      textDirection: TextDirection.ltr,
    );

    double pixelsPerMm = InstrumentConstants.pixelsPerMm;
    double rulerY = size.height * 0.4;

    // 1. Draw Main Scale (Fixed)
    // We draw from -10mm to Max visible width to handle sliding effect if we were scrolling scale.
    // But here, the main scale is fixed, the vernier slides.

    // Draw Main Scale Baseline
    canvas.drawLine(
      Offset(0, rulerY),
      Offset(size.width, rulerY),
      mainScalePaint,
    );

    // Draw Main Scale Graduations
    for (int i = 0; i < (size.width / pixelsPerMm).floor(); i++) {
      double x = i * pixelsPerMm;
      double h = (i % 10 == 0) ? 20.0 : (i % 5 == 0 ? 15.0 : 10.0);

      canvas.drawLine(Offset(x, rulerY), Offset(x, rulerY - h), mainScalePaint);

      if (i % 10 == 0) {
        textPainter.text = TextSpan(
          text: (i / 10).round().toString(),
          style: const TextStyle(color: Colors.black, fontSize: 12),
        );
        textPainter.layout();
        textPainter.paint(canvas, Offset(x - textPainter.width / 2, rulerY - h - 15));
      }
    }

    // 2. Draw Vernier Scale (Movable)
    // The Zero of Vernier Scale is at `value * pixelsPerMm`
    double vernierX = value * pixelsPerMm;
    double vernierY = rulerY + 2; // Slightly below main scale

    // Draw Vernier Jaw Body (Simple visual)
    Paint jawPaint = Paint()..color = Colors.grey.withOpacity(0.3);
    Rect jawRect = Rect.fromLTWH(vernierX - 15, vernierY, (50 * 0.98 * pixelsPerMm) + 30, 60);
    canvas.drawRect(jawRect, jawPaint);

    // Draw Vernier Baseline
    canvas.drawLine(
      Offset(vernierX - 10, vernierY),
      Offset(vernierX + (50 * pixelsPerMm), vernierY),
      vernierScalePaint,
    );

    // Draw Vernier Graduations
    // 50 Divisions equal 49 MSD.
    // 1 VSD = 49/50 mm = 0.98 mm.
    double vsdInPixels = 0.98 * pixelsPerMm;

    for (int i = 0; i <= 50; i++) {
      double x = vernierX + (i * vsdInPixels);
      double h = (i % 5 == 0) ? 15.0 : 8.0;

      canvas.drawLine(Offset(x, vernierY), Offset(x, vernierY + h), vernierScalePaint);

      if (i % 5 == 0) {
        textPainter.text = TextSpan(
          text: i.toString(),
          style: const TextStyle(color: Colors.blue, fontSize: 10),
        );
        textPainter.layout();
        textPainter.paint(canvas, Offset(x - textPainter.width / 2, vernierY + h + 2));
      }
    }
  }

  @override
  bool shouldRepaint(covariant CaliperPainter oldDelegate) {
    return oldDelegate.value != value;
  }
}
