const { Schema, model } = require ('mongoose');
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: string,
            unique: true,
            required: true,
            trimmed:true
        },
        email: {
            type: string,
            required: true,
            unique: true,
            validate:{
                validator: isEmail,
                message: 'Invalid email.'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]      
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

//create  a virtual property 'friendCount' that get the amount of friends length
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
