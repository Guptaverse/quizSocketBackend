const short = require("short-uuid");
const quiz = require("../models/quiz");

exports.createQuiz = async (req, res) => {
  try {
    
    console.log(req.body)
    const { quizData } = req.body;
    const roomId = short.generate();
    const newQuiz = new quiz({ 
      quizData,
      roomId,
    });
    await newQuiz.save();
    console.log(newQuiz)
    res.status(200).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuiz = async (req, res) => {
    try {
        const {roomId} = req.body;
        const quizData = await quiz.findOne({roomId});
        res.status(200).json(quizData);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};
