import React from "react";
import Editor from "../editor/editor";
import Sidebar from "../sidebar/sidebar";

import history from "../history/history";
import { Button } from "antd";
import "../App.css";
const firebase = require("firebase");

export default class Main extends React.Component {
  state = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null,
    userEmail: null,
  };

  render() {
    return (
      <div>
        <Button danger shape="round" id="signoutBtn" onClick={this.signout}>
          Sign Out
        </Button>
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          selectedNote={this.selectedNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        ></Sidebar>

        {this.state.selectedNote ? (
          <Editor
            selectedNote={this.state.selectedNote}
            // selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            updateNote={this.updateNote}
          ></Editor>
        ) : null}
      </div>
    );
  }

  selectedNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      if (this.state.notes.length > 1) {
        this.selectedNote(
          this.state.notes[this.state.selectedNoteIndex - 1],
          this.state.selectedNoteIndex - 1
        );
      } else {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
    }

    firebase
      .firestore()
      .collection("users")
      .doc(this.state.userEmail)
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  // NEW NOTE

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await firebase
      .firestore()
      .collection("users")
      .doc(this.state.userEmail)
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };

  updateNote = (id, noteObj) => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.userEmail)
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (_user) => {
      if (!_user) {
        history.push("/");
      } else {
        await firebase
          .firestore()
          .collection("users")
          .doc(_user.email)
          .collection("notes")
          .onSnapshot(async (serverUpdate) => {
            const notes = serverUpdate.docs.map((_doc) => {
              const data = _doc.data();
              data["id"] = _doc.id;
              return data;
            });

            await this.setState({ notes: notes, userEmail: _user.email });
          });
      }
    });
  }
  signout = () => {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
          history.push("/");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    } else {
      // No user is signed in.
      console.log("no users");
    }
  };
}
