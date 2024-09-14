import bcrypjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const usuarios = [{
    user: "rober",
    email: "a@a.com",
    password: "$2a$05$6c.qoCEcxIyU7R3g.sUdEe21bGp8RP1158YTCDfqJYgF9y3ydcV5C"
}]


async function login(req,res){
    console.log(req.body)
    const user= req.body.user;
    const password= req.body.password;
    if(!user || !password){
        return res.status(400).send({stauts:"Error",message:"Los campos estan incorrectos"})
    }
    const usuarioARevisar = usuarios.find(usuario=> usuario.user === user);
    if (!usuarioARevisar){
        return res.status(400).send({stauts:"Error",message:"Error durante el login"})
    }
    const loginCorrecto = await bcrypjs.compare(password,usuarioARevisar.password);
    if (!loginCorrecto){
        return res.status(400).send({stauts:"Error",message:"Error durante el login"})
    }
    const token = jsonwebtoken.sign(
        {user:usuarioARevisar.user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION})

    const cookieOption = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
        path: "/"
    }
    res.cookie("jwt",token,cookieOption);
    res.send({status:"ok",message:"Usuario loggeado",redirect:"/admin"})
}

async function register(req,res){
    console.log(req.body)
    const user= req.body.user;
    const email= req.body.email;
    const password= req.body.password;
    if(!user || !email || !password){
        return res.status(400).send({stauts:"Error",message:"Los campos estan incorrectos"})
    }
    const usuarioARevisar = usuarios.find(usuario=> usuario.user === user);
    //if (usuarioARevisar){
      //  return res.status(400).send({stauts:"Error",message:"Este usuario ya existe"})
    //}

    const salt = await bcrypjs.genSalt(5);
    const hashPassword =await bcrypjs.hash(password,salt);
    console.log(hashPassword);
    const nuevoUsuario ={
        user,email,password:hashPassword
    }

    
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({stauts:"ok",message:`Usuario ${nuevoUsuario.user} agregado`,redirect:"/"})
}

export const methods ={
    login,
    register
}