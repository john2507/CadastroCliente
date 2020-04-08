const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require ("bcryptjs")

// moddel dde usuario 
require("../models/User")
const Usuario = mongoose.model("users")

module.exports = function(passport){
    // qual o campo vou analizar ex email
    passport.use(new localStrategy({usernameField: 'email', passwordField:"senha"},(email, senha, done)=> {

        // vai pesquisar o email comparando com a autenticacao
        Usuario.findOne({email: email}).then((usuario) => {

            if(!usuario){
                // no done a gente passa 3 paramento 
                //  null>nenhuma conta foi autenticada
                // false> com o autencitavao nao autencitou colocou false
                return done(null, false, {message: "Esta conta não Existe"})
            }
            // se a conta existir chamos o bcrypt
            bcrypt.compare(senha, usuario.senha,(erro, batem)=>{

                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false,{message: "Senha Incorreta"})
                }
            })


        })

    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findById(id, (err, usuario)=>{
            done(err, usuario)
        })
    })
}