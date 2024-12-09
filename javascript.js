const topics = document.getElementById('topics');
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const topicButtons = document.querySelectorAll('.topic-btn');
const quizTopic = document.getElementById('quiz-topic');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreElement = document.getElementById('score');
const totalScoreElement = document.getElementById('total');
const feedbackElement = document.getElementById('feedback');
const percent = document.querySelector('.percent');
const restart = document.getElementById('restart-btn');


let currentTopic = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let feedback;

const quizData = {
    history: [
        {
            question: "Қазақстанның тұңғыш Президенті кім?",
            answers: ["Нұрсұлтан Назарбаев", "Қасым-Жомарт Тоқаев", "Дінмұхамед Қонаев", "Абай Құнанбаев"],
            correct: 0
        },
        {
            question: "Екінші дүниежүзілік соғыс қай жылы аяқталды?",
            answers: ["1941", "1943", "1945", "1947"],
            correct: 2
        },
        {
            question: "Абай Құнанбаев қай ғасырда өмір сүрген?",
            answers: ["XV", "XVI", "XVIII", "XIX"],
            correct: 3
        },
        {
            question: "Ұлы Жібек жолы қай елдер арасында болды?",
            answers: ["Қазақстан мен Ресей", "Қытай мен Орта Азия", "Иран мен Үндістан", "Еуропа мен Америка"],
            correct: 1
        },
        {
            question: "Тәуелсіз Қазақстан қай жылы жарияланды?",
            answers: ["1990", "1991", "1992", "1993"],
            correct: 1
        }
    ],
    science: [
        {
            question: "Алтынның химиялық символы қандай?",
            answers: ["Au", "Ag", "Fe", "Cu"],
            correct: 0
        },
        {
            question: "Күн жүйесіндегі ең үлкен планета қандай?",
            answers: ["Жер", "Марс", "Юпитер", "Сатурн"],
            correct: 2
        },
        {
            question: "Жарық жылдамдығы вакуумде қанша?",
            answers: ["299,792 км/с", "300,000 км/с", "150,000 км/с", "200,000 км/с"],
            correct: 0
        },
        {
            question: "Заттың ең кішкентай бөлшегі не?",
            answers: ["Атом", "Молекула", "Электрон", "Кварк"],
            correct: 3
        },
        {
            question: "Өсімдіктер өз азығын қандай үдеріс арқылы жасайды?",
            answers: ["Фотосинтез", "Тыныс алу", "Ашыту", "Қорыту"],
            correct: 0
        }
    ],
    movies: [
        {
            question: "«Бәйтерек» фильмін кім түсірді?",
            answers: ["Тимур Бекмамбетов", "Ермек Тұрсынов", "Ақан Сатаев", "Шәкен Айманов"],
            correct: 2
        },
        {
            question: "2022 жылы Оскар алған фильм қандай?",
            answers: ["Дюн", "CODA", "Батыс майданында өзгеріс жоқ", "Бэнши Иншерина"],
            correct: 1
        },
        {
            question: "Тони Старктың рөлін кім ойнады?",
            answers: ["Крис Эванс", "Крис Хемсворт", "Роберт Дауни кіші", "Марк Руффало"],
            correct: 2
        },
        {
            question: "«Мұз дәуірі» мультфильмінде басты кейіпкер қалай аталады?",
            answers: ["Скрат", "Манфред", "Сид", "Диего"],
            correct: 0
        },
        {
            question: "«Қазақ хандығы» фильміндегі басты рөлді кім ойнады?",
            answers: ["Ақан Сатаев", "Досхан Жолжақсынов", "Болат Қалымбетов", "Нұржұман Ықтымбаев"],
            correct: 1
        }
    ],
    sports: [
        {
            question: "Футболда қақпашының міндеті не?",
            answers: ["Допты тебу", "Гол соғу", "Қақпаны қорғау", "Тәртіп бұзу"],
            correct: 2
        },
        {
            question: "Қазақстан құрамасы алғаш рет Олимпиадада қай жылы алтын алды?",
            answers: ["1992", "1994", "1996", "1998"],
            correct: 2
        },
        {
            question: "Теннис доптарының түсі қандай?",
            answers: ["Қызыл", "Сары", "Көк", "Ақ"],
            correct: 1
        },
        {
            question: "Бокста ринг формасы қандай?",
            answers: ["Тікбұрышты", "Шаршы", "Дөңгелек", "Үшбұрышты"],
            correct: 1
        },
        {
            question: "Шахмат ойынының қанша фигурасы бар?",
            answers: ["16", "32", "48", "64"],
            correct: 1
        }
    ],
    geography: [
        {
            question: "Әлемдегі ең үлкен мұхит қайсы?",
            answers: ["Атлант", "Үнді", "Тынық", "Солтүстік мұзды"],
            correct: 2
        },
        {
            question: "Қазақстанның ең ұзын өзені қандай?",
            answers: ["Ертіс", "Сырдария", "Іле", "Жайық"],
            correct: 0
        },
        {
            question: "Әлемдегі ең биік шың қайсы?",
            answers: ["Эльбрус", "Килиманджаро", "Эверест", "К2"],
            correct: 2
        },
        {
            question: "Қазақстан қанша облыстан тұрады?",
            answers: ["14", "16", "17", "19"],
            correct: 0
        },
        {
            question: "Еуропаның ең үлкен елі қайсы?",
            answers: ["Германия", "Франция", "Украина", "Ресей"],
            correct: 3
        }
    ],
    literature: [
        {
            question: "Абай Құнанбаевтың қанша қара сөзі бар?",
            answers: ["30", "35", "45", "50"],
            correct: 2
        },
        {
            question: "«Қыз Жібек» поэмасының авторы кім?",
            answers: ["Шәкәрім Құдайбердіұлы", "Мұхтар Әуезов", "Жүсіпбек Аймауытов", "Бұхар жырау"],
            correct: 0
        },
        {
            question: "Әйгілі «Ромео мен Джульетта» шығармасын кім жазды?",
            answers: ["Лев Толстой", "Шекспир", "Данте", "Джейн Остин"],
            correct: 1
        },
        {
            question: "«Махаббат, қызық мол жылдар» романының авторы кім?",
            answers: ["Мұхтар Әуезов", "Сәбит Мұқанов", "Ғабит Мүсірепов", "Бердібек Соқпақбаев"],
            correct: 1
        },
        {
            question: "«Ұлы дала елі» атты шығарманы кім жазды?",
            answers: ["Шоқан Уәлиханов", "Ілияс Есенберлин", "Ахмет Байтұрсынов", "Мағжан Жұмабаев"],
            correct: 1
        }
    ]
};


topicButtons.forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.topic));
});

function startQuiz(topic) {
    currentTopic = topic;
    questions = quizData[topic];
    currentQuestionIndex = 0;
    score = 0;

    topics.classList.remove('active');
    topics.classList.add('hidden');
    quiz.classList.remove('hidden');
    quiz.classList.add('active');

    quizTopic.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
    totalQuestionsElement.textContent = questions.length;

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    currentQuestionElement.textContent = currentQuestionIndex + 1;

    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });

    nextButton.classList.add('hidden');
}

function selectAnswer(index) {
    const buttons = answersElement.querySelectorAll('.answer-btn');
    buttons.forEach(button => button.disabled = true);

    const question = questions[currentQuestionIndex];
    if (index === question.correct) {
        buttons[index].classList.add('correct');
        score++;
    } else {
        buttons[index].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
    }

    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quiz.classList.remove('active');
    quiz.classList.add('hidden');
    results.classList.remove('hidden');
    results.classList.add('active');

    scoreElement.textContent = score;
    totalScoreElement.textContent = questions.length;

    const percentage = (score / questions.length) * 100;
    updateResultPercentage(percentage);

    
    
    if (percentage >= 80) {
        feedback = "Жарайсың осы қалпыңнан талма!";
    } else if (percentage >= 60) {
        feedback = "Жақсы, саған әлі де еңбек ету керек";
    } else if (percentage >= 40) {
        feedback = "Жаман емес,тағыда байқап көр";
    } else {
        feedback = "Саған көп жаттығу керек";
    }
    feedbackElement.textContent = feedback;
}

function updateResultPercentage(percentage) {
    const percentageElement = document.querySelector('.percent');
    percentageElement.textContent = `${Math.round(percentage)}%`;
}


restart.addEventListener('click', () => {
    results.classList.remove('active');
    results.classList.add('hidden');
    topics.classList.remove('hidden');
    topics.classList.add('active');
});








