const express = require('express');
const authRoutes = require('./routes/authRoutes');
const materielRoutes  = require('./routes/materielRoutes');

const cors = require('cors');

const app =express()

app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoutes  )
app.use("/api",materielRoutes )

app.listen(5000, ()=>{
    console.log("server run")
})






