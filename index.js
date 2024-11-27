import express from 'express';

const app = new express()

const start = async ()=>{
    try{
        await app.listen(5000,()=>console.log("started at port: ", 5000))
    }
    catch(e){
        console.log(e);        
    }
}
start()