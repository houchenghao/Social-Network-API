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
    },
    async getSingleThought(req,res){
        try{
            thoughtData = await Thought.findOne(
                {
                    _id: req.params.thoughtId
                }
            )
            .select('-__v')
            if(!thoughtData){
                res.status(404).json({ message:'No thought with that ID'})
            }else{
                res.json(thoughtData);
            };
        }catch(err){
            res.status(500).json(err);
        }
    },
    async updateUser(req,res){
        try{
            thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body},
                { runValidators: true, new: true}
            );
            if(!thoughtData){
                res.status(404).json({message:'No Thought with id'})
            }else{
                res.json(thoughtData);
            }

            // thoughtDataOriginal = await Thought.findOne(
            //     { _id: req.params.thoughtId }
            // );
            // if(!thoughtDataOriginal){
            //     res.status(404).json({message:'No Thought with id'})
            // }else{
            //     userWithThisThought = await User.findOne(
            //         { thoughts: {$in: thoughtDataOriginal._id}}
            //     );

            //     if(userWithThisThought._id === req.body.userId){
            //         thoughtData = await Thought.findOneAndUpdate(
            //             { _id:req.params.thoughtId },
            //             { $set: req.body},
            //             { runValidators: true, new: true}
            //         )
            //         res.json(thoughtData)
            //     }else{

            //     }
                    
            // }


            
        }catch(err){
            res.status(500).json(err);
        }
    }
}