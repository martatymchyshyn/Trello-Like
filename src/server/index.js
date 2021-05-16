 import express from 'express';
 import bodyParser from 'body-parser';
 import listRoutes from './routes.js'
 import cors from 'cors'

 const app = express();
 const PORT = 8090;


 app.use(cors());


 app.use(bodyParser.json());
 app.use('/lists', listRoutes)



 app.listen(PORT, () => console.log(`Server started om port: http://localhost:${PORT}`));

 app.get('/health-check', (req, res) => {
     console.log('Server is OK');
     res.send("Server is running");
 })