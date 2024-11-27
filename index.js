import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = new express()

const start = async ()=>{
    const port = process.env.PORT
    try{
        await app.listen(port, ()=>console.log("started at port: ", port))
    }
    catch(e){
        console.log(e.message);        
    }
}
start()