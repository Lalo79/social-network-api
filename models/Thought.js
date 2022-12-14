const { Schema, model } = require('mongoose');
const Reaction = require('./Reactions');


const thoughtSchema = new Schema (
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
              type: Schema.Types.ObjectId,
              ref: 'user',
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

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;