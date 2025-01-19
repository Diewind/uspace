import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, List, Row, Col, message, Form, Input, Cascader, Button } from 'antd';
import Item from 'antd/lib/list/Item';

import Upload from '@pages/components/Upload';
import LinkButton from '@pages/components/LinkButton';
import RichTextEditor from '../components/RichTextEditor';
import { queryProductInCategory, addProduct } from '@services/productService';

import './index.less';
import { FORM_ITEM_LAYOUT_ONE_IN_ELEVEN } from '@utils/constants';

const { TextArea } = Input;

interface ProductDetailProps {

}

const ProductDetail: React.FC<ProductDetailProps> = () => {

  const location:any = useLocation();
  const history:any = useHistory();
  const uploadRef:any = useRef();
  const editorRef:any = useRef();
  const [state, setState] = useState<any>({
    catename: '',
    options: [],
    categoryIds: [],
  });
  useEffect(() => {
    fetchCategoryName();
    getCategorys(0);
  }, []);
  const { name = '', desc, price, detail = '', imgurls = [], editable = true } = location.state || {};
  const { catename, options } = state;
  let form:any = Form.useForm();
  const fetchCategoryName = async () => {
    const { categoryId } = location.state;
    const result:any = await queryProductInCategory(categoryId, editable ? 'edit' : 'detail');
    if (result.status === 0) {
      message.success('请求所在分类成功');
      setState({
        [editable ? 'categoryIds' : 'catename']: result.data
      });
    } else {
      message.error('请求所在分类失败');
    }
  }

  /**
   * 深度递归搜索
   * @param {Array} arr 你要搜索的数组
   * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
   * @param {String} children 子数组的key
  */
  const deepFind = (arr:[], condition:any, children:string) => {
    // 即将返回的数组
    const main:any = [];
    // 用try方案方便直接中止所有递归的程序
    try {
      // 开始轮询
      (function poll(arr, level) {
        // 如果传入非数组
        if (!Array.isArray(arr)) {
          return;
        }
        // 遍历数组
        for (let i = 0; i < arr.length; i++) {
          // 获取当前项
          const item:any = arr[i];
          // 先占位预设值
          main[level] = item;
          // 检验是否已经找到了
          const isFind = condition && condition(item, i, level) || false;
          // 如果已经找到了
          if (isFind) {
            // 直接抛出错误中断所有轮询
            throw Error;
            // 如果存在children，那么深入递归
          } else if (children && item[children] && item[children].length) {
            poll(item[children], level + 1);
            // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
          } else if (i === arr.length - 1) {
            // 删除占位预设值
            main.length = main.length - 1;
          }
        }
      }(arr, 0));
      // 使用try/catch是为了中止所有轮询中的任务
    } catch (err) { }
    // 返回最终数组
    return main;
  }

  const validatePrice = (rule:any, value:any, callback:any) => {
    if (Number(value) > 0) {
      callback();// 验证通过
    } else {
      callback('价格必须大于0');// 验证没通过
    }
  }

  const handleSubmit = () => {
    form.validateFields.then(async (values:any)=> {
      const imgs = uploadRef.current.getImgs();
      const detail = editorRef.current.getDetail();
      // 获取最后一个选中的分类id
      const curCateId = values.categoryIds.length > 0 && values.categoryIds[values.categoryIds.length - 1];
      const { categoryIds, ...others } = values;
      const { id } = location.state;
      const params = {
        ...others,
        curCateId,
        imgs,
        detail,
        id: id ? id : '',
        pageflag: id ? 'edit' : 'add'// 判断是否是新增页面
      };
      const result:any = await addProduct(params);
      try {
        if (result.status === 0) {
          message.success('更新商品成功！');
          history.push('/product');
        } else {
          message.error(result.msg);
        }
      } catch (e) {

      }
    });
  }

  // 获取一级/二级列表
  const getCategorys = async (parentId:any) => {
    const result:any = await queryProductInCategory(parentId, editable ? 'edit' : 'detail');
    if (result.status === 0) {
      const { data } = result;
      // 如果是一级分类列表
      if (parentId === 0) {
        initOptions(data);
      } else { //二级列表
        return data;
      }
    }
  }

  const initOptions = async (categorys:any) => {
    // 根据categorys生成options数组
    const options = categorys.map((c:any) => ({
      value: c.id,
      label: c.name,
      isLeaf: !c.children
    }));
    // 如果是修改，才去获取当前商品所在分类
    const { id } = location.state;
    if (id) {
      const cateArrs = await getCategorys(0);
      if (editable && cateArrs.length > 1) {
        const subCategorys = await getCategorys(cateArrs[0]);
        const childOptions = subCategorys.map((c:any) => ({
          value: c.id,
          label: c.name,
          isLeaf: true
        }));
        const targetOption = options.find((option:any) => option.value === cateArrs[0]);
        targetOption.children = childOptions;
      }
    }
    // 更新options状态
    setState({
      options
    });
  }

  const loadData = async (selectedOptions:any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 根据选中的分类，请求获取二级分类列表
    const subCategorys = await getCategorys(targetOption.value);
    targetOption.loading = false;
    if (subCategorys && subCategorys.length > 0) {
      // 生成二级列表options
      const childOptions = subCategorys.map((c:any) => ({
        value: c.id,
        label: c.name,
        isLeaf: false
      }));
      targetOption.children = childOptions;
    } else { //当前选中的分类没有二级分类
      targetOption.isLeaf = true;
    }
    // 更新options状态
    setState({
      options: [...options],
    });
  };

  const title = (
    <span>
      <LinkButton>
        <ArrowLeftOutlined
          style={{ marginRight: 15, fontSize: 20 }}
          onClick={() => history.goBack()} />
      </LinkButton>
      <span>商品详情</span>
    </span>
  );
  return (
    <Card title={title} className='product-detail'>
      <List>
        <Form
          {...FORM_ITEM_LAYOUT_ONE_IN_ELEVEN}
          // initialValues={location.state || {}}
          name='productEditForm'
          autoComplete="off"
          // form={form}
        >
          {
            editable ? (
              <Form.Item
                label="商品名称："
                name="name"
                rules={[{ required: true, message: '商品名称不能为空!' }]}
              >
                <Input placeholder='请输入商品名称' />
            </Form.Item>
            ) : name
          }
          {
            editable ? (
              <Form.Item
                label="商品描述："
                name="desc"
                rules={[{ required: true, message: '商品描述不能为空!' }]}
              >
                <TextArea placeholder='请输入商品描述' />
            </Form.Item>
            ) : desc
          }
          {
            editable ? (
              <Form.Item
                label="商品价格："
                name="price"
                rules={[{ required: true, message: '商品价格不能为空!' },{ validator: validatePrice }]}
              >
                <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
            </Form.Item>
            ) : price
          }
          {
            editable ? (
              <Form.Item
                label="商品分类："
                name="categoryIds"
                rules={[{ required: true, message: '商品分类不能为空!' }]}
              >
                <Cascader
                  options={options}
                  loadData={loadData}
                  placeholder='请选择分类'
                  changeOnSelect
                />
            </Form.Item>
            ) : name
          }
          {
            editable ? (
              <Form.Item
                label="商品图片："
                name="productImg"
                rules={[{ required: true, message: '商品图片不能为空!' }]}
              >
                <Upload ref={uploadRef} imgs={imgurls} />
              </Form.Item>
            ) : null
          }
          <Row>
            {
              editable ? (
                <Form.Item
                  label="商品详情："
                  name="productDetail"
                >
                  <RichTextEditor ref={editorRef} detail={detail} />
                </Form.Item>
              ) : <Col span={22} dangerouslySetInnerHTML={{ __html: detail }}></Col>
            }
          </Row>
          <Row>
            {editable && (
              <Item>
                <Button type='primary' onClick={handleSubmit}>提交</Button>
              </Item>
            )}
          </Row>
        </Form>
      </List>
    </Card>
  );
}

export default ProductDetail;
