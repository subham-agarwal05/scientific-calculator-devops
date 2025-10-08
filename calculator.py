import math

def sqrt(x):
    if x < 0:
        raise ValueError("Cannot take sqrt of negative number")
    return math.sqrt(x)

def factorial(x):
    if x < 0:
        raise ValueError("Cannot take factorial of negative number")
    return math.factorial(x)

def natural_log(x):
    if x <= 0:
        raise ValueError("Cannot take log of non-positive number")
    return math.log(x)

def power(x, b):
    return math.pow(x, b)

def main():
    print("=== Scientific Calculator ===")
    print("1. Square Root")
    print("2. Factorial")
    print("3. Natural Log")
    print("4. Power Function")
    choice = int(input("Enter your choice: "))
    x = float(input("Enter number x: "))

    if choice == 1:
        print("√x =", sqrt(x))
    elif choice == 2:
        print("x! =", factorial(int(x)))
    elif choice == 3:
        print("ln(x) =", natural_log(x))
    elif choice == 4:
        b = float(input("Enter power b: "))
        print("x^b =", power(x, b))
    else:
        print("Invalid choice")

if __name__ == "__main__":
    main()
