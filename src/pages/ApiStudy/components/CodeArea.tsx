import React, {useEffect, useRef, useState} from 'react';
import { Row, Col, AutoComplete } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';

import codeM from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/xml-hint.js';


type Props = {}

const CodeArea: React.FC<Props> = (props: Props) => {
  const [code, setCode] = useState<any>('<h1>Demo</h1>');
  let editorView = useRef(null);
  let editorViewState = useRef(null);
  const init = (editorContainer: any, code: string | null | undefined) => {
    let view = new codeM(editorContainer, {
      value: code,
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: {
        "Ctrl-Q": function(cm:any){ cm.foldCode(cm.getCursor()); },
        "Ctrl-E": "autocomplete"
      },
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      mode: {name: "text/html"},
    });
    view.on('change', (cm:any) => {
      setCode(cm.doc.children[0].lines[0].text);
    });
  }
  useEffect(() => {
    init(editorView.current, code);
  }, []);

  return (
    <Row className='codearea'>
      <Col className='codearea-left' span={12} id='codeEdit' ref={editorView}></Col>
      <Col className='codearea-right' span={12} id='codeView'>
        <iframe width='100%' height='100%' srcDoc={code}></iframe>
      </Col>
    </Row>
  )
}

export default CodeArea;
