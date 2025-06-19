import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "2mb"}))
app.use(express.urlencoded({extended:true, limit:"2mb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import contactRouter from './routes/routes.contact.js'
app.use("/api/v1/contact", contactRouter)


export {app}

app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});