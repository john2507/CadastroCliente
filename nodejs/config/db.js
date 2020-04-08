const mongoose = require('mongoose')
const URI = "mongodb+srv://test:John2507@cluster0-9x4i9.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
    console.log('banco conectado virtual')
}
module.exports = connectDB;







// if(process.env.NODE_ENV == "production"){
//     module.exports = {mongoURI:"mongodb://test:John2507@cluster0-shard-00-00-9x4i9.mongodb.net:27017,cluster0-shard-00-01-9x4i9.mongodb.net:27017,cluster0-shard-00-02-9x4i9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"}
    
// }else{

//     module.exports = {mongoURI:"mongodb://localhost/appcli"}
// }