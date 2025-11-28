import express from "express";
import {filter} from '../Database/DB.js';

const router = express.Router();

router.get('/',async(req,res) => {
    try{
        const result = await filter(req.query);

        res.send(result);
    }catch(e){
        console.log(e); 
    }
});



export default router;