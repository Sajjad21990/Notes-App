import React, { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { DeleteForeverRounded } from "@material-ui/icons";
import { Row, Col, Card, Typography } from "antd";

import { removeHTMLTags } from "../helpers";

export default class SidebarItem extends Component {
  render() {
    const { _index, _note, selectedNoteIndex } = this.props;

    return (
      <div>
        <div key={_index}>
          <ListItem
            className="selected-list-item"
            selected={selectedNoteIndex === _index}
            alignItems="flex-start"
          >
            <div
              className="text-section"
              onClick={() => this.selectNote(_note, _index)}
            >
              <ListItemText
                primary={_note.title}
                secondary={removeHTMLTags(_note.body.substring(0, 30) + "...")}
              ></ListItemText>
            </div>
            <DeleteForeverRounded
              onClick={() => this.deleteNote(_note)}
              className="delete-icon"
            ></DeleteForeverRounded>
          </ListItem>
        </div>
      </div>
    );
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete ${note.title}`)) {
      this.props.deleteNote(note);
    } else {
      return;
    }
  };
}
