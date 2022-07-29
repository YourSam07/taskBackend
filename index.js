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

//STATIC
// get directory where is index.html
const root = path.join(__dirname, 'client', 'build');
//express.use static with the directory
app.use(express.static(root));
//express get request any (*) root, please use file that is on root directory configure above.
app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
});

app.use('/api/user', require('./userroutes'))

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at port ${port}`))