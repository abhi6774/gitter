import crypto from "crypto";

export interface User {
    name: string;
    age: number;
    contact: string;
    email: string;
    verfied: boolean;
}

export function factorial(n: number) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

export function fibonacci(n: number) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}


export async function saveUser(user: User) {
    console.log("Saving user...");
    const savedUser = await new Promise<User & { uid: string }>((resolve, reject) => {
        setTimeout(() => {
            resolve({ ...user, uid: crypto.randomBytes(16).toString("hex") });
        }, 2000);
    })
    console.log(`User ${user.name} saved with ${savedUser.uid} Saved!`)
}
