const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://kodzo:testtest@kodzo.u7u0jcl.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));
  
