document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next-question');

    let currentQuestion = {};
    let acceptingAnswers = true;

    // Fetch questions from the API
    const fetchQuestion = async () => {
        try {
            const response = await fetch('https://the-trivia-api.com/v2/questions');
            const data = await response.json();
            return data[0]; // Get the first question from the array
        } catch (error) {
            console.error("Error fetching trivia question:", error);
        }
    };

    // Display the question and choices
    const displayQuestion = (questionData) => {
        currentQuestion = questionData;
        acceptingAnswers = true;

        questionElement.innerText = questionData.question.text;
        choicesElement.innerHTML = '';

        const allChoices = [...questionData.incorrectAnswers, questionData.correctAnswer].sort(() => Math.random() - 0.5);

        allChoices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice;
            button.addEventListener('click', () => selectAnswer(choice));
            choicesElement.appendChild(button);
        });
    };

    // Handle answer selection
    const selectAnswer = (selectedAnswer) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        resultElement.innerText = isCorrect ? 'Correct!' : `Wrong! Correct answer: ${currentQuestion.correctAnswer}`;
        nextButton.style.display = 'block';
    };

    // Load the next question
    const loadNextQuestion = async () => {
        nextButton.style.display = 'none';
        resultElement.innerText = '';
        const questionData = await fetchQuestion();
        displayQuestion(questionData);
    };

    // Initialize the quiz
    loadNextQuestion();

    // Set up next button listener
    nextButton.addEventListener('click', loadNextQuestion);
});
