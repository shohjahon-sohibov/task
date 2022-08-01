const express = require('express')
const app = express()

const connectDB = require('./utils/mongo')
const router = require('./modules');

app.use(express.json({ limit: "50mb" }))

connectDB()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err))

app.use(router);

// app.get('/', (_, res) => {
//   res.send('App works properly!');
// });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app works properly in PORT:${PORT}`))
