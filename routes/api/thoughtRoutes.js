const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateUser
} = require('../../controllers/thoughtController');


router.route('/')
.get(getThoughts)
.post(createThought)

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateUser)

module.exports = router;