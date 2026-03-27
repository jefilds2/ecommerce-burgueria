import app from './app.js';
import './database/index.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀Server is running on port ${PORT}`));