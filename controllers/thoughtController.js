const { User,Thought } = require('../models')

module.exports = {
    async getThoughts(req,res){
        try{
            thoughtsData = await Thought.find();
            res.json(thoughtsData);
        }catch(err) {
            res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try{
            thoughtsCreateData = await Thought.create(req.body);
            
            thoughtData = await User.findOneAndUpdate(
                { _id:req.body.userId},
                { $addToSet: {thoughts: thoughtsCreateData._id}},
                { new: true}
            )
            res.json(thoughtData);
                
        }catch(err) {
            return res.status(500).json(err);
        }
    }
}