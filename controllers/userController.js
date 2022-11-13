const { User, Thought} = require('../models');

module.exports = {

  getUsers(req, res) {
    User.find({})
    .populate('thoughts', '')
    .populate({path: 'friends', select: ''})

    .then((users) => {
      let results = [];
      users.map((el) => {
        results.push({
            username: [{userId: el._id, username: el.username, email:el.email}],
            friends: el.friends.map(ell => [{friendId: ell._id, friendName: ell.username}]),
            thoughts: el.thoughts.map(elll => [{thoughtId: elll._id, thoughtText: elll.thoughtText}])
        })
    })
      res.json(results)})
      // res.json(users)})


    .catch((err) => res.status(500).json(err));
  },

  createUser (req, res) {
    User.create(req.body)
    .then((userData) => res.json(userData))
    .catch((err) => res.status(500).json(err));
    
  },
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')

      .then((users) => {
          if (!users) {
            res.status(404).json({ message: 'No user with that ID' })          
          } else {
            let results = [];
            
              results.push({
                  username: [users.username, users._id],
                  friends: users.friends.map(ell => [{friendId: ell._id, friendName: ell.username}]),
                  thoughts: users.thoughts.map(elll => [{thoughtId: elll._id, thoughtText: elll.thoughtText}])
                })
            
            res.json(results);
          }
        }
      )
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'No User found with this id!' })
          : res.json(data)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this id!' })
          : Thought.deleteMany(
              { username: req.params.userId },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Video created but no user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {

    User.find(
      { _id: req.body.friendId }
    )
    .then((data) => {

      if (!data) {
        res.status(404).json({ message: 'No User found with this id, please select a valid User' })
      } else {

        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body.friendId } },
          { runValidators: true, new: true }
        )
          .then((data) =>
            !data
              ? res.status(404).json({ message: 'Ther is no User found with this id!' })
              : res.json(data)
          )
          .catch((err) => res.status(500).json(err));

      }
      
    })
    .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'No User/Friend with this id!' })
          : res.json(data)
      )
      .catch((err) => res.status(500).json(err));
  }


};