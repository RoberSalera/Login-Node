import mongoose from "mongoose";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { autoIndex: false });

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);

export default User;