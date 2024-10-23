document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let selectedLanguage = null;

    // Scores for each personality (bird type)
    let weaverScore = 0, pelicanScore = 0, flycatcherScore = 0, owlScore = 0;
    let crowScore = 0, craneScore = 0, parakeetScore = 0, eagleScore = 0, pigeonScore = 0;

    // English questions
    const englishQuestions = [
        { question: "You start your journey over the seashore. Dark clouds roll in fast. You...", choices: ["Imma start anyways - gotta get there before the other birds do", "Nah, no need to mess up my feathers. I’ll find a safe detour"], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
        { question: "As you reach the mangroves, your wings feel heavy with unease. You decide to...", choices: ["Press on. Nothing like a challenge to shake off the nerves", "Rest first. Everything else is less important than your wellbeing"], weights: [{ flycatcherScore: 1 }, { owlScore: 1 }] },
        { question: "You see a fellow bird trapped and calling for help. What's your move?", choices: ["I’m not leaving anyone behind - I’ll free the poor bird", "Hold up… is this a trap for me too?"], weights: [{ pelicanScore: 1 }, { craneScore: 1 }] },
        { question: "Flying further, you spot farmers catching pests in a rice paddy. You...", choices: ["Free snacks?? Imma help catch a grasshopper or two", "Observe if the farmers are friends or not before making any move"], weights: [{ pelicanScore: 1 }, { crowScore: 1 }] },
        { question: "Tired from the trip, you find a cozy wetland to rest and...", choices: ["Clear your mind to relax and enjoy the tranquility of the lush scenery", "Make sure you have the place all to yourself as you need some me-time"], weights: [{ pigeonScore: 1 }, { owlScore: 1 }] },
        { question: "You wake up from your short-lived nap to the cry of a vulnerable brood of hatchlings. You...", choices: ["Stay around to keep dangers away and make sure the hatchlings are fed", "They take a liking to you immediately (as expected since you're always counted on)"], weights: [{ eagleScore: 1 }, { craneScore: 1 }] },
        { question: "You feel a sense of danger approaching, probably some traffickers or predators. You decide to...", choices: ["Fight off the danger vigorously like a champ", "Poop on the intruders for fun (cuz ur a bird, duh)"], weights: [{ eagleScore: 1 }, { parakeetScore: 1 }] },
        { question: "The hatchlings are safe. Next on your journey, you pass a dried-up former marsh and...", choices: ["Let’s get a restoration plan going ASAP - this needs fixing!", "Wow, this is... depressing. I need to sit and reflect on it."], weights: [{ weaverScore: 1 }, { owlScore: 1 }] },
        { question: "Soon, the wind grows strong as you near a rocky hillside. Your call is to...", choices: ["Wind? Bring it on! Nothing can stop me!", "Maybe waiting it out is smarter—why fight nature?"], weights: [{ eagleScore: 1 }, { craneScore: 1 }] },
        { question: "In the distance, a waterfall appears. You then...", choices: ["Fly downstream to the river to admire your beauty in the water", "Fly around it for a more peaceful journey"], weights: [{ flycatcherScore: 1 }, { pigeonScore: 1 }] },
        { question: "The nearby riverbanks are bustling with life. Suddenly you see some wild animals quarrel. You...", choices: ["Twerk to divert the tension and start an impromptu dance-off", "Effortlessly stop the fight and make peace among them"], weights: [{ parakeetScore: 1 }, { pigeonScore: 1 }] },
        { question: "Up ahead is a polluted canal, you see volunteers cleaning up debris as you're flying over. You...", choices: ["Join in to help to the best of your possibility", "Watch from afar, curious about their approach"], weights: [{ pelicanScore: 1 }, { crowScore: 1 }] },
        { question: "Not long after your departure, a forest full of food appears. What do you do?", choices: ["Gather food and plan ahead - you’ll need it for later", "Enjoy the present - why worry so much about the future?"], weights: [{ weaverScore: 1 }, { parakeetScore: 1 }] },
        { question: "As the sun sets, you reflect on your journey. What now?", choices: ["Think about how to do better next time", "Feel proud of everything you've achieved so far"], weights: [{ weaverScore: 1 }, { flycatcherScore: 1 }] },
    ];

    // Vietnamese questions
    const vietnameseQuestions = [
        { question: "Bạn chuẩn bị xuất phát từ bờ biển nhưng chợt thấy mây đen kéo. Bạn...", choices: ["Kệ - dân chơi không sợ mưa rơi", "Thôi khoải. Tìm đường khác an toàn hơn nè"], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
        { question: "Bay đến rừng ngập mặn thì thấy hơi mỏi nách (´〜｀*). Bạn quyết định...", choices: ["Cứ bay tiếp thôi. Càng thử thách càng vui", "Nghỉ ngơi tí đã. Sức khỏe mình mới là quan trọng nhất"], weights: [{ flycatcherScore: 1 }, { owlScore: 1 }] },
        { question: "Sau đó, bạn bắt gặp một con chim khác bị mắc kẹt và kêu cứu. Bạn nghĩ...", choices: ["Không thể bỏ rơi ai được - phải cứu bé chim đáng thương này", "Khoan đã… có khi nào là bẫy mình luôn không ta?"], weights: [{ pelicanScore: 1 }, { craneScore: 1 }] },
        { question: "Bay một đoạn nữa, bạn thấy các cô chú nông dân đang bắt sâu dưới ruộng lúa. Bạn nghĩ...", choices: ["Woaa thơm phức dí hà. Phải xuống bắt phụ mấy con sâu béo bở th", "Quan sát xem mấy bác nông dân có thiện chí hông đã"], weights: [{ pelicanScore: 1 }, { crowScore: 1 }] },
        { question: "Bắt đầu thấy mệt mỏi, bạn quyết định dừng chân tại một vùng đất ngập nước và...", choices: ["Thư giãn đầu óc và tận hưởng không khí xanh mướt", "Kiểm tra xem có ai gần đó không vì bạn cần một chill một mình"], weights: [{ pigeonScore: 1 }, { owlScore: 1 }] },
        { question: "Chợp mắt không bao lâu thì bạn bị tiếng khóc của mấy bé chim non yếu ớt đánh thức. Bạn...", choices: ["Bạn ở lại bảo vệ và kiếm ít mồi cho tụi nhỏ luôn cho chắc ăn", "Bỗng tụi nhỏ quấn bạn như người nhà (dễ hiểu thôi vì ai cũng tin tưởng bạn mà)"], weights: [{ eagleScore: 1 }, { craneScore: 1 }] },
        { question: "Bạn cảm nhận được nguy hiểm đang đến gần, có thể là thợ săn hoặc thú dữ. Bạn quyết định…", choices: ["Chiến đấu hết mình như một nhà vô địch", "Ỉa lên đầu kẻ xâm nhập cho vui"], weights: [{ eagleScore: 1 }, { parakeetScore: 1 }] },
        { question: "Đàn chim non đã an toàn. Tiếp đến, bạn bay qua một đầm lầy khô cạn và nghĩ...", choices: ["Ê không ổn, phải lên kế hoạch bảo tồn khu này liền", "Ủa trời, buồn ghê… Ngồi suy ngẫm tí đã"], weights: [{ weaverScore: 1 }, { owlScore: 1 }] },
        { question: "Bay một đoạn nữa thì trời nổi gió. Bạn nghĩ…", choices: ["Có tí gió sao cản được mình!", "Chờ tí gió sẽ lặng - chống lại thiên nhiên làm gì"], weights: [{ eagleScore: 1 }, { craneScore: 1 }] },
        { question: "Ở đằng xa, bạn nghe tiếng thác đổ rì rào. Bạn liền...", choices: ["Bay xuống chân thác để nhìn ngắm vẻ đẹp của mình trong làn nước", "Bay đường vòng tránh để con thác đổ"], weights: [{ flycatcherScore: 1 }, { pigeonScore: 1 }] },
        { question: "Bờ sông gần đó đang nhộn nhịp sự sống. Bỗng bạn thấy vài con thú hoang cãi nhau. Bạn…", choices: ["Nhảy dolce để xua tan bầu không khí căng thẳng", "Nhẹ nhàng giảng hòa đôi bên"], weights: [{ parakeetScore: 1 }, { pigeonScore: 1 }] },
        { question: "Phía trước là một con kênh ô nhiễm, bạn thấy tình nguyện viên đang dọn rác khi bay qua. Bạn…", choices: ["Nhảy vô phụ giúp hết sức có thể", "Đứng xa xa quan sát cách họ làm việc"], weights: [{ pelicanScore: 1 }, { crowScore: 1 }] },
        { question: "Sau đó, bạn rời đi và bay tiếp. Rồi lại xuất hiện một khu rừng với đầy thức ăn. Bạn quyết định...", choices: ["Tích trữ đồ ăn và lập kế hoạch ăn uống", "Enjoy cái moment này - lo xa chi cho mệt"], weights: [{ weaverScore: 1 }, { parakeetScore: 1 }] },
        { question: "Mặt trời bắt đầu lặn, bạn nhìn lại hành trình vừa qua và nghĩ...", choices: ["Nghĩ cách để lần sau làm tốt hơn nữa", "Tự hào về tất cả những gì mình đã đạt được"], weights: [{ weaverScore: 1 }, { flycatcherScore: 1 }] },
    ];

    // Bird matches
    const birdMatches = {
        weaver: ["parakeet", "owl"],
        pelican: ["owl", "eagle"],
        flycatcher: ["crane", "pigeon"],
        owl: ["weaver", "pelican"],
        crow: ["parakeet", "eagle"],
        crane: ["pigeon", "flycatcher"],
        parakeet: ["weaver", "crow"],
        eagle: ["crow", "pelican"],
        pigeon: ["crane", "flycatcher"]
    };

    // Function to display the current question
    function displayCurrentQuestion() {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];

        const questionElement = document.getElementById('question');
        const choicesContainer = document.getElementById('choices');

        choicesContainer.innerHTML = ''; // Clear previous choices
        questionElement.textContent = currentQuestion.question; // Set the question text

        // Create buttons for each choice
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            button.addEventListener('click', () => handleChoiceClick(index));
            choicesContainer.appendChild(button);
        });

        document.getElementById('done-button').style.display = 'none';
    }

    // Handle choice selection
    function handleChoiceClick(choiceIndex) {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoiceWeight = currentQuestion.weights[choiceIndex];

        // Update scores based on the selected choice
        weaverScore += selectedChoiceWeight.weaverScore || 0;
        pelicanScore += selectedChoiceWeight.pelicanScore || 0;
        flycatcherScore += selectedChoiceWeight.flycatcherScore || 0;
        owlScore += selectedChoiceWeight.owlScore || 0;
        crowScore += selectedChoiceWeight.crowScore || 0;
        craneScore += selectedChoiceWeight.craneScore || 0;
        parakeetScore += selectedChoiceWeight.parakeetScore || 0;
        eagleScore += selectedChoiceWeight.eagleScore || 0;
        pigeonScore += selectedChoiceWeight.pigeonScore || 0;

        document.getElementById('done-button').style.display = 'block';
    }

    // Handle the 'Done' button click
    document.getElementById('done-button').addEventListener('click', () => {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {
            calculateEnneagramType();
        }
    });

    // Function to calculate and display the personality result
    function calculateEnneagramType() {
        const results = [
            { type: "weaver", score: weaverScore },
            { type: "pelican", score: pelicanScore },
            { type: "flycatcher", score: flycatcherScore },
            { type: "owl", score: owlScore },
            { type: "crow", score: crowScore },
            { type: "crane", score: craneScore },
            { type: "parakeet", score: parakeetScore },
            { type: "eagle", score: eagleScore },
            { type: "pigeon", score: pigeonScore }
        ];

        // Sort results by score to determine dominant type (personality) and second-highest (match)
        results.sort((a, b) => b.score - a.score);
        const topResult = results[0];  // This is the personality
        const secondResult = results[1];  // This is the best match

        // Fetch matches for the topResult (personality)
        const potentialMatches = birdMatches[topResult.type];
        const birdMatch = potentialMatches.includes(secondResult.type) ? secondResult.type : potentialMatches[0];

        // Set the language for the result images
        const languagePrefix = selectedLanguage === 'english' ? 'eng' : 'vie';

        // Display persona and match images side by side
        const personaImage = document.createElement('img');
        const matchImage = document.createElement('img');
        personaImage.src = `${languagePrefix}-persona-${topResult.type}.png`;
        matchImage.src = `${languagePrefix}-match-${birdMatch}.png`;
        personaImage.alt = `Your personality is ${topResult.type}`;
        matchImage.alt = `Your match is ${birdMatch}`;

        // Clear any previous results
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = '';

        // Append both persona and match images
        resultContainer.appendChild(personaImage);
        resultContainer.appendChild(matchImage);

        // Display the result container
        document.getElementById('result-container').style.display = 'block';

        // Set up the download button
        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.style.display = 'block';
        downloadBtn.href = personaImage.src;  // Allow downloading the persona image
    }

    // Handle language selection
    document.querySelectorAll('.language-button').forEach(button => {
        button.addEventListener('click', (event) => {
            selectedLanguage = event.target.dataset.language;
            document.getElementById('language-selection').style.display = 'none'; // Hide language selection
            document.getElementById('question-container').style.display = 'block'; // Show question container
            displayCurrentQuestion(); // Start the quiz
        });
    });
});
