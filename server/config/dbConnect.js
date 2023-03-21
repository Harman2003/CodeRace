const mongoose = require('mongoose');

const connectDB = async (uri) => {
    mongoose.set("strictQuery", true);
    try {
        await  mongoose.connect(
          "mongodb+srv://Harman2003:Gurtaj2003@cluster.nav2r08.mongodb.net/CodeRace?retryWrites=true&w=majority",
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