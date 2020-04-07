const express    = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path       = require('path');
const mongoose   = require('mongoose');
const admin      = require('./routes/admin');
const session    = require('express-session');
const flash      = require('connect-flash');
const usuarios = require('./routes/usuarios');
const clientes = require('./routes/clientes');
const passport = require('passport')
require('./config/auth')(passport)
const db  = require('./config/db')



const app = express();

//secao 
app.use(session({
    secret: "JWLAPP",
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

// flash
app.use(flash())

// Middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})


//public
app.use(express.static(path.join(__dirname, "public")));


//configuracao body_parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Mangosse

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI).then(()=>{

console.log("Mongodb conectado")

}).catch((err) => {
    console.log("erro ao se conectat: " + err)                

});

//rota
app.use('/admin', admin)
app.use('/usuarios',usuarios)
app.use('/clientes', clientes)

app.get('/', (req,res)=>{
    res.render('admin/')
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("servidor rodando!")
})