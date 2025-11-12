// Обновленный тест про котиков с личностным результатом
const catQuiz = {
    id: 'cat-quiz',
    title: "Тест: Какой ты котик?",
    questions: [
        {
            text: "Какой твой идеальный выходной?",
            options: [
                { text: "Спать до обеда, потом смотреть сериалы", score: { lazy: 2, playful: 0, hunter: 0, independent: 1 } },
                { text: "Активные игры и развлечения с друзьями", score: { lazy: 0, playful: 2, hunter: 1, independent: 0 } },
                { text: "Исследовать новые места и знакомиться", score: { lazy: 0, playful: 1, hunter: 2, independent: 1 } },
                { text: "Уединение и спокойный отдых в одиночестве", score: { lazy: 1, playful: 0, hunter: 0, independent: 2 } }
            ]
        },
        {
            text: "Как ты реагируешь на неожиданные события?",
            options: [
                { text: "Спокойно принимаю и адаптируюсь", score: { lazy: 2, playful: 0, hunter: 1, independent: 1 } },
                { text: "Сразу бросаюсь исследовать что случилось", score: { lazy: 0, playful: 2, hunter: 2, independent: 0 } },
                { text: "Настороженно наблюдаю со стороны", score: { lazy: 1, playful: 0, hunter: 1, independent: 2 } },
                { text: "Ищу развлечение в этой ситуации", score: { lazy: 0, playful: 2, hunter: 0, independent: 1 } }
            ]
        },
        {
            text: "Что для тебя важно в отношениях?",
            options: [
                { text: "Комфорт и стабильность", score: { lazy: 2, playful: 1, hunter: 0, independent: 0 } },
                { text: "Веселье и совместные приключения", score: { lazy: 0, playful: 2, hunter: 1, independent: 0 } },
                { text: "Свобода и личное пространство", score: { lazy: 1, playful: 0, hunter: 0, independent: 2 } },
                { text: "Совместные цели и достижения", score: { lazy: 0, playful: 1, hunter: 2, independent: 1 } }
            ]
        },
        {
            text: "Твой подход к работе/учебе?",
            options: [
                { text: "Работаю в своем комфортном темпе", score: { lazy: 2, playful: 0, hunter: 0, independent: 1 } },
                { text: "Превращаю все в игру и развлечение", score: { lazy: 0, playful: 2, hunter: 1, independent: 0 } },
                { text: "Ставлю цели и активно их достигаю", score: { lazy: 0, playful: 1, hunter: 2, independent: 1 } },
                { text: "Работаю самостоятельно, без контроля", score: { lazy: 1, playful: 0, hunter: 0, independent: 2 } }
            ]
        }
    ],
    results: {
        lazy: {
            title: "🐱 Ленивый котик",
            description: "Ты - воплощение уюта и расслабленности! Ты ценишь комфорт превыше всего и умеешь наслаждаться каждым моментом покоя. Твоя философия - жизнь слишком коротка, чтобы спешить."
        },
        playful: {
            title: "🎭 Игривый котик", 
            description: "Ты - вечный ребенок с огромным запасом энергии! Ты превращаешь рутину в игру и находишь радость в мелочах. С тобой никогда не скучно, ты заряжаешь оптимизмом всех вокруг."
        },
        hunter: {
            title: "🎯 Котик-охотник",
            description: "Ты - целеустремленный и активный исследователь! Тебе важно достигать целей и покорять новые высоты. Ты быстро принимаешь решения и всегда готов к приключениям."
        },
        independent: {
            title: "👑 Независимый котик",
            description: "Ты - самодостаточная и мудрая личность! Ты ценишь свою свободу и умеешь наслаждаться одиночеством. Ты идешь по жизни своим путем и не зависишь от мнения окружающих."
        }
    }
};

// Глобальные переменные
let currentQuestion = 0;
let userAnswers = [];
let questionCount = 0;
let currentQuiz = null;
let isCustomQuiz = false;

// Навигация по страницам
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showMainMenu() {
    showPage('main-menu');
}

function showQuiz() {
    showPage('quiz-page');
    loadQuiz(catQuiz);
    isCustomQuiz = false;
}

function showCreateQuiz() {
    showPage('create-quiz');
}

function showMyQuizzes() {
    showPage('my-quizzes');
    loadMyQuizzes();
}

// Работа с тестом
function loadQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestion = 0;
    userAnswers = new Array(quiz.questions.length).fill(null);
    isCustomQuiz = quiz.id !== 'cat-quiz';
    
    document.getElementById('quiz-title').textContent = quiz.title;
    displayQuestion();
}

function displayQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const question = currentQuiz.questions[currentQuestion];
    
    let html = `
        <div class="question">
            <h3>Вопрос ${currentQuestion + 1} из ${currentQuiz.questions.length}</h3>
            <p>${question.text}</p>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        const isSelected = userAnswers[currentQuestion] === index;
        const optionText = isCustomQuiz ? option : option.text;
        html += `
            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectOption(${index})">
                ${optionText}
            </div>
        `;
    });
    
    html += `</div></div>`;
    
    quizContent.innerHTML = html;
    
    // Обновляем кнопки навигации
    document.getElementById('prev-btn').style.display = currentQuestion === 0 ? 'none' : 'block';
    document.getElementById('next-btn').textContent = 
        currentQuestion === currentQuiz.questions.length - 1 ? 'Завершить' : 'Далее';
        
    document.getElementById('prev-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    displayQuestion();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < currentQuiz.questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContent = document.getElementById('quiz-content');
    
    if (isCustomQuiz) {
        // Для пользовательских тестов - простой подсчет
        const score = userAnswers.filter(answer => answer !== null).length;
        const totalQuestions = currentQuiz.questions.length;
        
        quizContent.innerHTML = `
            <div class="results-container">
                <h3>Результаты теста!</h3>
                <div class="score">${score}/${totalQuestions}</div>
                <p>Вы ответили на ${score} из ${totalQuestions} вопросов</p>
                <button class="action-btn" onclick="loadQuiz(currentQuiz)" style="margin-top: 1rem;">
                    Пройти еще раз
                </button>
                <button class="action-btn" onclick="showMainMenu()" style="margin-top: 1rem;">
                    В главное меню
                </button>
            </div>
        `;
    } else {
        // Для теста про котиков - личностный результат
        const personality = calculatePersonality();
        const result = currentQuiz.results[personality.type];
        
        quizContent.innerHTML = `
            <div class="results-container">
                <h3>Твой результат!</h3>
                <div class="personality-result">
                    <div class="personality-title">${result.title}</div>
                    <div class="personality-description">${result.description}</div>
                </div>
                <div class="score">${Math.round(personality.percentage)}% совпадение</div>
                <button class="action-btn" onclick="loadQuiz(currentQuiz)" style="margin-top: 1rem;">
                    Пройти еще раз
                </button>
                <button class="action-btn" onclick="showMainMenu()" style="margin-top: 1rem;">
                    В главное меню
                </button>
            </div>
        `;
    }
    
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function calculatePersonality() {
    const scores = { lazy: 0, playful: 0, hunter: 0, independent: 0 };
    let totalScore = 0;
    
    userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex !== null) {
            const option = currentQuiz.questions[questionIndex].options[answerIndex];
            Object.keys(option.score).forEach(type => {
                scores[type] += option.score[type];
                totalScore += option.score[type];
            });
        }
    });
    
    // Находим доминирующий тип
    let maxScore = 0;
    let personalityType = 'lazy';
    
    Object.keys(scores).forEach(type => {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            personalityType = type;
        }
    });
    
    const percentage = totalScore > 0 ? (maxScore / totalScore) * 100 : 0;
    
    return { type: personalityType, percentage: percentage };
}

// Создание теста
function addQuestion() {
    questionCount++;
    const questionsContainer = document.getElementById('questions-container');
    
    const questionHtml = `
        <div class="question-item" id="question-${questionCount}">
            <input type="text" class="form-input question-text" placeholder="Текст вопроса">
            
            <div class="options-container" id="options-${questionCount}">
                <div class="option-input">
                    <input type="text" class="form-input option-text" placeholder="Вариант ответа">
                    <button type="button" class="remove-btn" onclick="removeOption(this)">✕</button>
                </div>
            </div>
            
            <button type="button" class="action-btn" onclick="addOption(${questionCount})" style="margin: 0.5rem 0;">
                + Добавить вариант
            </button>
            <button type="button" class="remove-btn" onclick="removeQuestion(${questionCount})">
                Удалить вопрос
            </button>
        </div>
    `;
    
    questionsContainer.insertAdjacentHTML('beforeend', questionHtml);
}

function addOption(questionId) {
    const optionsContainer = document.getElementById(`options-${questionId}`);
    
    const optionHtml = `
        <div class="option-input">
            <input type="text" class="form-input option-text" placeholder="Вариант ответа">
            <button type="button" class="remove-btn" onclick="removeOption(this)">✕</button>
        </div>
    `;
    
    optionsContainer.insertAdjacentHTML('beforeend', optionHtml);
}

function removeOption(button) {
    button.parentElement.remove();
}

function removeQuestion(questionId) {
    document.getElementById(`question-${questionId}`).remove();
}

function saveQuiz() {
    const title = document.getElementById('quiz-title-input').value;
    const questions = [];
    
    document.querySelectorAll('.question-item').forEach(item => {
        const questionText = item.querySelector('.question-text').value;
        const options = [];
        
        item.querySelectorAll('.option-text').forEach(optionInput => {
            if (optionInput.value.trim() !== '') {
                options.push(optionInput.value);
            }
        });
        
        if (questionText.trim() !== '' && options.length > 0) {
            questions.push({
                text: questionText,
                options: options
            });
        }
    });
    
    if (title.trim() === '') {
        alert('Введите название теста');
        return;
    }
    
    if (questions.length === 0) {
        alert('Добавьте хотя бы один вопрос');
        return;
    }
    
    const newQuiz = {
        id: 'quiz-' + Date.now(),
        title: title,
        questions: questions,
        createdAt: new Date().toLocaleDateString()
    };
    
    saveQuizToStorage(newQuiz);
    alert('Тест сохранен!');
    
    // Очищаем форму
    document.getElementById('quiz-title-input').value = '';
    document.getElementById('questions-container').innerHTML = '';
    questionCount = 0;
    
    showMyQuizzes();
}

// Сохранение в localStorage
function saveQuizToStorage(quiz) {
    const quizzes = getQuizzesFromStorage();
    quizzes.push(quiz);
    localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
}

function getQuizzesFromStorage() {
    const quizzes = localStorage.getItem('userQuizzes');
    return quizzes ? JSON.parse(quizzes) : [];
}

function loadMyQuizzes() {
    const quizzesList = document.getElementById('quizzes-list');
    const quizzes = getQuizzesFromStorage();
    
    if (quizzes.length === 0) {
        quizzesList.innerHTML = '<p>У вас пока нет созданных тестов</p>';
        return;
    }
    
    quizzesList.innerHTML = quizzes.map(quiz => `
        <div class="quiz-item">
            <div>
                <h3>${quiz.title}</h3>
                <p>Вопросов: ${quiz.questions.length} | Создан: ${quiz.createdAt}</p>
            </div>
            <div class="quiz-actions">
                <button class="action-btn" onclick="startQuiz('${quiz.id}')">Пройти</button>
                <button class="remove-btn" onclick="deleteQuiz('${quiz.id}')">Удалить</button>
            </div>
        </div>
    `).join('');
}

function startQuiz(quizId) {
    const quizzes = getQuizzesFromStorage();
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (quiz) {
        showQuiz();
        loadQuiz(quiz);
        isCustomQuiz = true;
    }
}

function deleteQuiz(quizId) {
    if (confirm('Удалить этот тест?')) {
        const quizzes = getQuizzesFromStorage();
        const filteredQuizzes = quizzes.filter(q => q.id !== quizId);
        localStorage.setItem('userQuizzes', JSON.stringify(filteredQuizzes));
        loadMyQuizzes();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    showMainMenu();
    addQuestion();
});