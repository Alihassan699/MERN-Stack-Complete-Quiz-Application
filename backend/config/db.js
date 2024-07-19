import client from "pg";

const db = new client({
    user: "postfress",
    host: "localhost",
    database: "quiz_Application",
    password: "Al!h@ss@n",
    port: 5432
})

export default db