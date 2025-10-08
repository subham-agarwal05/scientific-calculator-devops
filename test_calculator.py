import unittest
import math
import calculator

class TestCalculator(unittest.TestCase):
    def test_sqrt(self):
        self.assertEqual(calculator.sqrt(9), 3)

    def test_factorial(self):
        self.assertEqual(calculator.factorial(5), 120)

    def test_natural_log(self):
        self.assertAlmostEqual(calculator.natural_log(math.e), 1.0, places=3)

    def test_power(self):
        self.assertEqual(calculator.power(2, 3), 8)

if __name__ == "__main__":
    unittest.main()
