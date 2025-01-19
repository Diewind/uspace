import * as AntdIcons from '@ant-design/icons';

const renderIcon = (name:string) => {
  const IconDom = (AntdIcons as any)[name].render();
  return IconDom;
}

export default renderIcon;
