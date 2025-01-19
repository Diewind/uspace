import React from 'react';
import './index.less';

export default function LinkButton(props:any) {
  const { type, onClick, children } = props;
  return <button onClick={onClick} className={`link-button ${type}`}>{children}</button>
}
