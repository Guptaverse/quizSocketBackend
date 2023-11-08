const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

    quizData:{
        type:Array,
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Number,
        default:Date.now()
    }
});

module.exports = mongoose.model("Quiz", quizSchema);