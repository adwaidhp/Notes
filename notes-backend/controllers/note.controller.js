const Note = require("../models/note.js");

const viewNotes = async (req, res) => {
  try {
    const note = await Note.find({ user: req.user._id });
    res.status(200).json({ note });    
  } catch (error) {
    console.log(error)
  }

};

const viewNoteById = async (req, res) => {
  try {
    const noteid = req.params.id;
    const note = await Note.findOne({ _id: noteid, user: req.user._id });
    res.status(200).json({ note });
  } catch (error) {
    console.log(error);
  }

};

const createNote = async (req, res) => {
try {
  const { title, body } = req.body;
  const notes = await Note.create({
    title,
    body,
    user: req.user._id,
  });
  res.json({ notes });
} catch (error) {
  console.log(error)
}


};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;
    const notes= await Note.findById(id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found " });
    }
    await Note.findOneAndUpdate({_id:id,user:req.user._id}, { title, body });
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteid = req.params.id;
    const userid= req.user._id;
    console.log(userid);
    await Note.deleteOne({_id:noteid,user:userid});
    
    res.status(200).json({ message: "Deleted successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  viewNotes,
  viewNoteById,
  createNote,
  updateNote,
  deleteNote,
};
/*
app.get("/notes/:title",async(req,res)=>{
    try {
        const {title} = req.params;
        const note=await Note.findOne({title});
        if (note){
            res.status(200).json({note})
        } else{
            res.status(404).json({message:"Note not found"});
        }
    }
     catch (error) {
        res.status(500).json({message:error.message});
    }
})
*/
