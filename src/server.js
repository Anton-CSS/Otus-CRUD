import express from 'express';
const PORT = 7000;

const app = express();

app.use(express.json());

app.listen(PORT,()=>console.log('The server is working on port ' + PORT))