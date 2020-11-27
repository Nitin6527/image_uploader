const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
var cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('./model/postSchema');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

 
  const upload = multer({
    storage: storage
  });


const app = express();
let port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/images')));



mongoose.connect('mongodb+srv://nitin_123:nitin@123@cluster0.x2gkl.mongodb.net/uploadimage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });


app.get("/getImages",cors(),(req,res)=>{
    Post.find({},(err,found)=>{
        if(!err){
            res.json(found);
        }else{
            res.json(err);
        }
    });
});


app.post("/postImage", upload.single('photo'), function(req, res,next) {
    const post = new Post({
      postImage: req.file.filename,
      image_path: req.file.path
    });
    post.save().then(result=>{
      res.json(result);
    })
    .catch(err=>{
        res.json(err);
    })
  });

app.listen(port,()=>{
    console.log('server started at 5000')
})