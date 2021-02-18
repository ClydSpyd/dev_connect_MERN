const express = require('express')
const connectDB = require('./config/db')

const app = express()

// allow cross-origin requests
const cors = require('cors');
app.use(cors());
app.options('*', cors());


// connect to db
connectDB()

// Init middleware
app.use(express.json({ extended: false })) //body parser

app.get('/', (req, res) => res.send('API running'))

// define routes
app.use('/api/users', require('./Routes/API/users'))
app.use('/api/auth', require('./Routes/API/auth'))
app.use('/api/profile', require('./Routes/API/profile'))
app.use('/api/posts', require('./Routes/API/posts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

