package com.example.GuessingTheNumber;

import org.springframework.web.bind.annotation.*;
import java.util.Random;

@RestController
@CrossOrigin(origins = "*") // Allow requests from any origin
public class GameController {
    private int targetNumber;
    private int attempts;
    private final Random random = new Random();

    public GameController() {
        newGame();
    }

    @GetMapping("/guess")
    public String guessNumber(@RequestParam(name = "number") int number) {
        if (attempts >= 10) {
            return "❌ Sorry, you lost! The number was " + targetNumber + ". Click 'New Game' to try again.";
        }

        attempts++;

        if (number < targetNumber) {
            return "⬇️ Too low! You have " + (10 - attempts) + " attempts left.";
        } else if (number > targetNumber) {
            return "⬆️ Too high! You have " + (10 - attempts) + " attempts left.";
        } else {
            return "🎉 Congratulations! You guessed the number in " + attempts + " attempts! Click 'New Game' to play again.";
        }
    }

    @PostMapping("/guess/newgame")
    public String newGame() {
        targetNumber = random.nextInt(100) + 1;
        attempts = 0;
        return "🔄 New game started! Enter a number between 1 and 100. You have 10 attempts.";
    }
}
