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
