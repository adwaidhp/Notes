const express = require("express");
const router = express.Router();
const requireAuth=require("../middleware/requireAuth.js")
const {
  viewNotes,
  viewNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller.js");

router.get("/",requireAuth, viewNotes);
router.get("/:id",requireAuth, viewNoteById);
router.post("/",requireAuth, createNote);
router.put("/:id",requireAuth, updateNote);
router.delete("/:id",requireAuth, deleteNote);
module.exports = router;
