const mongoose = require('mongoose');

const connectDB= async ()=>{
    try {
        const conn= await mongoose.connect('mongodb://localhost/myBlogDB',
        {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error connecting `);
        process.exit(1);
    }

}
module.exports= connectDB;