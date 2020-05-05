import React, { Component } from "react";
import ReactQuill from "react-quill";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdbreact";
import { Typography, message } from "antd";

import { debounce } from "../helpers";
import styles from "./editor.module.css";

const { Paragraph } = Typography;

export default class Editor extends Component {
  state = {
    text: "",
    title: "",
    id: "",
  };

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      });
    }
  };

  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  render() {
    return (
      <div>
        {/* <div className="editor-container">
          <BorderColorIcon></BorderColorIcon>
          <input
            className="edit-title-input"
            value={this.state.title ? this.state.title : ""}
            onChange={this.updateTitle}
            placeholder="Note Title..."
          ></input>
          <ReactQuill
            value={this.state.text}
            onChange={this.updateBody}
          ></ReactQuill>
        </div> */}
        <MDBCard className="ml-3 mr-3">
          <MDBCardHeader className="view view-cascade gradient-card-header deep-blue-gradient d-flex justify-content-center align-items-center py-2 mx-4 mb-3">
            <div className={styles.cardHeader}>
              <span className={styles.noteTitle}>Note Title:</span>
              <Paragraph
                editable={{ onChange: this.onChange }}
                // code={true}
                strong={true}
                type="secondary"
                className={styles.editTitle}
              >
                {this.state.title}
              </Paragraph>
            </div>
          </MDBCardHeader>

          <MDBCardBody cascade>
            <ReactQuill
              value={this.state.text}
              onChange={this.updateBody}
              theme="snow"
              modules={this.modules}
            ></ReactQuill>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  // updateTitle = async (e) => {
  //   await this.setState({ title: e.target.value });
  //   this.update();
  // };
  onChange = (str) => {
    console.log("Content change:", str);
    this.setState({ title: str });
    this.update();
  };

  update = debounce(() => {
    message.success("Changes Saved", [1]);
    this.props.updateNote(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 2000);
}
