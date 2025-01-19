import React, { useEffect, useRef } from 'react';
import G6Editor from '@antv/g6-editor';

interface MiniMapProps {
  createMinimap?: () => void,
  editor: any,
}

const Minimap: React.FC<MiniMapProps> = (props) => {
  const innerCreateMinimap = (container:any) => new G6Editor.Minimap({
    container,
    viewportBackStyle: '#fff',
    viewportWindowStyle: '#fff',
    fitView: true,
    width: 197
  });
  const minimapContainer = useRef(null);
  const getCreateMinimap = () => {
    const { createMinimap } = props;
    return createMinimap ? createMinimap : innerCreateMinimap;
  }
  useEffect(() => {
    const { editor } = props;
    const createMinimap = getCreateMinimap();
    const minimap:any = createMinimap(minimapContainer.current);
    if (editor.add){
      editor.add(minimap);
    }
  }, []);
  return (
    <div className='minimap' ref={minimapContainer}></div>
  );

}

export default Minimap;
