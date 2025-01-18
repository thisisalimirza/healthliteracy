document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            title: 'Health Literacy Assessment',
            readingSection: 'Reading Comprehension',
            readingInfo: 'This section evaluates your ability to understand health-related materials. Select the most appropriate answer for each question.',
            numeracySection: 'Numeracy Assessment',
            numeracyInfo: 'This section tests your ability to understand and work with numbers in medical contexts. Choose the best answer for each question.',
            submit: 'Submit Assessment',
            results: 'Your Results',
            totalScore: 'Total TOFHLA Score:',
            readingScore: 'Reading Comprehension Score:',
            numeracyScore: 'Numeracy Score:',
            outOf: 'out of',
            interpretations: {
                adequate: 'Adequate Health Literacy: You demonstrate adequate ability to read and interpret most health texts.',
                marginal: 'Marginal Health Literacy: You may have difficulty reading and interpreting some health texts. Consider asking healthcare providers for simplified materials.',
                inadequate: 'Inadequate Health Literacy: You may have significant difficulty reading and interpreting health texts. Please discuss this with your healthcare provider and ask for assistance when needed.'
            },
            questions: {
                r1: {
                    text: 'Your doctor has sent you to have a _______ X-ray.',
                    options: ['stomach', 'diabetes', 'stitches', 'germs']
                },
                r2: {
                    text: 'When you go to _______ this medicine, you must have an empty stomach.',
                    options: ['buy', 'hold', 'take', 'inject']
                },
                n1: {
                    text: 'If you take your first tablet at 7:00 am, and you need to take a tablet every 6 hours, what time should you take your next tablet?',
                    options: ['1:00 pm', '2:00 pm', '7:00 pm', '12:00 pm']
                },
                n2: {
                    text: 'Your prescription says: Take 2 tablets by mouth every 6 hours as needed. What is the maximum number of tablets you can take in one day?',
                    options: ['8 tablets', '6 tablets', '4 tablets', '12 tablets']
                }
            }
        },
        es: {
            title: 'Evaluación de Alfabetización en Salud',
            readingSection: 'Comprensión de Lectura',
            readingInfo: 'Esta sección evalúa su capacidad para comprender materiales relacionados con la salud. Seleccione la respuesta más apropiada para cada pregunta.',
            numeracySection: 'Evaluación Numérica',
            numeracyInfo: 'Esta sección evalúa su capacidad para entender y trabajar con números en contextos médicos. Elija la mejor respuesta para cada pregunta.',
            submit: 'Enviar Evaluación',
            results: 'Sus Resultados',
            totalScore: 'Puntuación Total TOFHLA:',
            readingScore: 'Puntuación de Comprensión de Lectura:',
            numeracyScore: 'Puntuación Numérica:',
            outOf: 'de',
            interpretations: {
                adequate: 'Alfabetización en Salud Adecuada: Demuestra capacidad adecuada para leer e interpretar la mayoría de los textos de salud.',
                marginal: 'Alfabetización en Salud Marginal: Puede tener dificultades para leer e interpretar algunos textos de salud. Considere pedir materiales simplificados a los proveedores de atención médica.',
                inadequate: 'Alfabetización en Salud Inadecuada: Puede tener dificultades significativas para leer e interpretar textos de salud. Por favor, discuta esto con su proveedor de atención médica y solicite ayuda cuando sea necesario.'
            },
            questions: {
                r1: {
                    text: 'Su doctor le ha enviado a hacerse una radiografía de _______.',
                    options: ['estómago', 'diabetes', 'puntos', 'gérmenes']
                },
                r2: {
                    text: 'Cuando vaya a _______ este medicamento, debe tener el estómago vacío.',
                    options: ['comprar', 'sostener', 'tomar', 'inyectar']
                },
                n1: {
                    text: 'Si toma su primera pastilla a las 7:00 am, y necesita tomar una pastilla cada 6 horas, ¿a qué hora debe tomar la siguiente pastilla?',
                    options: ['1:00 pm', '2:00 pm', '7:00 pm', '12:00 pm']
                },
                n2: {
                    text: 'Su receta dice: Tome 2 pastillas por boca cada 6 horas según sea necesario. ¿Cuál es el número máximo de pastillas que puede tomar en un día?',
                    options: ['8 pastillas', '6 pastillas', '4 pastillas', '12 pastillas']
                }
            }
        }
    };

    let currentLang = 'en';
    const form = document.getElementById('healthLiteracyForm');
    const results = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const readingScoreElement = document.getElementById('reading-score');
    const numeracyScoreElement = document.getElementById('numeracy-score');
    const interpretationElement = document.getElementById('interpretation');
    const langToggle = document.getElementById('langToggle');

    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        // Update static text
        document.querySelector('h1').textContent = t.title;
        document.querySelector('.section h2:first-of-type').textContent = t.readingSection;
        document.querySelector('.section .section-info:first-of-type').textContent = t.readingInfo;
        document.querySelector('.section h2:last-of-type').textContent = t.numeracySection;
        document.querySelector('.section .section-info:last-of-type').textContent = t.numeracyInfo;
        document.querySelector('.submit-btn').textContent = t.submit;

        // Update questions
        document.querySelector('[name="r1"]').closest('.passage').querySelector('.passage-text').textContent = t.questions.r1.text;
        document.querySelector('[name="r2"]').closest('.passage').querySelector('.passage-text').textContent = t.questions.r2.text;
        document.querySelector('[name="n1"]').closest('.question').querySelector('.passage-text').textContent = t.questions.n1.text;
        document.querySelector('[name="n2"]').closest('.question').querySelector('.passage-text').textContent = t.questions.n2.text;

        // Update options
        ['r1', 'r2', 'n1', 'n2'].forEach((q, qIndex) => {
            const options = document.querySelectorAll(`[name="${q}"] + label`);
            options.forEach((option, i) => {
                option.textContent = t.questions[q].options[i];
            });
        });

        // Update results section if visible
        if (!results.classList.contains('hidden')) {
            updateResults();
        }
    }

    function updateResults() {
        const t = translations[currentLang];
        const totalScore = parseFloat(scoreElement.textContent.match(/[\d.]+/)[0]);
        const readingScore = parseFloat(readingScoreElement.textContent.match(/[\d.]+/)[0]);
        const numeracyScore = parseFloat(numeracyScoreElement.textContent.match(/[\d.]+/)[0]);

        scoreElement.textContent = `${t.totalScore} ${totalScore.toFixed(1)} ${t.outOf} 100`;
        readingScoreElement.textContent = `${t.readingScore} ${readingScore.toFixed(1)} ${t.outOf} 50`;
        numeracyScoreElement.textContent = `${t.numeracyScore} ${numeracyScore.toFixed(1)} ${t.outOf} 50`;

        let interpretation = '';
        if (totalScore >= 75) {
            interpretation = t.interpretations.adequate;
        } else if (totalScore >= 60) {
            interpretation = t.interpretations.marginal;
        } else {
            interpretation = t.interpretations.inadequate;
        }
        interpretationElement.textContent = interpretation;
    }

    langToggle.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Calculate Reading Comprehension score
        const readingAnswers = [
            parseInt(form.querySelector('input[name="r1"]:checked').value),
            parseInt(form.querySelector('input[name="r2"]:checked').value)
        ];
        
        // Calculate Numeracy score
        const numeracyAnswers = [
            parseInt(form.querySelector('input[name="n1"]:checked').value),
            parseInt(form.querySelector('input[name="n2"]:checked').value)
        ];

        const readingScore = readingAnswers.reduce((sum, score) => sum + score, 0);
        const numeracyScore = numeracyAnswers.reduce((sum, score) => sum + score, 0);
        
        // Convert to TOFHLA scale (Reading: 0-50, Numeracy: 0-50)
        const scaledReadingScore = (readingScore / readingAnswers.length) * 50;
        const scaledNumeracyScore = (numeracyScore / numeracyAnswers.length) * 50;
        const totalScore = scaledReadingScore + scaledNumeracyScore;
        
        // Display results
        const t = translations[currentLang];
        scoreElement.textContent = `${t.totalScore} ${totalScore.toFixed(1)} ${t.outOf} 100`;
        readingScoreElement.textContent = `${t.readingScore} ${scaledReadingScore.toFixed(1)} ${t.outOf} 50`;
        numeracyScoreElement.textContent = `${t.numeracyScore} ${scaledNumeracyScore.toFixed(1)} ${t.outOf} 50`;
        
        let interpretation = '';
        if (totalScore >= 75) {
            interpretation = t.interpretations.adequate;
        } else if (totalScore >= 60) {
            interpretation = t.interpretations.marginal;
        } else {
            interpretation = t.interpretations.inadequate;
        }
        interpretationElement.textContent = interpretation;
        
        results.classList.remove('hidden');
        results.scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize with English
    updateLanguage('en');
});
