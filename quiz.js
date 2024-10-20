document.addEventListener('DOMContentLoaded', () => {
    function displayQuiz() {
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
            // More questions as needed...
        ];

        // Variables for personality scores
        let reformerScore = 0, helperScore = 0, achieverScore = 0, individualistScore = 0;
        let investigatorScore = 0, loyalistScore = 0, enthusiastScore = 0, challengerScore = 0, peacemakerScore = 0;
        let currentQuestionIndex = 0;

        function displayCurrentQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            const questionElement = document.getElementById('question');
            const choiceContainers = document.getElementById('choices');
            choiceContainers.innerHTML = ''; // Clear previous choices

            questionElement.textContent = currentQuestion.question;
            currentQuestion.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('choices');
                button.addEventListener('click', () => handleChoiceClick(index));
                choiceContainers.appendChild(button);
            });

            document.getElementById('done-button').style.display = 'none';
        }

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

            document.getElementById('done-button').style.display = 'block'; // Show the 'Done' button when choice is made
        }

        document.getElementById('done-button').addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayCurrentQuestion();
            } else {
                calculateEnneagramType();
            }
        });

        // Function to calculate and display the Enneagram type and the most compatible types
        function calculateEnneagramType() {
            const results = [
                { type: "Reformer", score: reformerScore, "reformer.png" },
                { type: "Helper", score: helperScore, image: "helper.png" },
                { type: "Achiever", score: achieverScore, image: "achiever.png" },
                { type: "Individualist", score: individualistScore, image: "individualist.png" },
                { type: "Investigator", score: investigatorScore, image: "investigator.png" },
                { type: "Loyalist", score: loyalistScore, image: "loyalist.png" },
                { type: "Enthusiast", score: enthusiastScore, image: "enthusiast.png" },
                { type: "Challenger", score: challengerScore, image: "challenger.png" },
                { type: "Peacemaker", score: peacemakerScore, image: "peacemaker.png" }
            ];

            // Sort results by highest score to find the dominant type
            results.sort((a, b) => b.score - a.score);

            const topType = results[0].type;
            const imagePath = results[0].image;

            // Display the result image instead of text
            const resultImage = document.createElement('img');
            resultImage.src = `/path-to-images/${imagePath}`;  // Replace with actual image path
            resultImage.alt = topType;

            // Add the image to the result container
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = '';  // Clear any previous content
            resultContainer.appendChild(resultImage);

            // Show result container
            document.getElementById('result-container').style.display = 'block';

            // Show the download button
            const downloadBtn = document.getElementById('download-btn');
            downloadBtn.style.display = 'block';
            downloadBtn.href = resultImage.src; // Direct download link for the image
        }

        // Display the first question when the quiz starts
        displayCurrentQuestion();
    }

    // Run the quiz
    displayQuiz();
});
