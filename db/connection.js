const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("____MongoDB Atlas Connected_____");
}).catch((err)=>{
    console.log(`____MongoDB Connection Failed ${err}`);
})