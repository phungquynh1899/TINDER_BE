const mongoose = require('mongoose');

const connectDB = async()=>{
    //devTinder là 1 db trong cluster này, nó sẽ tự được tạo ra
    await mongoose.connect('mongodb+srv://phungquynh1899:01258184147@devtinder.6bgqf.mongodb.net/devTinder');
}

//sau khi kết nối tới db thành công ta mới app.listen
//cho nên không nên thực hiện đoạn code này ở đây
// connectDB()
// .then(()=>{ console.log('successfully connected')})
// .catch((error)=>{console.log('failed to connect to database')})

//mà ta sẽ export module ra 
module.exports = {connectDB: connectDB}