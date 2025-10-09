package com.example.calculator;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin // Allow requests from the React frontend
public class CalculatorController {

    @PostMapping("/calculate")
    public double calculate(@RequestBody Map<String, String> payload) {
        String operation = payload.get("operation");
        double x = Double.parseDouble(payload.get("x"));

        switch (operation) {
            case "sqrt":
                if (x < 0) throw new IllegalArgumentException("Cannot take sqrt of a negative number.");
                return Math.sqrt(x);
            case "factorial":
                if (x < 0) throw new IllegalArgumentException("Cannot take factorial of a negative number.");
                return factorial((int) x);
            case "log":
                if (x <= 0) throw new IllegalArgumentException("Cannot take natural log of a non-positive number.");
                return Math.log(x);
            case "power":
                double b = Double.parseDouble(payload.get("b"));
                return Math.pow(x, b);
            default:
                throw new IllegalArgumentException("Invalid operation: " + operation);
        }
    }

    private double factorial(int n) {
        if (n == 0) return 1;
        double result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}