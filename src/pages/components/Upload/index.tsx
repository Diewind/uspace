import React, { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { deleteProductImg } from '@services/productService';
import { getBase64 } from '@utils/util';

import './index.less';

interface UploadProps {
  imgs?: [],
  ref?: () => void,
}

const CommonUpload: React.FC<UploadProps> = (props) => {
  // 如果传入了imgs属性
  const { imgs } = props;
  let initFileList:any = [];
  if (imgs && imgs.length > 0) {
    initFileList = imgs.map((img, index) => ({
      uid: -index, // 每个file都有自己唯一的id
      name: img, // 图片文件名
      status: 'done', // 图片状态:uploading-上传中 done-已上传 removed-已删除
      url: img
    }));
  }
  const [state, setState] = useState<any>({
    previewVisible: false, // 是否显示预览模态框
    previewImage: '', // 大图的url
    fileList: initFileList, // 所有已上传图片的数组
  });
  const handleCancel = () => setState({ previewVisible: false });
  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  // 获取所有已上传图片文件名的数组
  const getImgs = () => state.fileList.map((file:any) => file.name)

  const handleChange = async (fileObj:any) => {
    // File : 当前操作的图片文件（上传/删除）
    // Filelist : 已上传图片的文件数组
    let { file, fileList } = fileObj;

    // 一旦上传成功，将当前上传的file的信息修正(name,url)
    if (file.status === 'done') {
      const result = file.response;// {status:'状态',data:{name:'图片名称',url:'图片地址'}}
      if (result.status === 0) {
        message.success('上传图片成功！');
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error('上传图片失败');
      }
    } else if (file.status === 'removed') { // 删除图片
      const result:any = await deleteProductImg(file.name);
      if (result.status === 0) {
        message.success('删除图片成功！');
      } else {
        message.error('删除图片失败');
      }
    }

    setState({ fileList });
  };

  const { previewVisible, previewImage, fileList } = state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  return (
    <div className='clearfix imgwrap'>
      <Upload
        action='/admin/product/imgUpload' // 上传图片的接口地址
        accept='image/*' //只接受图片格式
        name='image' // 请求参数名
        listType='picture-card' // 卡片样式
        fileList={fileList} // 所有已上传文件列表
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default CommonUpload;
