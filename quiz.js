<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCdY-c6fRT2qcqjTe1JiUNkuHX5xf5cRCg",
    authDomain: "test-3-83dfd.firebaseapp.com",
    databaseURL: "https://test-3-83dfd-default-rtdb.firebaseio.com",
    projectId: "test-3-83dfd",
    storageBucket: "test-3-83dfd.appspot.com",
    messagingSenderId: "208385469603",
    appId: "1:208385469603:web:d2848eb6262394a41da316",
    measurementId: "G-EKVR6CJZVL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let selectedLanguage = null;
    let weaverScore = 0, pelicanScore = 0, flycatcherScore = 0, owlScore = 0;
    let crowScore = 0, craneScore = 0, parakeetScore = 0, eagleScore = 0, pigeonScore = 0;

    // Questions and bird matches as per original code...

    function displayCurrentQuestion() {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];

        const questionElement = document.getElementById('question');
        const choicesContainer = document.getElementById('choices');

        questionElement.textContent = currentQuestion.question;
        choicesContainer.innerHTML = '';

        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choicesContainer.appendChild(button);
        });

        document.getElementById('done-button').style.display = 'block';
    }

    function handleChoiceClick(choiceIndex) {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];

        weaverScore += selectedChoiceWeight.weaverScore || 0;
        pelicanScore += selectedChoiceWeight.pelicanScore || 0;
        flycatcherScore += selectedChoiceWeight.flycatcherScore || 0;
        owlScore += selectedChoiceWeight.owlScore || 0;
        crowScore += selectedChoiceWeight.crowScore || 0;
        craneScore += selectedChoiceWeight.craneScore || 0;
        parakeetScore += selectedChoiceWeight.parakeetScore || 0;
        eagleScore += selectedChoiceWeight.eagleScore || 0;
        pigeonScore += selectedChoiceWeight.pigeonScore || 0;
    }

    document.getElementById('done-button').addEventListener('click', () => {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {
            showNameEntry();
        }
    });

    function showNameEntry() {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('name-entry').style.display = 'block';

        document.getElementById('submit-name').addEventListener('click', () => {
            const testName = document.getElementById('test-taker-name').value.trim();
            if (!testName) {
                alert("Please enter your name.");
                return;
            }
            displayResult(testName);
        });
    }

    function displayResult(testTakerName) {
        const results = [
            { type: "weaver", score: weaverScore },
            { type: "pelican", score: pelicanScore },
            // ...add other types and their scores...
        ];

        results.sort((a, b) => b.score - a.score);
        const topResult = results[0];
        const secondResult = results[1];

        const potentialMatches = birdMatches[topResult.type];
        const birdMatch = potentialMatches.includes(secondResult.type) ? secondResult.type : potentialMatches[0];

        const languagePrefix = selectedLanguage === 'english' ? 'eng' : 'vie';
        overlayNameOnImage(`${languagePrefix}-persona-${topResult.type}.png`, testTakerName, "Persona");
        overlayNameOnImage(`${languagePrefix}-match-${birdMatch}.png`, testTakerName, "Match");

        incrementQuizCompletions();
        getQuizCompletions();
    }

    function overlayNameOnImage(imagePath, testTakerName, caption) {
        const resultContainer = document.getElementById("result");
        const resultImage = document.createElement("img");
        resultImage.src = imagePath;
        resultContainer.appendChild(resultImage);
    }

    function incrementQuizCompletions() {
        const completionsRef = ref(database, 'quizCompletions');
        update(completionsRef, { ".value": increment(1) });
    }

    function getQuizCompletions() {
        const completionsRef = ref(database, 'quizCompletions');
        get(completionsRef).then((snapshot) => {
            if (snapshot.exists()) {
                displayCompletionCountOnPhoto(snapshot.val());
            } else {
                displayCompletionCountOnPhoto(0);
            }
        }).catch((error) => {
            console.error("Error retrieving completions:", error);
        });
    }

    function displayCompletionCountOnPhoto(count) {
        const overlayElement = document.getElementById("completionCountOverlay");
        overlayElement.textContent = `Completions: ${count}`;
    }

    document.querySelectorAll('.language-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedLanguage = button.dataset.language;
            document.getElementById('language-selection').style.display = 'none';
            document.getElementById('question-container').style.display = 'block';
            displayCurrentQuestion();
        });
    });
});
