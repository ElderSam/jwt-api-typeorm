import express from 'express';
import './database/connect';
import routes from './routes';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));