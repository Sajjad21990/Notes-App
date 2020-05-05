import React, { Component } from "react";
import { Card, Typography, Button, Popconfirm, message } from "antd";

import { removeHTMLTags } from "../helpers";

export default class Notes extends Component {
  render() {
    const { _index, _note, onClose } = this.props;

    return (
      <div>
        <Card
          actions={[
            // <Button
            //   danger
            //   size="small"
            //   onClick={() => this.deleteNote(_note)}
            // >
            //   Delete
            // </Button>,
            <Button
              type="primary"
              ghost
              shape="round"
              size="small"
              onClick={() => {
                this.selectNote(_note, _index);
                onClose();
              }}
            >
              Edit Note
            </Button>,
            <Popconfirm
              placement="rightBottom"
              title={`Are you sure you want to delete: ${_note.title}`}
              onConfirm={() => this.deleteNote(_note)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small" shape="round">
                Delete Note
              </Button>
            </Popconfirm>,
          ]}
          title={_note.title}
          bordered={true}
          hoverable={true}
          size="default"
          type="inner"
          style={{
            width: 220,
            textAlign: "center",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          <Typography>
            {removeHTMLTags(_note.body.substring(0, 30) + "...")}
          </Typography>
        </Card>
      </div>
    );
  }

  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (note) => {
    this.props.deleteNote(note);
    message.info(`${note.title} deleted successfully`);
  };
}
