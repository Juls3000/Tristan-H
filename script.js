// --- Elementos del DOM ---
const questionContainerElement = document.getElementById('question-area');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultsContainerElement = document.getElementById('results-area');
const finalScoreElement = document.getElementById('final-score');
const finalCommentElement = document.getElementById('final-comment');
const restartButton = document.getElementById('restart-btn');
const feedbackElement = document.getElementById('feedback');
const currentQuestionNumberElement = document.getElementById('current-question-number');
const totalQuestionsElement = document.getElementById('total-questions');

// --- Sonidos ---
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// --- Estado del Quiz ---
let shuffledQuestions, currentQuestionIndex;
let score = 0;

// --- Preguntas y Respuestas (CON DISTRACTORES MEJORADOS) ---
const questions = [
    {
        question: "¿Qué papel jugó la filosofía o el pensamiento ético en el trabajo de Tristan Harris en Google?",
        answers: [
            { text: "Fue 'Diseñador Ético y Filosófico', aplicando una lente crítica y reflexiva al diseño.", correct: true },
            { text: "Era el Jefe del departamento de Cumplimiento Ético y Legal.", correct: false },
            { text: "Actuó como Director de Diseño de Producto centrado puramente en la usabilidad.", correct: false },
            { text: "Fue un consultor externo sobre implicaciones filosóficas generales, sin rol interno.", correct: false }
        ],
        feedback: "¡Exacto! Su rol mismo indicaba la importancia de la ética en el diseño tecnológico."
    },
    {
        question: "¿Cuál es el objetivo principal del Center for Humane Technology (CHT)?",
        answers: [
            { text: "Crear legislación específica para regular el tiempo de pantalla.", correct: false },
            { text: "Reimaginar la estructura digital hacia un cambio comprensivo y humano.", correct: true },
            { text: "Desarrollar exclusivamente alternativas de software de código abierto.", correct: false },
            { text: "Promover principalmente la alfabetización digital básica en las escuelas.", correct: false }
        ],
        feedback: "¡Correcto! Buscan alinear la tecnología con los valores humanos fundamentales."
    },
    {
        question: "¿Cuál es la crítica principal de Tristan Harris hacia el modelo de negocio de las grandes tecnológicas?",
        answers: [
            { text: "Que su principal problema ético es la falta de innovación en hardware.", correct: false },
            { text: "Que no invierten lo suficiente en la ciberseguridad de los datos de usuario.", correct: false },
            { text: "Se basa en capturar y vender nuestra atención, explotando la psicología humana.", correct: true },
            { text: "Que cobran precios excesivos por los servicios premium que ofrecen.", correct: false }
        ],
        feedback: "¡Muy bien! Identificas el núcleo del problema: la economía de la atención."
    },
    {
        question: "¿Cómo puede la filosofía ayudar a comprender la manipulación tecnológica?",
        answers: [
            { text: "Ofreciendo principalmente técnicas de meditación para aprender a desconectar.", correct: false },
            { text: "Enseñando la historia detallada de la computación y sus inventores.", correct: false },
            { text: "Proporcionando herramientas (ética, epistemología) para reflexionar sobre autonomía y libre albedrío.", correct: true },
            { text: "Permitiendo escribir código de programación más eficiente y optimizado.", correct: false }
        ],
        feedback: "¡Excelente! La filosofía nos da el marco para analizar críticamente estos fenómenos."
    },
    {
        question: "¿Qué impactos negativos de la tecnología se analizan filosóficamente?",
        answers: [
            { text: "Principalmente la velocidad de procesamiento de los nuevos microchips.", correct: false },
            { text: "Impactos en salud mental, polarización social y desinformación.", correct: true },
            { text: "El coste económico de la instalación de redes de fibra óptica.", correct: false },
            { text: "La estética visual y la usabilidad del diseño de las interfaces.", correct: false }
        ],
        feedback: "¡Así es! La perspectiva filosófica evalúa cómo la tecnología afecta nuestro bienestar."
    },
    {
        question: "¿Por qué sostiene Tristan Harris que la tecnología no es neutral?",
        answers: [
            { text: "Porque se basa fundamentalmente en código binario (ceros y unos).", correct: false },
            { text: "Porque su diseño refleja valores específicos, como maximizar la atención y el beneficio.", correct: true },
            { text: "Porque su impacto final depende exclusivamente de la intención del usuario.", correct: false },
            { text: "Porque requiere una fuente de energía eléctrica para poder funcionar.", correct: false }
        ],
        feedback: "¡Correcto! Las decisiones de diseño incorporan valores, no son neutrales."
    },
    {
        question: "¿Cómo relaciona Tristan Harris la IA con la sabiduría y la necesidad de la filosofía?",
        answers: [
            { text: "Argumenta que solo los ingenieros de IA pueden guiarla éticamente.", correct: false },
            { text: "Considera la IA una 'prueba definitiva' que requiere sabiduría (restricción) y juicio crítico filosófico.", correct: true },
            { text: "Opina que la filosofía debería centrarse solo en problemas clásicos y no en la IA.", correct: false },
            { text: "Cree que la sabiduría es una cualidad innata, desconectada de la filosofía y la IA.", correct: false }
        ],
        feedback: "¡Muy buena reflexión! La sabiduría y la ética son cruciales ante el poder de la IA."
    },
    {
        question: "¿Por qué es importante la 'necesidad existencial de vivir en la verdad' en el contexto tecnológico según Harris?",
        answers: [
            { text: "Porque la verdad objetiva es imposible de alcanzar en el entorno digital.", correct: false },
            { text: "Porque las redes sociales actuales a menudo favorecen la desinformación, y la filosofía ayuda a buscar la verdad.", correct: true },
            { text: "Porque las redes sociales son principalmente para entretenimiento y relaciones, no para la verdad.", correct: false },
            { text: "Porque la tecnología más avanzada siempre será capaz de distinguir automáticamente la verdad.", correct: false }
        ],
        feedback: "¡Fundamental! La búsqueda de la verdad es esencial frente a la manipulación informativa."
    },
    {
        question: "Según el pensamiento de Tristan Harris, ¿por qué es crucial el enfoque filosófico al convivir con la conectividad y la IA?",
        answers: [
            { text: "Principalmente para mejorar la velocidad y eficiencia de los algoritmos de IA.", correct: false },
            { text: "Para ayudar a decidir qué nuevas características incluir en las próximas aplicaciones.", correct: false },
            { text: "Proporciona la lente crítica para entender impactos, identificar peligros y orientar la tecnología al bienestar.", correct: true },
            { text: "Para comprender mejor las biografías y motivaciones de los creadores de tecnología.", correct: false }
        ],
        feedback: "¡Excelente síntesis! La filosofía es la brújula para navegar la era digital."
    }
];

// --- Event Listeners ---
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startGame);

// --- Funciones del Quiz ---

function startGame() {
    console.log('Iniciando el juego...'); // Mantenemos logs útiles
    score = 0;
    resultsContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    feedbackElement.innerText = '';
    feedbackElement.className = 'feedback-message';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Baraja preguntas
    currentQuestionIndex = 0;
    totalQuestionsElement.innerText = questions.length;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showQuestion(questionData) {
    currentQuestionNumberElement.innerText = currentQuestionIndex + 1;
    questionElement.innerText = questionData.question;

    // --- ¡NUEVO! BARRAJAR LAS RESPUESTAS ANTES DE MOSTRARLAS ---
    let answers = [...questionData.answers]; // Copia para no modificar el array original permanentemente
    // Algoritmo de Barajado Fisher-Yates (Knuth Shuffle)
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]]; // Intercambia elementos
    }
    // --- FIN DEL BARAJADO ---

    // Crear botones usando el array 'answers' YA BARAJADO
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            // Guardamos el feedback asociado a la pregunta en el botón correcto
            // La función selectAnswer lo leerá desde el botón clickeado si es el correcto
            button.dataset.feedback = questionData.feedback;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}


function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    feedbackElement.innerText = '';
    feedbackElement.className = 'feedback-message';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    // Intentar reproducir sonido (manteniendo la funcionalidad aunque no se oiga en tu caso)
    try {
        if (correct) {
            if (correctSound && typeof correctSound.play === 'function') {
                correctSound.play().catch(error => console.log("Error al reproducir sonido correcto:", error));
            }
            score++;
            feedbackElement.innerText = selectedButton.dataset.feedback || "¡Respuesta Correcta!";
            feedbackElement.classList.add('correct');
        } else {
             if (incorrectSound && typeof incorrectSound.play === 'function') {
                incorrectSound.play().catch(error => console.log("Error al reproducir sonido incorrecto:", error));
             }
            feedbackElement.innerText = "Respuesta Incorrecta.";
            feedbackElement.classList.add('incorrect');
        }
    } catch (error) {
        console.error("Error general al intentar reproducir sonido:", error);
    }


    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.innerText = "Siguiente Pregunta";
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = "Ver Resultados";
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function handleNextButton() {
    currentQuestionIndex++;
    setNextQuestion();
}

function showResults() {
    questionContainerElement.classList.add('hide');
    resultsContainerElement.classList.remove('hide');
    finalScoreElement.innerText = `Tu puntuación: ${score} / ${questions.length}`;

    let comment = "";
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
        comment = "¡Increíble! Tienes una comprensión profunda de estos temas. ¡Excelente trabajo!";
    } else if (percentage >= 75) {
        comment = "¡Muy bien hecho! Demuestras un gran conocimiento sobre la ética tecnológica.";
    } else if (percentage >= 50) {
        comment = "¡Buen trabajo! Has captado muchas ideas importantes. ¡Sigue reflexionando!";
    } else {
        comment = "¡Gracias por participar! Cada pregunta es una invitación a pensar más sobre estos temas cruciales.";
    }
    finalCommentElement.innerText = comment;
}

// --- Inicio del Script ---
document.addEventListener('DOMContentLoaded', () => {
     console.log("DOM cargado, iniciando..."); // Log útil

    // Intentar habilitar sonidos (aunque no funcionen ahora, mantenemos la lógica)
     const sounds = [correctSound, incorrectSound];
     sounds.forEach(sound => {
         if (sound && typeof sound.play === 'function') { // Verifica que existan y tengan el método play
             sound.volume = 0;
             sound.play().then(() => {
                 sound.pause();
                 sound.currentTime = 0;
                 sound.volume = 1;
             }).catch(() => {
                  console.log("Interacción del usuario o carga necesaria para reproducir audio.");
             });
         } else if (sound === correctSound) {
            console.warn("Elemento de audio 'correct-sound' no encontrado o inválido.");
         } else if (sound === incorrectSound) {
            console.warn("Elemento de audio 'incorrect-sound' no encontrado o inválido.");
         }
     });

    startGame(); // Inicia el quiz
});
