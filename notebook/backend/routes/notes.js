const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')

  //Route:1 route to fetch user's notes

  router.get('/getnotes', fetchuser, async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id })
      res.json(notes)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }

    })

//Route:2 route to add notes
router.post('/addnotes',fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const notes = new Notes({
      title, description, tag, user: req.user.id
    })
    const saveNote = await notes.save()
    res.json(saveNote)

  } catch (error) {
    console.error(error.message);
    res.status(500).send(
      'Internal Server Error'
    )
  }

})
module.exports = router 