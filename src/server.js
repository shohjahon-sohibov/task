const express = require('express')
const app = express()

const connectDB = require('./utils/mongo')
const router = require('./modules');

app.use(express.json())

connectDB()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err))

app.use(router);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app works properly in PORT:${PORT}`))
