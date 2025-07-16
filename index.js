const express  = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/authRouter')
const activityRouter = require('./routers/activityRouter')
const reservationRouter = require('./routers/reservationRouter')


const app = express();
const PORT = 8080 ;


app.use(cors({
  origin: 'http://localhost:3000', // autorise uniquement ce domaine
  credentials: true,                // si tu utilises des cookies ou auth
}));


app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/activity' , activityRouter )

app.use('/reservation' , reservationRouter )


app.listen(PORT, ()=> {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
})