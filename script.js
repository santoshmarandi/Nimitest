document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const feedbackEl = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');
    const progressEl = document.getElementById('progress');
    const progressTextEl = document.getElementById('progress-text');

    // Controls
    const vowelsCheckbox = document.getElementById('vowels-checkbox');
    const consonantsCheckbox = document.getElementById('consonants-checkbox');
    const matrasCheckbox = document.getElementById('matras-checkbox');
    const signsCheckbox = document.getElementById('signs-checkbox');
    const resetProgressBtn = document.getElementById('reset-progress-btn');

    let allCharacters = [];
    let activeCharacters = [];
    let currentQuestion = {};
    let progress = {}; // { 'character_hindi': { correct: 0, incorrect: 0, last_seen: null, streak: 0 } }
    let characterPool = [];

    const CORRECT_STREAK_THRESHOLD = 3; // Times a character needs to be answered correctly in a row to be "learned"
    const NEW_CHARACTER_BATCH_SIZE = 5; // Number of new characters to introduce at a time
    const REVISIT_INCORRECT_WEIGHT = 5; // How much to prioritize characters answered incorrectly

    // Fetch character data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allCharacters = [
                ...data.vowels.map(c => ({...c, type: 'vowels'})),
                ...data.consonants.map(c => ({...c, type: 'consonants'})),
                ...data.matras.map(c => ({...c, type: 'matras'})),
                ...data.signs.map(c => ({...c, type: 'signs'}))
            ];
            loadProgress();
            updateActiveCharacters();
            if(activeCharacters.length > 0) {
                generateCharacterPool();
                displayNextQuestion();
            } else {
                feedbackEl.textContent = "Please select a character type to begin.";
            }
        });

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextBtn.classList.add('hidden');
        feedbackEl.textContent = '';
        displayNextQuestion();
    });

    [vowelsCheckbox, consonantsCheckbox, matrasCheckbox, signsCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateActiveCharacters();
            generateCharacterPool();
            if(activeCharacters.length > 0) displayNextQuestion();
        });
    });

    resetProgressBtn.addEventListener('click', () => {
        if(confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
            progress = {};
            saveProgress();
            generateCharacterPool();
            displayNextQuestion();
            updateProgressDisplay();
        }
    });

    function updateActiveCharacters() {
        const selectedTypes = [];
        if (vowelsCheckbox.checked) selectedTypes.push('vowels');
        if (consonantsCheckbox.checked) selectedTypes.push('consonants');
        if (matrasCheckbox.checked) selectedTypes.push('matras');
        if (signsCheckbox.checked) selectedTypes.push('signs');

        activeCharacters = allCharacters.filter(c => selectedTypes.includes(c.type));
    }

    function displayNextQuestion() {
        if (characterPool.length === 0) {
            questionEl.textContent = '🎉';
            optionsEl.innerHTML = '';
            feedbackEl.textContent = "Congratulations! You've mastered the current set. Add more character types or reset to practice again.";
            return;
        }

        // Pick a character from the pool
        const questionIndex = Math.floor(Math.random() * characterPool.length);
        currentQuestion = characterPool[questionIndex];

        // Update question display
        questionEl.textContent = currentQuestion.hindi;

        // Generate options
        const options = generateOptions(currentQuestion);
        optionsEl.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.bengali;
            button.classList.add('option-btn');
            button.onclick = () => handleAnswer(option, button);
            optionsEl.appendChild(button);
        });
    }

    function generateOptions(correctAnswer) {
        let options = [correctAnswer];
        let distractors = activeCharacters.filter(c => c.hindi !== correctAnswer.hindi);

        while (options.length < 4 && distractors.length > 0) {
            const distractorIndex = Math.floor(Math.random() * distractors.length);
            const distractor = distractors.splice(distractorIndex, 1)[0];
            options.push(distractor);
        }

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    }

    function handleAnswer(selectedOption, button) {
        // Disable all buttons after an answer
        const buttons = optionsEl.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        const charProgress = progress[currentQuestion.hindi];

        if (selectedOption.hindi === currentQuestion.hindi) {
            button.classList.add('correct');
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = 'var(--success-color)';
            charProgress.correct++;
            charProgress.streak++;
        } else {
            button.classList.add('incorrect');
            feedbackEl.textContent = `Incorrect. The correct answer is ${currentQuestion.bengali}.`;
            feedbackEl.style.color = 'var(--danger-color)';
            charProgress.incorrect++;
            charProgress.streak = 0; // Reset streak on incorrect answer

            // Highlight the correct answer
            buttons.forEach(btn => {
                if (btn.textContent === currentQuestion.bengali) {
                    btn.classList.add('correct');
                }
            });
        }

        charProgress.last_seen = Date.now();
        saveProgress();
        updateProgressDisplay();
        generateCharacterPool(); // Regenerate pool to reflect recent answer

        nextBtn.classList.remove('hidden');
    }

    // --- Progress and Adaptive Learning ---

    function loadProgress() {
        const savedProgress = localStorage.getItem('bengaliLearnerProgress');
        if (savedProgress) {
            progress = JSON.parse(savedProgress);
        }
        // Ensure all characters have a progress entry
        allCharacters.forEach(char => {
            if (!progress[char.hindi]) {
                progress[char.hindi] = { correct: 0, incorrect: 0, streak: 0, last_seen: null };
            }
        });
    }

    function saveProgress() {
        localStorage.setItem('bengaliLearnerProgress', JSON.stringify(progress));
    }

    function generateCharacterPool() {
        const learnedCharacters = activeCharacters.filter(char => {
            const p = progress[char.hindi];
            return p.streak >= CORRECT_STREAK_THRESHOLD && p.incorrect === 0;
        });

        const unlearnedCharacters = activeCharacters.filter(char => !learnedCharacters.includes(char));

        let practiceSet = unlearnedCharacters.filter(char => progress[char.hindi].last_seen !== null);
        let newCharacters = unlearnedCharacters.filter(char => progress[char.hindi].last_seen === null);

        // Add a batch of new characters if needed
        if (practiceSet.length < 10 && newCharacters.length > 0) {
            practiceSet.push(...newCharacters.slice(0, NEW_CHARACTER_BATCH_SIZE));
        }

        // If everything is learned, just practice all active characters
        if(practiceSet.length === 0 && learnedCharacters.length > 0) {
            characterPool = [...activeCharacters];
            return;
        }

        // Create a weighted pool to prioritize difficult characters
        characterPool = [];
        practiceSet.forEach(char => {
            const p = progress[char.hindi];
            // Add character to the pool multiple times based on incorrect answers
            const weight = p.incorrect * REVISIT_INCORRECT_WEIGHT + 1;
            for (let i = 0; i < weight; i++) {
                characterPool.push(char);
            }
        });

        if (characterPool.length === 0 && newCharacters.length > 0) {
            characterPool.push(...newCharacters.slice(0, NEW_CHARACTER_BATCH_SIZE));
        } else if (characterPool.length === 0 && activeCharacters.length > 0) {
            // Fallback in case something goes wrong, or everything is perfectly learned
            characterPool = [...activeCharacters];
        }
    }

    function updateProgressDisplay() {
        const learnedCount = Object.values(progress).filter(p => p.streak >= CORRECT_STREAK_THRESHOLD).length;
        const totalCount = allCharacters.length;
        const percentage = totalCount > 0 ? (learnedCount / totalCount) * 100 : 0;

        progressEl.style.width = `${percentage}%`;
        progressTextEl.textContent = `${Math.round(percentage)}% Complete`;
    }

});
