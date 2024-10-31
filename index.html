import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get, update, increment } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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
const database = getDatabase(app);

// English and Vietnamese questions
const englishQuestions = [
    { question: "You start your journey over the seashore...", choices: ["Imma start anyways...", "Nah, no need to mess up..."], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
    { question: "Not long after your departure, a forest full of food appears. What do you do?", choices: ["Gather food and plan ahead - you’ll need it for later", "Enjoy the present - why worry so much about the future?"], weights: [{ weaverScore: 1 }, { parakeetScore: 1 }] },
    { question: "As the sun sets, you reflect on your journey. What now?", choices: ["Think about how to do better next time", "Feel proud of everything you've achieved so far"], weights: [{ weaverScore: 1 }, { flycatcherScore: 1 }] },
];

const vietnameseQuestions = [
    { question: "Bạn chuẩn bị xuất phát từ bờ biển...", choices: ["Kệ - dân chơi không sợ...", "Thôi khoải. Tìm đường khác..."], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
    // ...add remaining questions...
];

const birdMatches = {
    weaver: ["parakeet", "owl"],
    pelican: ["owl", "eagle"],
    // ...complete bird matches...
};

let currentQuestionIndex = 0;
let selectedLanguage = null;
let weaverScore = 0, pelicanScore = 0, flycatcherScore = 0, owlScore = 0;
let crowScore = 0, craneScore = 0, parakeetScore = 0, eagleScore = 0, pigeonScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    function displayCurrentQuestion() {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.question;
        const choicesContainer = document.getElementById('choices');
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
        const selectedChoiceWeight = questions[currentQuestionIndex].weights[choiceIndex];
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
        overlayNameOnImage(`${selectedLanguage === 'english' ? 'eng' : 'vie'}-persona-${topResult.type}.png`, testTakerName, "Persona");
        overlayNameOnImage(`${selectedLanguage === 'english' ? 'eng' : 'vie'}-match-${birdMatch}.png`, testTakerName, "Match");
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
            displayCompletionCountOnPhoto(snapshot.exists() ? snapshot.val() : 0);
        }).catch((error) => {
            console.error("Error retrieving completions:", error);
        });
    }

    function displayCompletionCountOnPhoto(count) {
        document.getElementById("completionCountOverlay").textContent = `Completions: ${count}`;
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
