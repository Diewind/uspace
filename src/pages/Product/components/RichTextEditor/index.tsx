import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface RichTextEditorProps {
  detail?:string,
  ref?: () => void,
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {

  const [state, setState] = useState<any>({
    editorState: ''
  });
  const { detail } = props;

  useEffect(() => {
    let initEditorState:any = null;
    if(detail){
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      initEditorState = EditorState.createWithContent(contentState);
    }else{
      initEditorState = EditorState.createEmpty(); // 创建一个没有内容的编辑对象
    }
    setState({
      editorState: initEditorState
    });
  }, []);

  const handleEditorChange:any = (editorState:string) => {
    setState({
      editorState
    });
  };
  const getDetail = () => {
    const { editorState } = state;
    // 返回输入的html格式的文本
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }
  const { editorState } = state;
  return (
    <Editor
      editorState={editorState}
      editorStyle={{
        border: '1px solid black',
        minHeight: 200,
        paddingLeft: 10
      }}
      onEditorStateChange={handleEditorChange}
    />
  );
}

export default RichTextEditor;
