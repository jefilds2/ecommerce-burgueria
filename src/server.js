import app from './app.js';
import './database/index.js';
import 'dotenv/config';

app.listen(3001, () => console.log('🚀 Server is running on port 3001'));
