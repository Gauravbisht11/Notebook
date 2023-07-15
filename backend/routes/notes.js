const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router()
//Route 1: fetch all notes   /api/notes/fetchallnotes  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(err)
        res.status(500).send("some error occur")
    }
})

//Route 2: add a note   /api/notes/addnote   login required
router.post('/addnote', fetchuser,
    body('title').isLength({ min: 3 }),
    body('description', ' description must be atleast 5 characters').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const notes = await Notes.create({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id
            })
            res.json(notes)
        } catch (error) {
            console.error(error)
            res.status(500).send("some error occur")
        }
    })
//Route 3: update a note   /api/notes/updatenote   login required

router.put('/updatenote/:id', fetchuser,
    body('title').isLength({ min: 3 }),
    body('description', ' description must be atleast 5 characters').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            //creating a new note
            newNote = {}
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }
            let notes = await Notes.findById(req.params.id)

            if (!notes) {
                return res.status(404).send("Not found")
            }
            if (notes.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }

            notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(notes)

        } catch (error) {
            console.error(error)
            res.status(500).send("some error occur")
        }
    })

//Route 4: delete a note   /api/notes/deletenote   login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let notes = await Notes.findById(req.params.id)
        if (!notes) {
            return res.status(404).send("Not found")
        }
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"note has been deleted",notes:notes})

    } catch (error) {
        console.error(error)
        res.status(500).send("some error occur")
    }
})

module.exports = router



