const { json } = require('express');
const { Thought, User } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find({})
    .populate('username')
    // .populate({path: 'username', select: 'username', justOne: true,})
    .then((thoughts) => {
      let results = [];
      thoughts.map((el) => {
        results.push({
          _id: el._id,
          thoughtText: el.thoughtText,
          createdAt: el.createdAt,
          userId: el.username._id,
          username: el.username.username,
          reactions: el.reactions
          })
      })
      res.json(results)})
      // res.json(thoughts)})
    .catch((err) => res.status(500).json(err));
  },
  
  createThought (req, res) {
    User.findOne(
      {_id: req.body.username}
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'There is No user with that ID' })
      } else {
        Thought.create(req.body)
        .then((data) => {
        
          User.findOneAndUpdate(
            { _id: req.body.username },
            { $addToSet: { thoughts: data._id } },
            { new: true }
          ).then((userData) => console.log('>>>>>', userData, '<<<<<<\n'));
                    
          res.json(data)
        }) 
      }
    })
    .catch((err) => res.status(500).json(err));    
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('username')
      .then((thoughts) => {
          if (!thoughts) {
            res.status(404).json({ message: 'No thought found with that ID' })          
          } else {
            let results = [];
            
              results.push({
                _id: thoughts._id,
                thoughtText: thoughts.thoughtText,
                createdAt: thoughts.createdAt,
                userId: thoughts.username._id,
                username: thoughts.username.username,
                reactions: thoughts.reactions
                })
            
            res.json(results);
          }
        }
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {

    Thought.find(
      { _id: req.params.thoughtId}
    )
    .then((data) => {

      if (req.body.username) {
        if (req.body.username != data.username) {

          User.findOne(
            {_id: req.body.username}
           ).then((currUser) => {

            if (currUser) {

              User.findOneAndUpdate(
                { _id: req.body.username },
                { $addToSet: { thoughts: data[0]._id } },
                { new: true }
              ).catch((err) => {
                console.log(err);
                res.status(500).json(err);  
              });
    
              User.findOneAndUpdate(
                { _id: data[0].username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              ).catch((err) => {
                console.log(err);
                res.status(500).json(err);  
              });
            }
            
           })
           .catch((err) => res.status(500).json({message: 'There is no user with the ID specified, please try again'}))
        }
      }
    }).catch((err) => res.status(500).json({message: 'There is no thought with the ID specified, please try again'}))

    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((data) => {
      !data
      ? res.status(404).json({ message: 'No thought with this id!' })
      : res.json(data)
    }).
    catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  deleteThought(req,res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((data) => {
        !data 
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          ).catch((err) => res.status(500).json(err));
        res.json(data);
      })
      .catch((err) => res.status(500).json(err));

  },

  addThoughtReaction(req, res) {
  
    User.findOne(
      {_id: req.body.username}
     ).then((data) => {

      if (data) {
        const reactionData = {
          username: data.username,
          reactionBody: req.body.reactionBody
        }

        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: reactionData} },
          { runValidators: true, new: true }
        )
          .then((data) =>
            !data
              ? res.status(404).json({ message: 'No thought found with this id!' })
              : res.json(data)
          )
          .catch((err) => res.status(500).json(err));

      } else {
        res.status(404).json({ message: 'We cannot find the user that is creating this Reaction, please indicate a valid User' })
      }
    }).catch((err) =>res.status(500).json({message: 'We cannot find the user that is creating this Reaction, please indicate a valid User'}))

  },

  removeThoughtReaction(req, res) {

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'No Thought/Reaction with this id!' })
          : res.json(data)
      )
      .catch((err) => res.status(500).json(err));
  }

}