// all notes code are written here

const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//  Route1: Get all notes using : GET /api/notes/fetchallnotes  :Login requied

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route2: add all notes of the user : POST /api/notes/addnote :Login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are error return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      res.json(savenote);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//  Route3: update all notes of the user : POST /api/notes/updatenote :Login required

router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    //cerate a new note object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "wrong user credentials" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Unauthorized access");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  }
);
module.exports = router;
