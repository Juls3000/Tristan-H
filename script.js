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

// --- Preguntas y Respuestas ---
// Adaptadas a formato multiple-choice
const questions = [
    {
        question: "¿Qué papel jugó la filosofía o el pensamiento ético en el trabajo de Tristan Harris en Google?",
        answers: [
            { text: "Fue 'Diseñador Ético y Filosófico', aplicando una lente crítica y reflexiva al diseño.", correct: true },
            { text: "Era el responsable de marketing de productos éticos.", correct: false },
            { text: "Se encargaba únicamente de la interfaz de usuario, sin enfoque ético.", correct: false },
            { text: "Lideraba el equipo de desarrollo de algoritmos de IA.", correct: false }
        ],
        // Comentario estimulante para la respuesta correcta
        feedback: "¡Exacto! Su rol mismo indicaba la importancia de la ética en el diseño tecnológico."
    },
    {
        question: "¿Cuál es el objetivo principal del Center for Humane Technology (CHT)?",
        answers: [
            { text: "Desarrollar nuevo hardware tecnológico.", correct: false },
            { text: "Reimaginar la estructura digital hacia un cambio comprensivo y humano.", correct: true },
            { text: "Ofrecer cursos de programación avanzada.", correct: false },
            { text: "Invertir en startups de redes sociales.", correct: false }
        ],
        feedback: "¡Correcto! Buscan alinear la tecnología con los valores humanos fundamentales."
    },
    {
        question: "¿Cuál es la crítica principal de Tristan Harris hacia el modelo de negocio de las grandes tecnológicas?",
        answers: [
            { text: "Que los precios de los dispositivos son muy altos.", correct: false },
            { text: "Que no invierten suficiente en innovación.", correct: false },
            { text: "Se basan en capturar y vender nuestra atención, explotando la psicología humana.", correct: true },
            { text: "Que no ofrecen suficiente soporte técnico a los usuarios.", correct: false }
        ],
        feedback: "¡Muy bien! Identificas el núcleo del problema: la economía de la atención."
    },
    {
        question: "¿Cómo puede la filosofía ayudar a comprender la manipulación tecnológica?",
        answers: [
            { text: "Enseñando historia de la tecnología.", correct: false },
            { text: "Optimizando el código de las aplicaciones.", correct: false },
            { text: "Proporcionando herramientas (ética, epistemología) para reflexionar sobre autonomía y libre albedrío.", correct: true },
            { text: "Mejorando la velocidad de conexión a internet.", correct: false }
        ],
        feedback: "¡Excelente! La filosofía nos da el marco para analizar críticamente estos fenómenos."
    },
    {
        question: "¿Qué impactos negativos de la tecnología se analizan filosóficamente?",
        answers: [
            { text: "El coste de producción de los smartphones.", correct: false },
            { text: "Impactos en salud mental, polarización social y desinformación.", correct: true },
            { text: "La velocidad de carga de las páginas web.", correct: false },
            { text: "La duración de la batería de los dispositivos.", correct: false }
        ],
        feedback: "¡Así es! La perspectiva filosófica evalúa cómo la tecnología afecta nuestro bienestar."
    },
    {
        question: "¿Por qué sostiene Tristan Harris que la tecnología no es neutral?",
        answers: [
            { text: "Porque funciona con electricidad.", correct: false },
            { text: "Porque su diseño refleja valores específicos, como maximizar la atención y el beneficio.", correct: true },
            { text: "Porque está hecha de diferentes materiales.", correct: false },
            { text: "Porque se actualiza constantemente.", correct: false }
        ],
        feedback: "¡Correcto! Las decisiones de diseño incorporan valores, no son neutrales."
    },
    {
        question: "¿Cómo relaciona Tristan Harris la IA con la sabiduría y la necesidad de la filosofía?",
        answers: [
            { text: "La IA reemplazará a la filosofía.", correct: false },
            { text: "La IA es una 'prueba definitiva' que requiere sabiduría (restricción) y juicio crítico filosófico para su manejo responsable.", correct: true },
            { text: "La filosofía es irrelevante para el desarrollo de la IA.", correct: false },
            { text: "La IA solo puede ser programada por filósofos.", correct: false }
        ],
        feedback: "¡Muy buena reflexión! La sabiduría y la ética son cruciales ante el poder de la IA."
    },
    {
        question: "¿Por qué es importante la 'necesidad existencial de vivir en la verdad' en el contexto tecnológico según Harris?",
        answers: [
            { text: "Porque la verdad es subjetiva y la tecnología lo demuestra.", correct: false },
            { text: "Porque las redes sociales actuales a menudo favorecen la desinformación, y la filosofía ayuda a buscar la verdad.", correct: true },
            { text: "Porque la tecnología siempre dice la verdad objetiva.", correct: false },
            { text: "Porque vivir en la verdad es menos importante que estar conectado.", correct: false }
        ],
        feedback: "¡Fundamental! La búsqueda de la verdad es esencial frente a la manipulación informativa."
    },
    {
        // Adaptación de la última idea a pregunta
        question: "Según el pensamiento de Tristan Harris, ¿por qué es crucial el enfoque filosófico al convivir con la conectividad y la IA?",
        answers: [
            { text: "Para aprender a programar mejores algoritmos.", correct: false },
            { text: "Porque nos ayuda a desconectar completamente de la tecnología.", correct: false },
            { text: "Proporciona la lente crítica para entender impactos, identificar peligros y orientar la tecnología al bienestar.", correct: true },
            { text: "Porque la filosofía predice el futuro de la tecnología.", correct: false }
        ],
        feedback: "¡Excelente síntesis! La filosofía es la brújula para navegar la era digital."
    }
];

// --- Event Listeners ---
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startGame);

// --- Funciones del Quiz ---

// Inicia el juego
function startGame() {
    console.log('Iniciando el juego...');
    score = 0; // Reinicia puntuación
    resultsContainerElement.classList.add('hide'); // Oculta resultados
    questionContainerElement.classList.remove('hide'); // Muestra preguntas
    feedbackElement.innerText = ''; // Limpia feedback
    feedbackElement.className = 'feedback-message'; // Resetea clases de feedback
    // Baraja las preguntas para que el orden cambie cada vez (opcional pero recomendado)
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    totalQuestionsElement.innerText = questions.length; // Muestra el total de preguntas
    setNextQuestion();
}

// Configura y muestra la siguiente pregunta
function setNextQuestion() {
    resetState(); // Limpia el estado anterior
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResults(); // Muestra los resultados si no hay más preguntas
    }
}

// Muestra una pregunta específica
function showQuestion(questionData) {
    currentQuestionNumberElement.innerText = currentQuestionIndex + 1; // Actualiza número de pregunta actual
    questionElement.innerText = questionData.question; // Muestra el texto de la pregunta
    // Crea los botones de respuesta
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            // Almacena la información de si es correcta en el dataset del botón
            button.dataset.correct = answer.correct;
            // Almacena el feedback específico para esta respuesta
            button.dataset.feedback = questionData.feedback;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Resetea el estado entre preguntas
function resetState() {
    clearStatusClass(document.body); // Limpia clases de estado del body si las hubiera
    nextButton.classList.add('hide'); // Oculta el botón "Siguiente"
    feedbackElement.innerText = ''; // Limpia el mensaje de feedback
    feedbackElement.className = 'feedback-message'; // Resetea clases de feedback
    // Elimina los botones de respuesta anteriores
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Maneja la selección de una respuesta
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; // Verifica si la respuesta es correcta

    // Reproduce sonido correspondiente
    if (correct) {
        correctSound.play().catch(error => console.log("Error al reproducir sonido:", error)); // Añadido catch para posibles errores
        score++; // Incrementa puntuación
        feedbackElement.innerText = selectedButton.dataset.feedback || "¡Respuesta Correcta!"; // Muestra feedback específico o genérico
        feedbackElement.classList.add('correct');
    } else {
        incorrectSound.play().catch(error => console.log("Error al reproducir sonido:", error));
        feedbackElement.innerText = "Respuesta Incorrecta.";
        feedbackElement.classList.add('incorrect');
    }

    // Marca visualmente todas las respuestas (correcta e incorrectas)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true; // Deshabilita todos los botones después de seleccionar uno
    });

    // Muestra el botón "Siguiente" o "Finalizar"
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.innerText = "Siguiente Pregunta";
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = "Ver Resultados"; // Cambia el texto si es la última pregunta
        nextButton.classList.remove('hide');
    }
}

// Aplica clases CSS para indicar si un botón es correcto o incorrecto
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

// Limpia las clases de estado (correcto/incorrecto) de un elemento
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// Maneja el click en el botón "Siguiente"
function handleNextButton() {
    currentQuestionIndex++;
    setNextQuestion();
}

// Muestra los resultados finales
function showResults() {
    questionContainerElement.classList.add('hide'); // Oculta el contenedor de preguntas
    resultsContainerElement.classList.remove('hide'); // Muestra el contenedor de resultados
    finalScoreElement.innerText = `Tu puntuación: ${score} / ${questions.length}`; // Muestra puntuación

    // Comentario final positivo basado en la puntuación
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
    finalCommentElement.innerText = comment; // Muestra el comentario final
}

// --- Inicio del Script ---
// Asegurarse de que el DOM esté cargado antes de intentar acceder a los elementos de audio
document.addEventListener('DOMContentLoaded', () => {
    // Intenta reproducir y pausar inmediatamente los sonidos con volumen 0
    // para habilitarlos en algunos navegadores que requieren interacción del usuario.
    const sounds = [correctSound, incorrectSound];
    sounds.forEach(sound => {
        if (sound) {
            sound.volume = 0;
            sound.play().then(() => {
                sound.pause();
                sound.currentTime = 0;
                sound.volume = 1; // Restaura el volumen
            }).catch(() => {
                // No hacer nada si falla, la interacción del usuario al hacer clic activará el sonido
                 console.log("Interacción del usuario necesaria para reproducir audio.");
            });
        }
    });

    startGame(); // Inicia el quiz cuando el DOM está listo
});
