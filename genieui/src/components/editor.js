import React, { useState } from "react";

// Components
import { EditorState, convertToRaw } from "draft-js";

import dynamic from "next/dynamic";


const Editor = dynamic(
    () => {
      return import("react-draft-wysiwyg").then(mod => mod.Editor);
    },
    { ssr: false }
  );

import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const WYSIWYGEditor = props => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    console.log("PROPS ==> ", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <React.Fragment>
      <div className="editor">
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </React.Fragment>
  );
};

export default WYSIWYGEditor;