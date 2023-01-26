const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "51@Jotaa",
    database: "banco",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) =>{
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) =>{
                db.query(
                    "INSERT INTO usuario (email, password) VALUES (?, ?)", 
                    [email, hash], 
                    (error, response) => {
                    if(err){
                        res.send(err);
                    }
                        
                    res.send({msg: "cadastrado com sucesso"});
                 
                }); 
            });
        }else{
            res.send({msg: "Usuario ja cadastrado" });
        }  
    });
});

app.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err,result) => {
        if(err){
            req.send(err);
        }
        if(result.lenght > 0){
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(error){
                    res.send(error);
                }
                if(response){
                    res.send({msg:"Usuario logado"});
                }else{
                    res.send({msg:"Senha incorreta"});
                }
            });   
        }else{
            res.send({msg:"Conta não encontrada"});
        }
    });
});

app.listen(3001, () => {
    console.log("Rodando na porta 3003");
});