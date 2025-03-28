function submitGuess() {
    const userGuess = document.getElementById("userGuess").value;

    // Validate input
    if (userGuess === '' || userGuess < 1 || userGuess > 100) {
        document.getElementById("message").innerText = "Please enter a valid number between 1 and 100.";
        return;
    }

    fetch(`/guess?number=${userGuess}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("message").innerText = data;

            // Extract and update attempts
            const attemptsMatch = data.match(/You have (\d+) attempts? left/);
            if (attemptsMatch) {
                const attemptsLeft = attemptsMatch[1];
                document.getElementById("attempts").innerText = `${10 - parseInt(attemptsLeft)}/10`;
            }

            // If the response contains "Congratulations" or "lost", end the game
            if (data.includes("Congratulations") || data.includes("lost")) {
                document.getElementById("resetBtn").style.display = "block";
                document.getElementById("guessBtn").disabled = true;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("message").innerText = "An error occurred. Please try again.";
        });
}

function resetGame() {
    fetch('/guess/newgame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Reset all game elements
        document.getElementById("message").innerText = data;
        document.getElementById("attempts").innerText = "0/10";
        document.getElementById("userGuess").value = "";

        // Hide reset button and re-enable guess button
        document.getElementById("resetBtn").style.display = "none";
        document.getElementById("guessBtn").disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("message").innerText = "Failed to start new game. Please refresh the page.";
    });
}

// Ensure a new game starts when the page loads
window.onload = resetGame;