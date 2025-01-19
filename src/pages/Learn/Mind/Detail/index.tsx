import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Form, Row, Button, Input, Card, Menu, Dropdown, Select } from 'antd';
import G6Editor from '@antv/g6-editor';

import { FORM_ITEM_LAYOUT_ONE_IN_FIVE, FORM_ITEM_LAYOUT_ONE_IN_ELEVEN } from '@utils/constants';
import LinkButton from '@pages/components/LinkButton';

import '../index.less';
import MiniMap from '../../components/Minimap';
import Toolbar from '../../components/Toolbar';

const { TextArea } = Input;
const { Option } = Select;

interface MindDetailProps {

}

const MindDetail: React.FC<MindDetailProps> = (props) => {
  const [form] = Form.useForm();
  const contentRef = useRef(null);
  const contextmenuRef = useRef(null);
  const detailRef = useRef(null);
  let editor:any = new G6Editor();
  const history = useHistory();
  const [state, setState] = useState<any>({
    nodeType: 'canvas', // 节点类型
    data: {
      "roots": [
        {
          "label": "思维导图",
          "children": []
        }
      ]
    }
  });
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    const { setFieldsValue } = form;
    const { data } = state;
    const contentBox = new G6Editor.Mind({
      defaultData: data,
      graph: {
        container: contentRef.current,
        height: window.innerHeight - 280
      }
    });
    const contextmenuBox = new G6Editor.Contextmenu({
      container: contextmenuRef.current
    });
    const detailBox = new G6Editor.Detailpannel({
      container: detailRef.current
    });
    editor.add(contentBox);
    editor.add(contextmenuBox);
    editor.add(detailBox);
    const currentPage = editor.getCurrentPage();
    // 清空默认选中
    currentPage.clearSelected();
    currentPage.on('click', (ev:any) => {
      const nodeName = ev?.item?.model.label || '';
      const nodeType = ev?.item?.type || 'canvas';
      setState({
        nodeType
      });
      setFieldsValue({
        'labelName': nodeName
      });
    });
  }

  const handleBlur = () => {
    const currentPage = editor.getCurrentPage();
    const curSelect = currentPage.getSelected();
    const { data } = state;
    currentPage.read(data);
    currentPage.setSelected(curSelect[0]['model']['id'], true);
  }

  const handleChange = (e:any) => {
    const currentPage = editor.getCurrentPage();
    const curSelect = currentPage.getSelected();
    curSelect[0]['model']['label'] = e.target.value;
  }

  const handleImport = () => {
    const ndata = {};
    setState({
      data: ndata
    });
    const currentPage = editor.getCurrentPage();
    const { data } = state;
    currentPage.read(data);
  }

  const handleExport = () => {
    // Const currentPage = this.editor.getCurrentPage();
    // Const data = currentPage.save();
  }

  const handleSave = () => {
    // Const currentPage = this.editor.getCurrentPage();
    // Const data = currentPage.save();
  }

  const goBack = () => {
    history.goBack();
  }

  const { nodeType } = state;
  const menu = (
    <Menu onClick={handleExport}>
      <Menu.Item key='png'>.PNG</Menu.Item>
      <Menu.Item key='pdf'>.PDF</Menu.Item>
      <Menu.Item key='mmap'>.MMAP</Menu.Item>
    </Menu>
  );
  const title = (
    <span>
      <LinkButton>
        <ArrowLeftOutlined
          style={{ marginRight: 15, fontSize: 20 }}
          onClick={goBack} />
      </LinkButton>
      <span>导图详情</span>
    </span>
  );

  return (
    <div className='mindbox'>
      <Card title={title} className='product-detail'>
        <div className='mindbox-header'>
          <Row className='mindbox-top' justify='end'>
            <Button onClick={handleImport}>导入</Button>
            <Dropdown overlay={menu}>
              <Button>导出<DownOutlined /></Button>
            </Dropdown>
            <Button onClick={handleSave} type='primary'>保存</Button>
          </Row>
          <Form {...FORM_ITEM_LAYOUT_ONE_IN_ELEVEN} form={form}>
            <Form.Item
              label='标题'
              name='title'
              rules={
                [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ]
              }
            >
              <Input autoComplete='off' placeholder='脑图编辑器' />
            </Form.Item>
            <Form.Item
              label='描述'
              name='desc'
              rules={
                [
                  {
                    required: true,
                    message: '请输入描述',
                  },
                ]
              }
            >
              <TextArea autoComplete='off' rows={4} placeholder='脑图是表达发散性思维的有效图形思维工具 ，它简单却又很有效，是一种实用性的思维工具' />
            </Form.Item>
            <Form.Item
              label='分类'
              name='category'
              rules={
                [
                  {
                    required: true,
                    message: '请选择分类',
                  },
                ]
              }
            >
              <Select placeholder='请选择分类'>
                <Option value='jack'>语文</Option>
                <Option value='lucy'>数学</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className='mindbox-body'>
          <div className='mindbox-body-hd'>
            <Toolbar editor={editor} type='mind' />
          </div>
          <div className='mindbox-body-bd'>
            <div className='mindbox-body-bd-content' ref={contentRef}></div>
            <div className='mindbox-body-bd-sidebar'>
              <Card className='mindbox-body-bd-sidebar-nodeinfo' size='small' type='inner' title={nodeType}>
                {nodeType === 'node' && (
                  <Form
                    layout='horizontal'
                  >
                    <Form.Item
                      label='Label'
                      name='labelName'
                      {...FORM_ITEM_LAYOUT_ONE_IN_FIVE}
                    >
                      <Input autoComplete='off' onChange={handleChange} onBlur={handleBlur} />
                    </Form.Item>
                  </Form>
                )}
              </Card>
              <Card size='small' type='inner' title='minimap'>
                <MiniMap editor={editor} />
              </Card>
            </div>
          </div>
          <div className='mindbox-body-contextmenu' ref={contextmenuRef}>
            <div className='mindbox-body-contextmenu-detail' ref={detailRef}>
              <div className='menu' data-status='node-selected'>
                <div className='command' data-command='append'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-append' viewBox='0 0 1024 1024'><path d='M149.454 116.492h65.915v65.916h-65.915v-65.916z m131.83 0h65.924v65.916h-65.923v-65.916z m-131.83 131.839h65.915v65.915h-65.915v-65.915z m263.669-131.839h65.915v65.916h-65.915v-65.916z m263.67 0h65.922v65.916h-65.923v-65.916z m0 263.67h65.922v65.923h-65.923V380.16z m-131.831-263.67h65.915v65.916h-65.915v-65.916z m-263.677 263.67h65.923v65.923h-65.923V380.16zM808.63 248.33h65.915v65.915h-65.915v-65.915zM149.454 380.16h65.915v65.924h-65.915V380.16zM808.63 116.492h65.915v65.916h-65.915v-65.916z m0 263.67h65.915v65.923h-65.915V380.16z m-395.508 0h65.915v65.923h-65.915V380.16z m131.839 0h65.915v65.923h-65.915V380.16z m0 65.923h-65.924v131.83H149.454v329.593h725.092V577.915H544.962v-131.83zM808.63 841.592H215.369V643.84h593.262v197.753z'></path></svg>
                    </span>
                    <span>Topic</span>
                  </div>
                </div>
                <div className='command' data-command='appendChild'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-append-child' viewBox='0 0 1024 1024'><path d='M256 128h64v64h-64v-64z m128 0h64v64h-64v-64z m0 256h64v64h-64v-64z m128 0h64v64h-64v-64z m0-256h64v64h-64v-64z m0 128h64v64h-64v-64zM128 128h64v64h-64v-64zM0 128h64v64H0v-64z m0 128h64v64H0v-64z m256 128h64v64h-64v-64z m-128 0h64v64h-64v-64zM0 384h64v64H0v-64z m448 128v128H192V512h-64v192h320v128h576V512H448z m512 256H512V576h448v192z'></path></svg>
                    </span>
                    <span>Subtopic</span>
                  </div>
                </div>
                <div className='command' data-command='collapse'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-collapse' viewBox='0 0 1024 1024'><path d='M704 576H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576zM256 160v96L64 128 256 0v96h346v64H256z'></path></svg>
                    </span>
                    <span>Fold</span>
                  </div>
                </div>
                <div className='command' data-command='expand'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-expand' viewBox='0 0 1024 1024'><path d='M448 160H102V96h346V0l192 128-192 128v-96z m256 416H576v128H0V384h576v128h128V256h320v64H768v192h256v64H768v192h256v64H704V576z'></path></svg>
                    </span>
                    <span>Unfold</span>
                  </div>
                </div>
                <div className='command' data-command='delete'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-delete' viewBox='0 0 1024 1024'><path d='M828.55 311.65q-17.81 0-30.05 11.13-12.25 11.13-14.47 28.94l-52.32 529.81h-95.72l16.7-461.91q0-14.47-10.02-25.05-10.02-10.57-25.05-11.13-15.02-0.56-25.6 8.91-10.58 9.46-10.58 25.04l-16.69 464.14H459.01l-15.58-465.25q-1.12-15.58-11.69-25.04-10.57-9.47-25.6-8.91-15.03 0.56-24.49 11.13-9.46 10.57-9.46 25.04l15.58 463.03h-94.6l-52.32-529.81q-2.22-17.81-14.47-28.94-12.24-11.13-30.05-11.13h-3.34q-15.58 2.23-25.04 13.36-9.46 11.13-8.35 26.71l60.1 599.93q3.34 31.17 25.6 51.21 22.26 20.03 53.43 21.14h426.3q31.16-1.11 53.42-21.14t26.72-51.21l58.99-603.27q0-15.58-10.57-26.15-10.58-10.58-25.05-10.58z m107.96-71.23l-7.79-61.22q-5.56-35.62-31.72-57.88-26.15-22.26-61.77-23.37h-170.3l-3.34-32.28q-2.22-28.94-22.25-46.75Q619.3 1.11 590.36 0H433.42Q404.48 1.11 385 18.92q-19.48 17.81-22.82 46.75l-2.22 32.28H188.55q-35.62 1.11-61.22 23.37T96.17 179.2l-8.91 63.44q0 7.79 5.01 12.8 5.01 5.01 12.8 5.01h816.98q6.67-1.11 11.13-6.68 4.46-5.56 3.34-13.35zM422.29 97.95l2.22-27.83q1.12-6.68 8.91-7.79h158.05q6.68 1.11 8.91 7.79l1.11 27.83h-179.2z'></path></svg>
                    </span>
                    <span>Delete</span>
                  </div>
                </div>
              </div>
              <div className='menu' data-status='canvas-selected'>
                <div className='command' data-command='undo'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-undo' viewBox='0 0 1024 1024'><path d='M143.14 449.19q69.07-89.09 170.67-140.64Q415.41 257 537.52 256q183.18 4 315.81 114.11T1024 654.39q-58.06-107.11-161.66-170.17-103.6-63.06-232.73-65.06-107.1 1-196.69 45.54-89.58 44.55-152.65 121.62L407.4 713.45q7 7 7 17.01 0 10.01-7 17.02t-17.01 7.01H32.04q-14.01 0-23.02-9.01T0.01 722.46V364.11q0-10.01 7-17.02t17.02-7.01q10.01 0 17.02 7.01l102.1 102.1z'></path></svg>
                    </span>
                    <span>Undo</span>
                  </div>
                </div>
                <div className='command' data-command='redo'>
                  <div className='context-menu-index-item'>
                    <span role='img' className='anticon'>
                      <svg id='icon-redo' viewBox='0 0 1024 1024'><path d='M999.98 340.08q-10.01 0-17.02 7.01l-102.1 102.1q-69.07-89.09-170.67-140.64Q608.59 257 487.48 256q-184.18 4-316.81 114.11T0 654.39q58.06-107.11 161.66-170.17 103.6-63.06 232.73-65.06 107.1 1 197.19 45.54 90.09 44.55 152.15 121.62L616.6 713.45q-7 7-7 17.01 0 10.01 7 17.02t17.01 7.01h358.35q14.01 0 23.02-9.01t9.01-23.02V364.11q0-10.01-7-17.02t-17.01-7.01z'></path></svg>
                    </span>
                    <span>Redo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MindDetail;
