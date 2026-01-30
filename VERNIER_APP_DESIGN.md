# Vernier Caliper Practice App Design

## App Flow Structure

1.  **Splash Screen**: App Logo & "Made for ITI/Mechanical Students".
2.  **Language Selection**: English / Hindi (Hinglish).
3.  **Home Screen**:
    *   **Start Practice**: Random measurement challenges.
    *   **Take Test**: Timed exam mode (simulated).
    *   **Tutorial**: "How to Read Vernier Caliper" (Static or interactive guide).
    *   **History/Stats**: Progress tracking.
    *   **Settings**: Dark mode toggle, sound.
4.  **Practice Mode**:
    *   Select Type: Outside Dia, Inside Dia, Depth, Step (Visual change in caliper image, logic remains same).
    *   Select Difficulty: Beginner (Grid lines helper), Expert (No helpers).
    *   **Simulation Screen**:
        *   Top: Vernier Caliper simulation (Slide to measure or View given measurement).
        *   Middle: Zoom View of Vernier Scale.
        *   Bottom: Input Reading (MSR, VSR, Total).
        *   Check Answer Button.
    *   **Result Dialog**: Correct/Wrong with "Show Solution" button.
5.  **Solution Screen**: Step-by-step breakdown of the current reading.

## UI Screen List

*   `SplashScreen`
*   `LanguageSelectionScreen`
*   `HomeScreen`
*   `PracticeConfigScreen` (Type/Difficulty)
*   `PracticeScreen` (The main game loop)
*   `TestScreen` (Similar to Practice but with timer and no immediate feedback)
*   `ResultScreen` (For Tests)
*   `TutorialScreen`

## Vernier Scale Logic Explanation

The Vernier Caliper has two scales:
1.  **Main Scale (MS)**: Fixed scale. Each division = 1 mm.
2.  **Vernier Scale (VS)**: Sliding scale.

**Least Count (LC)**:
*   Standard 50-division Vernier Caliper.
*   49 Main Scale Divisions (49 mm) are divided into 50 Vernier Scale Divisions.
*   1 MSD = 1 mm.
*   1 VSD = 49/50 mm = 0.98 mm.
*   LC = 1 MSD - 1 VSD = 1 mm - 0.98 mm = 0.02 mm.

**Reading Calculation**:
Let `Value` be the actual physical distance (e.g., 24.36 mm).

1.  **Main Scale Reading (MSR)**:
    *   The mark on the Main Scale just to the left of the Vernier Scale zero.
    *   `MSR = floor(Value)` (Integer part in mm).
    *   Example: `floor(24.36) = 24 mm`.

2.  **Vernier Scale Reading (VSR)**:
    *   The division on the Vernier Scale that coincides exactly with *any* mark on the Main Scale.
    *   `Remainder = Value - MSR` (e.g., 0.36 mm).
    *   `VSD_Index = round(Remainder / LC)`.
    *   `VSD_Index = round(0.36 / 0.02) = 18`.
    *   So, the 18th line on the Vernier Scale coincides with a Main Scale line.

**Formula**:
`Total Reading = MSR + (VSR_Index * LC)`

**App Logic**:
*   Generate a random `Value` that is a multiple of LC (0.02).
*   Range: 0.00 mm to 150.00 mm.
*   Example: Random integer `N` between 0 and 7500. `Value = N * 0.02`.
*   Draw the Vernier scale offset by `Value` pixels (scaled by DPI).

## Sample Practice Question

**Problem**:
The Vernier Caliper shows the following alignment:
*   Main Scale zero is past the 15 mm mark but not yet at 16 mm.
*   The 24th division of the Vernier scale aligns perfectly with a Main Scale division.
*   Least Count = 0.02 mm.

**User Task**:
Calculate the reading.

**Step-by-Step Solution**:
1.  **Identify MSR**:
    *   Zero of Vernier is past 15 mm.
    *   **MSR = 15 mm**.
2.  **Identify VSR**:
    *   Coinciding division is 24.
    *   **VSR = 24**.
3.  **Calculate Extra Length**:
    *   Extra = VSR × LC
    *   Extra = 24 × 0.02 mm = 0.48 mm.
4.  **Final Reading**:
    *   Reading = MSR + Extra
    *   Reading = 15 + 0.48 = **15.48 mm**.

## Code Logic (Dart/Flutter Snippet)

```dart
class VernierCaliper {
  static const double leastCount = 0.02;

  // Generate random measurement
  double generateMeasurement() {
    int steps = Random().nextInt(5000); // 0 to 100mm approx
    return double.parse((steps * leastCount).toStringAsFixed(2));
  }

  // Calculate MSR and VSR from value
  Map<String, int> getReadings(double value) {
    int msr = value.floor();
    // Use epsilon for float comparison safety
    int vsr = ((value - msr) / leastCount).round();
    return {'MSR': msr, 'VSR': vsr};
  }
}
```
