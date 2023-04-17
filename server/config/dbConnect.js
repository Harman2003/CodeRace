const mongoose = require('mongoose');

const connectDB = async (uri) => {
    mongoose.set("strictQuery", true);
    try {
        await  mongoose.connect(
          MONGO_URI,
          {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          }
        );
    } catch(err) {
        console.log(err)
    }
    
}

module.exports= connectDB
