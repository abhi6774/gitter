import { User, factorial, fibonacci, saveUser } from "./utils";

(async function main() {
    const user: User = {
        name: "John Doe",
        age: 25,
        contact: "1234567890",
        email: "jhon@mail.com",
        verfied: false,
    }


    console.log("Factorial:", factorial(170));
    console.log("Fibonacci:", fibonacci(1475));

    await saveUser(user);
    console.log("Something must be done after saving user")
})();
