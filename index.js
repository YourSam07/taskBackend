const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./Middleware/errorHanlder')
const connectDB = require('./config/db')
const path = require('path')
const port = process.env.PORT || 7878

connectDB()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/api/user', require('./userroutes'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("frontend", "build", "index.html"));
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at port ${port}`))