const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a note
router.post('/', auth, async (req, res) => {
  const { name, text } = req.body;
  const note = new Note({ name, text, user: req.user });
  await note.save();
  res.json(note);
});

// Get all notes for the authenticated user
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// Get a specific note by ID for the authenticated user
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch {
    res.status(400).json({ error: 'Invalid note ID' });
  }
});

// Update a note by ID for the authenticated user
router.put('/:id', auth, async (req, res) => {
  const { name, text } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name, text },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch {
    res.status(400).json({ error: 'Invalid note ID' });
  }
});

// Delete a note by ID for the authenticated user
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch {
    res.status(400).json({ error: 'Invalid note ID' });
  }
});

module.exports = router;
