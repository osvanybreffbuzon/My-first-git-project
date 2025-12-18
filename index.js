//import {displayMenu} from "./displayMenu.js"
//import {choiceOptions} from "./choiceOptions.js"
//import chalk from "chalk"
import express from "express";
import readUsers  from "./Actions/readUsers.js";
import cors from "cors";
import {conection} from './Actions/conection.js';
//import {morgan} from "morgan";
//import bodyParser from "body-paser";
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

//app.use(morgan("dev"));

//Settings
app.set("PORT",3001);

//Routes
app.get("/",()=>{
console.log("Hola desde el Home de la página"); 

})

app.get("/estudiantes",async (req,res)=>{

 try{
 const response =  await readUsers();

 res.status(200).json({response});
 console.log(response);
 }
 catch(error){
    res.status(500).json(error);      
    console.log(error);
}

})

app.post("/agregar",async (req,res)=>{
    
let {nombre,apellido, sexo,edad,direccion, grado,grupo} = req.body;

    try{
    console.log("Insertando estudiantes");
    console.log(req.body);
    let db = await conection();
    let [response]= await db.execute('INSERT INTO estudiantes (nombre,apellido, sexo,edad,direccion, grado,grupo) VALUE(?,?,?,?,?,?,?)',[nombre,apellido, sexo,edad,direccion, grado,grupo]);
    res.status(200).json(req.body);
    }

catch(error){
    res.status(500).json(error);      
}

finally{

    res.end();
  }
  
 })

app.listen(app.get("PORT"),()=>{
 console.log("Hola desde express");
});


/* console.log("Iniciando proyecto en Node JS");
displayMenu();
choiceOptions(); */



