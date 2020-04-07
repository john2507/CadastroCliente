const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/User")
const User = mongoose.model("users")
const bcrypt = require ('bcryptjs')
const passport = require('passport')
const {eAdmin} = require ("../helpers/eAdmin")



router.get('/registro',  (req, res)=>{
res.render('usuarios/registro')

})

router.get('/logout', (req,res)=>{
    req.logout()
    req.flash('success_msg', "Deslogado com sucesso")
    res.redirect('/usuarios/login')
})

router.get('/login', (req, res)=>{
    res.render('usuarios/login')
})

router.post("/login",  (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/clientes/clientes",
        failureRedirect: "/usuarios/login",
        failureFlash: true
        
    }) (req, res, next)
})

router.post('/registro/novo', (req, res)=>{

    var erros= []
    
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
                erros.push({texto: "Nome invalido"})
            }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null){
                erros.push({texto: "Email invalido"})
            }

        if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
                erros.push({texto: "Senha invalido"})
            }

            if(req.body.senha.length < 4){
                
                erros.push({texto: "Senha Muito Curta"})
            }


            if(req.body.senha != req.body.senha2){

                erros.push({texto:'As Senha são diferentes, tente outra'})
                
            }

            if(erros.length > 0){

                res.render("usuarios/registro", {erros : erros})

            }else{

                User.findOne({email: req.body.email}).then((users)=>{

                    if(users){
                        req.flash("error_msg", "Ja existe uma conta com esse email")
                        res.redirect('/usuarios/registro')
                    }else{

                        const novousuario = new User({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha,
                        eAdmin : 1

                    })

                    bcrypt.genSalt(10,(erro, salt)=>{

                        bcrypt.hash(novousuario.senha, salt,(erro, hash)=>{
                            if(erro){

                                req.flash('error_msg',"houver um erro durante o salvamento ddo usuario")
                                res.redirect('/usuarios/registro')
                            }
                            
                            novousuario.senha = hash

                            novousuario.save().then(()=>{

                                req.flash('success_msg', 'Usuario Criado com sucesso')
                                res.redirect('/usuarios/login')

                            }).catch((err)=>{

                                req.flash('error_msg',"houver um erro ao criar o usuario, tente novamente!")
                                res.redirect('/usuarios/registro')
                            })
                        })
                    })
                }
                }).catch((err)=>{
                    req.flash("error_msg", "houver um erro interno")
                    res.redirect("/usuarios/registro")
                   
                })


            }

    
})

module.exports = router
