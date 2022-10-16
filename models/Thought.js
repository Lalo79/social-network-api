const { Schema, model } = require('mongoose');
const Reaction = require('./Reactions');


const thoughtSchmema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

thoughtSchmema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });


const Thought = model('thought', thoughtSchmema);

module.exports = Thought;