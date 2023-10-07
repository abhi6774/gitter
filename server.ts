import http from "http";

export const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write((process.env["HELLO_MESSAGE"] ?? "ENV not found") + "\n");
    res.write("I am a Node.js server.")
    res.end();
});



