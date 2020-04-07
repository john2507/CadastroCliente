const mongoose = require("mongoose");
const Schema    =  mongoose.Schema;

const Usuario = new Schema({

    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
});

mongoose.model("usuarios", Usuario)