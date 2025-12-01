import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import filterRoutes from './routes/filter.js'

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/' , async(req , res) => {
    try{
    res.send("<h1>Hello</h1>")
    } catch(e){
        console.log(e);
    }
})

app.listen(PORT, () => {
    console.log(`sever listening on the Port http://localhost:${PORT}`);
})

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});


app.use('/filter' , filterRoutes);
