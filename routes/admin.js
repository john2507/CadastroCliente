const express = require('express');
const router = express.Router();
const mongoose = require ("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios")
const {eAdmin} = require ("../helpers/eAdmin")


router.get('/', eAdmin, (req, res) =>{
    
    res.render("admin/usuarios");

});




router.get('/usuarios', eAdmin, (req, res) =>{

    Usuario.find().sort({date:'desc'}).then((usuarios)=>{

        res.render("admin/usuarios", { usuarios : usuarios.map(Usuario=>Usuario.toJSON())})

    }).catch((err)=>{
        req.flash("error_msg", "houver um erro ao listar os Clientes")
        res.redirect("/admin")
    })
    
});

router.get("/usuarios/edit/:id", eAdmin, (req, res)=>{
    Usuario.findById({_id:req.params.id}).then((usuarios)=>{
        
        res.render("admin/editusuarios", {usuarios: usuarios.toJSON()})

    }).catch((err)=>{
        req.flash("erro_msg", "Erro ao Editar  Clientes")
        res.redirect("admin/usuarios")
    })
    
})
router.post("/usuarios/edit", eAdmin, (req, res)=>{
   
    Usuario.findById({_id:req.body.id}).then((usuarios)=>{
    usuarios.nome = req.body.nome
    usuarios.endereco =req.body.endereco
    usuarios.email = req.body.email

    usuarios.save().then(()=>{
    req.flash("success_msg", "Cliente Alterado Com Sucesso!")
    res.redirect("/admin/usuarios")
}).catch((err)=>{
    req.flash("error_msg", "Houve Um Erro ao Salvar o Cliente")
})
    }).catch((err)=>{
        req.flash("error_msg", "houver Um Erro ao Editar o Cliente")
        res.redirect("/admin/usuarios")
    })
})

router.post("/usuarios/novo", eAdmin, (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
         erros.push({texto: "NOME INVALIDO"})
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "NOME COM CARACTERES PEQUENO"});
    }
    
    if(erros.length > 0){
        res.render("admin/addUsuarios", {erros: erros})
    }   
    else {

        const novoUsuario = {
            nome: req.body.nome,
            endereco: req.body.endereco,
            email: req.body.email
        }
        new Usuario(novoUsuario).save().then(()=>{
            req.flash("success_msg", "Cliente cadastrado Com Sucesso!")
            res.redirect("/admin/usuarios")
    
        }).catch(()=>{
            req.flash("error_msg","erro ao caddastrar")
           res.redirect("/admin")
        })
    }

})

router.post("/usuarios/delete", eAdmin, (req, res)=>{
    Usuario.remove({_id:req.body.id}).then(()=>{
        req.flash("success_msg", "Cliente excluido com Sucesso")
        res.redirect("/admin/usuarios")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao Excluir")
        res.redirect("/admin/usuarios");
    })
})

router.get('/usuarios/add', eAdmin, (req, res) =>{
    
    res.render("admin/addUsuarios");

});


module.exports = router