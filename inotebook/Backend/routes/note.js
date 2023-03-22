const express = require("express");
const router = express.Router();
const notes = require("../model/notesSchema");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  const page = 1;
  const limit = 10;
  let skip = (page - 1) * limit;
  const note = await notes.find({ user: req.user.id }).skip(skip).limit(limit);
  res.json(note);
});

router.post(
  "/addnote",
  fetchuser,
  body("title", "Enter valid title").isLength({ min: 3 }),
  body("description", "Enter valid description").isLength({ min: 3 }),
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      return res.json(saveNote);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const UpdatenewNote = {};

  if (title) {
    UpdatenewNote.title = title;
  }
  if (description) {
    UpdatenewNote.description = description;
  }
  if (tag) {
    UpdatenewNote.tag = tag;
  }

  let note = await notes.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("Not allowed");
  }

  note = await notes.findByIdAndUpdate(
    req.params.id,
    { $set: UpdatenewNote },
    { new: true }
  );
  res.json({ note });
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await notes.findById(req.params.id);

    if (!note) {
      return res.status(400).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("Not allowed");
    }
    note = await notes.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
