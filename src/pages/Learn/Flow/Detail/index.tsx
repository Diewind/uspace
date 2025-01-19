import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Row, Tooltip, Button, Input, Card, Menu, Dropdown, Select } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import G6Editor from '@antv/g6-editor';

import { FORM_ITEM_LAYOUT_ONE_IN_FIVE, FORM_ITEM_LAYOUT_ONE_IN_ELEVEN } from '@utils/constants';
import LinkButton from '@pages/components/LinkButton';

import MiniMap from '../../components/Minimap';
import Toolbar from '../../components/Toolbar';
import '../index.less';

const { TextArea } = Input;
const { Option } = Select;

interface FlowDetailProps {

}

const FlowDetail: React.FC<FlowDetailProps> = (props) => {
  const [form] = Form.useForm();
  const contentRef = useRef(null);
  const contextmenuRef = useRef(null);
  const itempanelRef = useRef(null);
  const detailRef = useRef(null);
  let editor:any = new G6Editor();
  const history = useHistory();
  const [state, setState] = useState<any>({
    nodeType: 'canvas', // 节点类型
    data: {}
  });
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    const { setFieldsValue } = form;
    const { data } = state;
    const contentBox = new G6Editor.Flow({
      defaultData: data,
      graph: {
        container: contentRef.current,
        height: window.innerHeight - 280
      }
    });
    const contextmenuBox = new G6Editor.Contextmenu({
      container: contextmenuRef.current
    });
    const itempanelBox = new G6Editor.Itempannel({
      container: itempanelRef.current
    });
    const detailBox = new G6Editor.Detailpannel({
      container: detailRef.current
    });
    editor.add(contentBox);
    editor.add(contextmenuBox);
    editor.add(detailBox);
    editor.add(itempanelBox);
    const currentPage = editor.getCurrentPage();
    // 清空默认选中
    currentPage.clearSelected();
    currentPage.on('click', (ev:any) => {
      const nodeName = ev?.item?.model.label || '';
      const nodeType = ev?.item?.type || 'canvas';
      const nodeShape = ev?.item?.shapeObj.type || '';
      setState({
        nodeType
      });
      setFieldsValue({
        'labelName': nodeType === 'edge' ? 'Label' : nodeName,
        'labelShape': nodeShape
      });
    });
    currentPage.on('beforechange', (ev:any) => {
    });

    currentPage.on('afterchange', (ev:any) => {
    });

    currentPage.on('beforeitemselected', (ev:any) => {
    }); // 选中前
    currentPage.on('afteritemselected', (ev:any) => {
      const { item:{model:{label='',type='canvas',dataMap:{source}}}} = ev;
      const nodeName = label;
      const nodeType = type;
      const arr = [];
      const edgeArr = [];
      if (ev.item && ev.item.dataMap) {
        for (const val of Object.values(ev.item.dataMap)) {
          if (source) {
            edgeArr.push(val);
          } else {
            arr.push(val);
          }
        }
      }
      setState({
        nodeType,
        data: {
          nodes: [...arr],
          edges: [...edgeArr]
        }
      });
      setFieldsValue({
        'labelName': nodeName
      });
    }); // 选中后
    currentPage.on('beforeitemunselected', (ev:any) => {
    }); // 取消选中前
    currentPage.on('afteritemunselected', (ev:any) => {
    }); // 取消选中后
    // CurrentPage.read(data);
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

  const handleEdgeChange = (e:any) => {
    const currentPage = editor.getCurrentPage();
    const curSelect = currentPage.getSelected();
    // CurSelect[0]['shapeObj']['type'] = e;
    const { data } = state;
    const edgesArr = data.edges.map((val:any) => {
      if (val.source === curSelect[0]['model']['source']) {
        val['shape'] = e;
      }
      return val;
    });
    const obj = {
      nodes: data.nodes,
      edges: edgesArr
    };
    currentPage.read(obj);
    currentPage.setSelected(curSelect[0]['model']['id'], true);
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
      <span>流程图详情</span>
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
              <Input autoComplete='off' placeholder='流程编辑器' />
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
              <TextArea autoComplete='off' rows={4} placeholder='千言万语不如一张图，流程图是表示算法思路的好方法' />
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
            <Toolbar editor={editor} type='koni' />
          </div>
          <div className='mindbox-body-bd'>
            <div className='mindbox-body-bd-sidebar mindbox-body-bd-flow-sidebar-left' ref={itempanelRef}>
              <Card>
                <div className='optbox'>
                    <img draggable='false' alt='' src='https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg' data-type='node' data-shape='flow-circle' data-size='72*72' data-color='#FA8C16' data-label='起止节点' className='getItem' />
                  </div>
                  <div className='optbox'>
                    <img draggable='false' alt='' src='https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg' data-type='node' data-shape='flow-rect' data-size='80*48' data-color='#1890FF' data-label='常规节点' className='getItem' />
                  </div>
                  <div className='optbox'>
                    <img draggable='false' alt='' src='https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg' data-type='node' data-shape='flow-rhombus' data-size='80*72' data-color='#13C2C2' data-label='分叉节点' className='getItem' />
                  </div>
                  <div className='optbox'>
                    <img draggable='false' alt='' src='https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg' data-type='node' data-shape='flow-capsule' data-size='80*48' data-color='#722ED1' data-label='模型节点' className='getItem' />
                  </div>
              </Card>
            </div>
            <div className='mindbox-body-bd-content' ref={contentRef}></div>
            <div className='mindbox-body-bd-sidebar'>
              <Card className='mindbox-body-bd-sidebar-nodeinfo' size='small' type='inner' title={nodeType}>
                {(nodeType === 'node' || nodeType === 'edge') && (
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
                {nodeType === 'edge' && (
                  <Form layout='horizontal'>
                    <Form.Item
                      label='Shape'
                      name='labelShape'
                      {...FORM_ITEM_LAYOUT_ONE_IN_FIVE}
                    >
                      <Select onChange={handleEdgeChange}>
                        <Option value='flow-smooth'>Smooth</Option>
                        <Option value='flow-polyline'>Polyline</Option>
                        <Option value='flow-polyline-round'>Polyline Round</Option>
                      </Select>
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
                  <div className='command' data-command='copy'>
                    <div className='context-menu-index-item'>
                      <span role='img' className='anticon'>
                        <svg id='icon-copy' viewBox='0 0 1024 1024'><path d='M990.08 1017.64h-549.1q-10.6 0-18.55-8.48-7.95-8.48-9.01-19.08V373.13q1.06-10.6 10.07-18.55 9.01-7.95 23.85-9.01h373.13L1024 549.1v448.4q-5.3 5.3-14.31 12.19-9.01 6.89-19.61 7.95zM814.11 407.06v135.68H949.8L814.11 407.06zM949.8 610.58H746.27V407.06H474.9V949.8h474.9V610.58z m-610.59 67.85H67.84V67.84h271.37v203.53h271.37v-67.84L407.06 0H33.92Q18.02 0 9.01 8.48T0 27.56v684.79q0 10.6 8.48 18.55 8.48 7.95 19.08 9.01h311.65v-61.48z m67.85-610.59l135.68 135.69H407.06V67.84z' fill='#666666'></path></svg>
                      </span>
                      <span>Copy</span>
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
                  <div className='command' data-command='pasteHere'>
                    <div className='context-menu-index-item'>
                      <span role='img' className='anticon'>
                        <svg id='icon-paste' viewBox='0 0 1024 1024'><path d='M795.99 199.33h-75.02v-62.16h109.31q10.72 0 19.3 8.58 8.57 8.57 8.57 19.29v102.88h-62.16v-68.59zM240.87 898.05h-75.02V199.33h75.02v-62.16H131.56q-10.72 0-19.29 8.58-8.57 8.57-8.57 19.29v760.88q0 10.71 8.57 18.75t19.29 9.11h102.88l6.43-55.73z m411.52-623.7H309.46V137.17h68.58V62.16q1.07-26.8 18.22-43.94Q413.41 1.08 440.2 0.01h75.01q26.8 1.07 43.94 18.21 17.14 17.14 18.22 43.94v75.01h75.02v137.18zM515.21 62.16H440.2v75.01h75.01V62.16z m405.09 938.77V548.69L720.97 342.93H343.75q-16.08 0-25.19 8.57-9.11 8.57-9.11 19.3v623.7q0 10.72 8.57 18.76 8.57 8.04 19.29 9.11H886q15 4.28 24.11-2.68 9.11-6.97 10.18-18.76z m-68.58-438.31H714.54v-151.1l137.18 151.1z m6.43 411.52H371.61V411.52h280.78v212.19h205.76v350.43z' fill='#666666'></path></svg>
                      </span>
                      <span>Paste Here</span>
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

export default FlowDetail;
