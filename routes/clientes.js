const express = require('express');
const router = express.Router();
const mongoose = require ("mongoose");
require("../models/Clientes");
const Cliente = mongoose.model("clientes")
const {eAdmin} = require ("../helpers/eAdmin")


router.get('/cadastro', (req, res) =>{
    
    res.render("clientes/add");

});


// listar clientes
router.get('/clientes', eAdmin, (req, res) =>{

    Cliente.find().sort({date:'desc'}).then((clientes)=>{

        res.render("clientes/clientes", { clientes : clientes.map(Cliente=>Cliente.toJSON())})

    }).catch((err)=>{
        req.flash("error_msg", "houver um erro ao listar os Clientes")
        res.redirect("/admin")
    })
    
});


router.post("/clientes/delete", eAdmin, (req, res)=>{
    Cliente.remove({_id:req.body.id}).then(() => {
        req.flash("success_msg", "Cliente excluido com Sucesso")
        res.redirect("/clientes/clientes")
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao Excluir")
        res.redirect("/clientes/clientes");
    })
})
 
// caddastrar cliejtes

router.post("/cadastro/novo",eAdmin, (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
         erros.push({texto: "NOME INVALIDO"})
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "NOME COM CARACTERES PEQUENO"});
    }
    
    if(erros.length > 0){
        res.render("clientes/add", {erros: erros})
    }   
    else {

        const novoUsuario = {
            nome:       req.body.nome,
            banco:      req.body.banco,
            produto:    req.body.produto,
            tipo:       req.body.tipo,
            valor:      req.body.valor,
            status:      req.body.status,
            obs:        req.body.obs,
            telefone:   req.body.telefone
        }
        new Cliente(novoUsuario).save().then(()=>{
            req.flash("success_msg", "Cliente cadastrado Com Sucesso!")
            res.redirect("/clientes/clientes")
    
        }).catch(()=>{
            req.flash("error_msg","erro ao caddastrar")
           res.redirect("/clientes/clientes")
        })
    }

    
    router.get("/clientes/edit/:id", eAdmin,(req, res)=>{
   
        Cliente.findById({_id:req.params.id}).then((clientes)=>{
            
            res.render("clientes/editClientes", {clientes: clientes.toJSON()})
          // res.redirect("clientes/clientes")
    
        }).catch((err)=>{
             req.flash("erro_msg", "Erro ao Editar Clientes")
             res.redirect("clientes/clientes")
        })
        
    })


    
    
// editar clientes
    router.post("/clientes/edit", eAdmin,(req, res)=>{
   
        Cliente.findById({_id:req.body.id}).then((clientes) => {

        clientes.nome    =   req.body.nome
        clientes.banco   =   req.body.banco
        clientes.produto =   req.body.produto
        clientes.tipo    =   req.body.tipo
        clientes.valor   =   req.body.valor
        clientes.status  =   req.body.status
        clientes.obs     =   req.body.obs
        clientes.telefone =  req.body.telefone
    
    
        clientes.save().then(()=>{
        req.flash("success_msg", "Cliente Alterado Com Sucesso!")
        res.redirect("/clientes/clientes")

    }).catch((err)=>{
        req.flash("error_msg", "Houve Um Erro ao Salvar o Cliente")
            res.redirect("/clientes/clientes")
        }).catch((err)=>{
            req.flash("error_msg", "houver Um Erro ao Editar o Cliente")
            res.redirect("/clientes/clientes")
        })

    })
})
})


module.exports = router
