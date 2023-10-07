import { server } from "./server";
import { User, factorial, fibonacci, saveUser } from "./utils";

const PORT = process.env.PORT || 3000;

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
    console.log("Something must be done after saving user", PORT)

    server.listen(PORT, () => {
        console.log("Server is listening on port", PORT);
    });
})();
