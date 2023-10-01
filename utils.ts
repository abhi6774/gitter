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
