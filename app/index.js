import express from "express";
import cookieParser from 'cookie-parser';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication} from "./controllers/authentication.controller.js";  
import exp from "constants";
import { methods as authorization} from "./middleware/authorization.js";  
import connectDB from "./config/db.js"; 

//Server 
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Conexion DB
connectDB();


//Configuracion 

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

//Rutas 

app.get("/",authorization.soloPublico,(req,res)=>res.sendFile(__dirname + "/pages/login.html"))
//Primero se verifica en solo publico si esta todo bien, si es asi seguimos con el siguiente paso, sino lo sacamos 
app.get("/register",authorization.soloPublico,(req,res)=>res.sendFile(__dirname + "/pages/register.html"))
app.get("/admin",authorization.soloAdmin,(req,res)=>res.sendFile(__dirname + "/pages/admin/admin.html"))
app.post("/api/register",authentication.register);
app.post("/api/login",authentication.login);