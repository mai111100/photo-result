document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "When faced with confrontations, I tend to:",
            choices: ["Take it head-on", "Avoid it"],
            weights: [
                { challengerScore: 1, peacemakerScore: 0 },
                { challengerScore: 0, peacemakerScore: 1 }
            ]
        },
        {
            question: "In social situations, I'm usually:",
            choices: ["Diplomatic, charming, and ambitious", "Direct, formal, and idealistic"],
            weights: [
                { achieverScore: 1, reformerScore: 0 },
                { achieverScore: 0, reformerScore: 1 }
            ]
        },
        {
            question: "I prefer plans that are:",
            choices: ["Detailed and focused", "Spontaneous and fun"],
            weights: [
                { investigatorScore: 1, enthusiastScore: 0 },
                { investigatorScore: 0, enthusiastScore: 1 }
            ]
        },
        // Add more questions here...
    ];

    let reformerScore = 0, helperScore = 0, achieverScore = 0, individualistScore = 0;
    let investigatorScore = 0, loyalistScore = 0, enthusiastScore = 0, challengerScore = 0, peacemakerScore = 0;
    let currentQuestionIndex = 0;

    // Display the first question
    function displayCurrentQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const choicesContainer = document.getElementById('choices');
        
        // Clear any previous choices
        choicesContainer.innerHTML = '';

        // Set the question text
        questionElement.textContent = currentQuestion.question;

        // Create buttons for each choice
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choicesContainer.appendChild(button);
        });

        // Initially hide the 'Done' button until an answer is selected
        document.getElementById('done-button').style.display = 'none';
    }

    // Handle choice selection
    function handleChoiceClick(choiceIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];

        // Update scores based on the selected choice
        reformerScore += selectedChoiceWeight.reformerScore || 0;
        helperScore += selectedChoiceWeight.helperScore || 0;
        achieverScore += selectedChoiceWeight.achieverScore || 0;
        individualistScore += selectedChoiceWeight.individualistScore || 0;
        investigatorScore += selectedChoiceWeight.investigatorScore || 0;
        loyalistScore += selectedChoiceWeight.loyalistScore || 0;
        enthusiastScore += selectedChoiceWeight.enthusiastScore || 0;
        challengerScore += selectedChoiceWeight.challengerScore || 0;
        peacemakerScore += selectedChoiceWeight.peacemakerScore || 0;

        // Show the 'Done' button after a choice is made
        document.getElementById('done-button').style.display = 'block';
    }

    // Handle the 'Done' button click
    document.getElementById('done-button').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {
            calculateEnneagramType();
        }
    });

    // Function to calculate the Enneagram type based on scores
    function calculateEnneagramType() {
        const results = [
            { type: "Reformer", score: reformerScore, image: "reformer.png" },
            { type: "Helper", score: helperScore, image: "helper.png" },
            { type: "Achiever", score: achieverScore, image: "achiever.png" },
            { type: "Individualist", score: individualistScore, image: "individualist.png" },
            { type: "Investigator", score: investigatorScore, image: "investigator.png" },
            { type: "Loyalist", score: loyalistScore, image: "loyalist.png" },
            { type: "Enthusiast", score: enthusiastScore, image: "enthusiast.png" },
            { type: "Challenger", score: challengerScore, image: "challenger.png" },
            { type: "Peacemaker", score: peacemakerScore, image: "peacemaker.png" }
        ];

        // Sort results by highest score to determine dominant type
        results.sort((a, b) => b.score - a.score);
        const topResult = results[0];

        // Display the result image
        const resultImage = document.createElement('img');
        resultImage.src = topResult.image;  // Assume the images are in the root directory
        resultImage.alt = topResult.type;

        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = '';  // Clear previous content
        resultContainer.appendChild(resultImage);

        // Show the result container
        document.getElementById('result-container').style.display = 'block';

        // Set up the download button
        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.style.display = 'block';
        downloadBtn.href = resultImage.src;
    }

    // Start the quiz by displaying the first question
    displayCurrentQuestion();
});
