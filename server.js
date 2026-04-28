const express = require('express')
const cors = require('cors')
const isProduction = process.env.NODE_ENV === "production"
const frontendURL = isProduction
? ["https://blogproject-fe.vercel.app"]
: ["http://localhost:5173"];

const app = express()

app.use(
    cors({
        origin: frontendURL,
        credentials: true,
    }),
);

require('dotenv').config()

const userRouter = require('./Router/userRouter')
const blogRouter = require('./Router/blogRouter')

const connectDB = require("./config/db")



connectDB()


app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/blog", blogRouter)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is  running on port${PORT}`))