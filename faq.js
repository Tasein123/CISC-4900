document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const suggestionInput = document.getElementById('suggestionInput');
    const suggestion = suggestionInput.value.trim();
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    if (suggestion !== '') {
        suggestionInput.value = '';
        feedbackMessage.textContent = 'Thank you for your suggestion!';
        feedbackMessage.style.color = 'green';
    } else {
        feedbackMessage.textContent = 'Please enter a suggestion!';
        feedbackMessage.style.color = 'red';
    }
});
