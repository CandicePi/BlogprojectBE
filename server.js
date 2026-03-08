const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./Controllers/Router/userRouter')
const blogRouter = require('./Controllers/Router/blogRouter')

const connectDB = require("./config/db")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/blog", blogRouter)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is  running on port${PORT}`))