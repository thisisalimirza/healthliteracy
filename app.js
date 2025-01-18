document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('healthLiteracyForm');
    const results = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const readingScoreElement = document.getElementById('reading-score');
    const numeracyScoreElement = document.getElementById('numeracy-score');
    const interpretationElement = document.getElementById('interpretation');

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
        
        // Interpret score based on TOFHLA standards
        let interpretation = '';
        if (totalScore >= 75) {
            interpretation = 'Adequate Health Literacy: You demonstrate adequate ability to read and interpret most health texts.';
        } else if (totalScore >= 60) {
            interpretation = 'Marginal Health Literacy: You may have difficulty reading and interpreting some health texts. Consider asking healthcare providers for simplified materials.';
        } else {
            interpretation = 'Inadequate Health Literacy: You may have significant difficulty reading and interpreting health texts. Please discuss this with your healthcare provider and ask for assistance when needed.';
        }

        // Display results
        scoreElement.textContent = `Total TOFHLA Score: ${totalScore.toFixed(1)} out of 100`;
        readingScoreElement.textContent = `Reading Comprehension Score: ${scaledReadingScore.toFixed(1)} out of 50`;
        numeracyScoreElement.textContent = `Numeracy Score: ${scaledNumeracyScore.toFixed(1)} out of 50`;
        interpretationElement.textContent = interpretation;
        results.classList.remove('hidden');

        // Smooth scroll to results
        results.scrollIntoView({ behavior: 'smooth' });
    });
});
