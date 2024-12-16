const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * Add, Replace, or Delete a Note or Description
 * _________________________
 *
 * @param {String} glyphName - The name of the icoGlyph to update.
 * @param {String} newNote - The new note or description to add or replace.
 * @param {"devNote", "userNote", "description", "publicName"} noteType - The type of note to modify.
 * @param {String} action - The action to perform: "add", "replace", or "delete".
 */
async function updateString(glyphName, newNote, noteType, action) {
  const validNoteTypes = ["devNote", "userNote", "description", "publicName"];
  if (!validNoteTypes.includes(noteType)) {
    console.error(
      `Error: The note type "${noteType}" is invalid. Valid types: ${validNoteTypes.join(
        ", "
      )}.`
    );
    return;
  }

  const validActions = ["add", "replace", "delete"];
  if (!validActions.includes(action)) {
    console.error(
      `Error: The action "${action}" is invalid. Valid actions: add, replace, delete.`
    );
    return;
  }

  await readAndUpdateJSON(async (jsonData) => {
    const glyph = jsonData[glyphName];

    // Check if the glyph exists
    if (!glyph) {
      console.error(
        `Error: The icoGlyph with the name "${glyphName}" does not exist.`
      );
      return;
    }

    if (noteType === "publicName") {
      if (action === "add") {
        if (!glyph.metadata.publicName) {
          glyph.metadata.publicName = newNote;
          console.log("Public name replaced.");
        } else {
          console.error(
            "The public name can only be replaced or deleted. No changes made."
          );
        }
      } else if (action === "replace") {
        glyph.metadata.publicName = newNote;
        console.log("Public name replaced.");
      } else if (action === "delete") {
        delete glyph.metadata.publicName;
        console.log("Public name deleted.");
      }
    } else if (noteType === "description") {
      // Manage description
      if (action === "add") {
        if (!glyph.metadata.description) {
          glyph.metadata.description = newNote;
          console.log("New description added.");
        } else {
          console.log("The description already exists. No changes made.");
        }
      } else if (action === "replace") {
        glyph.metadata.description = newNote;
        console.log("Description replaced.");
      } else if (action === "delete") {
        delete glyph.metadata.description;
        console.log("Description deleted.");
      }
    } else {
      // Manage other types of notes (devNote, userNote)
      if (!glyph.metadata.notes) glyph.metadata.notes = {};

      if (action === "add") {
        if (!glyph.metadata.notes[noteType]) {
          glyph.metadata.notes[noteType] = newNote;
          console.log(`New note added for "${noteType}".`);
        } else {
          console.log(
            `The note "${noteType}" already exists. No changes made.`
          );
        }
      } else if (action === "replace") {
        glyph.metadata.notes[noteType] = newNote;
        console.log(`Note "${noteType}" replaced.`);
      } else if (action === "delete") {
        delete glyph.metadata.notes[noteType];
        console.log(`Note "${noteType}" deleted.`);
      }
    }

    // Save the changes to the file
    console.log(`Modification saved for "${glyphName}".`);
  });
}

/**
 * Push text for userNote, devNote or description
 * ______________________________________________
 *
 * @dev If an object is replaced with an empty string, this object is deleted
 * @param {string} icoGlyphName
 * @param {string} textToAdd
 * @param {"devNote" | "userNote" | "description"} noteType - Will set where the note is created or pushed
 * @param {"add" | "replace" | "delete"} action - Specify whether to add, replace, or delete the note
 */

const noteData = {
  icoGlyphName: "9",

  textToAdd: "Public name of 9",

  noteType: "publicName",

  action: "add",
};

/** @function */
updateString(
  noteData.icoGlyphName,
  noteData.textToAdd,
  noteData.noteType,
  noteData.action
);
