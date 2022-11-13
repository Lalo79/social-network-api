const router = require('express').Router();


const {
    getThoughts,
    getSingleThought,
    updateThought,
    createThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,
} = require('../controllers/thoughtcontroller');


router.route('/')
    .get(getThoughts)
    .post(createThought);

router  
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/reactions/:thoughtId')
    .post(addThoughtReaction);

router
    .route('/reactions/:thoughtId/:reactionId')
    .delete(removeThoughtReaction);




module.exports = router;