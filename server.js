const express=require('express');
const path=require('path');
const app=express();
app.use(express.static(__dirname+'/dist/real-puzzle'));
app.get('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname+'/dist/real-puzzle/index.html'))
});
app.listen(process.env.PORT || 8080);