const mongoose = require('mongoose');

// configurando o mongoose

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cadastro", {
    useMongoClient:true
}).then(()=>{

console.log("Mongodb conectado")


}).catch((err)=>{
    console.log("erro", err)

});

// criando uma tabela no mongo 

const UserSchema = mongoose.Schema({


    nome:{
        type: String,
        require: true
    }
})

// dando nome a minha colecao 
mongosse.model('users', userSchema);

// criando ddados 
basr
const values = mongosse.model('users')

new values({

    nome:"john"
}).save().then(()=>{

    console.log("ususario ok")

}).catch((err)=>{

    console.log("error",err)
})
