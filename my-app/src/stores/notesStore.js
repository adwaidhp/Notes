import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: [],
  createForm: {
    title: "",
    body: "",
  },
  updateForm: {
    _id: null,
    title: "",
    body: "",
  },
  fetchNotes: async () => {
    //Fetch the notes
    const res = await axios.get("/notes");
    //Set the state
    set({ notes: res.data.note });
  },
  updateCreateFormField: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();
    const { createForm, notes } = notesStore.getState();
    //Create the note
    const res = await axios.post("/notes", createForm);

    //Update state
    set({
      notes: [...notes, res.data.notes],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNote: async (_id) => {
    //Delete the note
    await axios.delete(`/notes/${_id}`);
    const { notes } = notesStore.getState();
    //Update State
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    set({ notes: newNotes });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },
  toggleUpdate: ({ _id, title, body }) => {
    //Set state on update form
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },
  updateNote: async () => {

    const {
      updateForm: { title, body, _id },
      notes,
    } = notesStore.getState();
    //Send the update request
    try {
        const res = await axios.put(`/notes/${_id}`, {
            title,
            body,
          });
          //Update state
          const newNotes = [...notes];
          const noteIndex = notes.findIndex((note) => {
            return note._id === _id;
          });
          newNotes[noteIndex] = res.data.note;
          set({
            notes: newNotes,
            updateForm: {
              _id: null,
              title: "",
              body: "",
            },
          });
    } catch (error) {
        console.error('Error updating note: ',error)
        
    }
    
  },
}));

export default notesStore;
