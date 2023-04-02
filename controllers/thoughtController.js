const { Thought } = require('../models')

module.exports = {
    async getThoughts(req,res){
        try{
            thoughtsData = Thought.find();
        }catch(err) {
            res.status(500).json(err)
        }
    }
}