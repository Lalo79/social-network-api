const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../controllers/userController');


router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);


router.route('/friends/:userId')
    .post(addFriend);

router.route('/friends/:userId/:friendId')
    .delete(removeFriend);

    

module.exports = router;