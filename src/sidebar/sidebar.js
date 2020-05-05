import React, { Component } from "react";
import { Drawer, Button as Btn, Card, Row, Col, Input as Int } from "antd";

import "../App.css";
import styles from "./sidebar.module.css";
import Notes from "../notes/notes";

export default class Sidebar extends Component {
  state = {
    title: "Untitled",
    addingNote: false,
    visible: false,
  };

  render() {
    const { notes, selectedNoteIndex } = this.props;

    return (
      <div className="sidebar-container">
        {/* <Button
          className="newNoteAddBtn"
          onClick={this.newBtnClick}
          variant="contained"
          color={this.state.addingNote ? "secondary" : "primary"}
        >
          {this.state.addingNote ? "Cancel" : "Add New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              placeholder="Add Note Title"
              onKeyUp={(e) => this.updateTitle(e.target.value)}
            ></input>
            <Button variant="contained" color="primary" onClick={this.newNote}>
              Add Note
            </Button>
          </div>
        ) : null}
        <Divider></Divider>
        <List>
          {notes
            ? notes.map((_note, _index) => {
                return (
                  <div key={_index}>
                    <SidebarItem
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}
                    />
                    <Divider></Divider>
                  </div>
                );
              })
            : null}
        </List> */}
        <div className={styles.addViewButton}>
          <div className={styles.addNoteBtn}>
            <Btn shape="round" size="large" onClick={this.showDrawer}>
              <span id="header_2">Add New Note</span>
            </Btn>
          </div>

          <div className={styles.viewAllBtn}>
            <Btn shape="round" size="large" onClick={this.showDrawer}>
              <span id="header_2">View All Notes</span>
            </Btn>
          </div>
          <Drawer
            title="Your Notes"
            placement="top"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            height="300"
            style={{ textAlign: "center" }}
          >
            <Row>
              <Col
                span={10}
                style={
                  {
                    // marginBottom: 10,
                    // marginRight: 20,
                    // markerLeft: 50,
                  }
                }
              >
                <Card
                  title="Add New Note"
                  bordered={true}
                  hoverable={true}
                  size="default"
                  type="inner"
                  style={{
                    width: 220,
                    textAlign: "center",
                    // display: "flex-start",
                    // marginLeft: 20,
                    marginBottom: 20,
                    marginLeft: 20,
                  }}
                  actions={[
                    <Btn
                      type="primary"
                      ghost
                      shape="round"
                      size="small"
                      onClick={() => {
                        this.newNote();
                        this.onClose();
                      }}
                    >
                      Add
                    </Btn>,
                  ]}
                >
                  <Int
                    placeholder="Enter Title"
                    size="small"
                    onKeyUp={this.updateTitle}
                  />
                </Card>
              </Col>
              {notes
                ? notes.map((_note, _index) => {
                    return (
                      <div key={_index}>
                        <Col
                          span={4}
                          // style={{ marginBottom: 30, marginLeft: 60 }}
                        >
                          <Notes
                            _note={_note}
                            _index={_index}
                            selectedNoteIndex={selectedNoteIndex}
                            selectNote={this.selectNote}
                            deleteNote={this.deleteNote}
                            onClose={this.onClose}
                          />
                        </Col>
                      </div>
                    );
                  })
                : null}
            </Row>
          </Drawer>
        </div>
      </div>
    );
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  newBtnClick = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      title: null,
    });
  };

  updateTitle = (e) => {
    console.log(e.target.value);
    this.setState({ title: e.target.value });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
    console.log(this.state);
  };

  selectNote = (n, i) => {
    this.props.selectedNote(n, i);
  };

  deleteNote = (note) => {
    this.props.deleteNote(note);
  };
}
