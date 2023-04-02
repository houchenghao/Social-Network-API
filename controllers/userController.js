const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            userData = await User.find()
            res.json(userData);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req,res) {
        try{
            userData = await User.create(req.body);
            res.json(userData)
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async getSingleUser(req,res) {
        try{
            userData = await User.findOne(
                {
                    _id: req.params.userId
                }
            )
            .select('-__v')
            if(!userData){
                res.status(404).json({ message: 'No user with that ID'})
            }else{
                res.json(userData)
            };
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req,res) {
        try{
            userData = await User.findOneAndUpdate(
                {_id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!userData){
                res.status(404).json({message:'No User with this id'});
            }else{
                res.json(userData);
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
};