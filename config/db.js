if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI:"teste-shard-00-02-7qetw.mongodb.net:27017"}
}else{

    module.exports = {mongoURI: "mongodb://localhost/appcli"}
}