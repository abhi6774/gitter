import { User, factorial, fibonacci, saveUser } from "./utils";

(function main() {
    const user: User = {
        name: "John Doe",
        age: 25,
        contact: "1234567890",
        email: "jhon@mail.com",
        verfied: false,
    }


    console.log("Factorial:", factorial(25));
    console.log("Fibonacci:", fibonacci(10));

    saveUser(user);
})();
