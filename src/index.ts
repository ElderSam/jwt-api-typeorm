
const app = require('./server');
import connection from './database/connect';

connection.create();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`✔️  Server started at http://localhost:${PORT}`));