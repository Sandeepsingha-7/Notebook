const mongoose=require('mongoose');
const mongoURI="mongodb+srv://sandeepsingha53:sand0361@cluster0.emwuwus.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo=()=>{
  mongoose.connect(mongoURI).then(()=>
    console.log(`Connect to mongo successfully`)
  )
}
module.exports=connectToMongo