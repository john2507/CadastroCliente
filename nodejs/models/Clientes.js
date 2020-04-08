 
const mongoose = require("mongoose");
const Schema    =  mongoose.Schema;

const Cliente = new Schema({

    nome: {
        type: String,
        required: true
    },
    
    banco: {
        type: String,
        required: true
    },
    produto: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    obs: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now()
    },
    
});

mongoose.model("clientes", Cliente)