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


export function fibonacci(n: number, memo: number[] = []) {
    if (n === 0 || n === 1) {
        return 1;
    }
    if (memo[n] === undefined) {
        memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    }
    return memo[n];
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
