import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  Card,
  Button
} from 'antd';

const Bar:React.FC = () => {
  const [state ,setState] = useState({
    sales: [5, 20, 36, 10, 10, 20],
    stores: [6, 10, 25, 20, 15, 10]
  });
  const update = () => {
    setState((state) => ({
      sales: state.sales.map((sale) => sale + 1),
      stores: state.stores.reduce((pre:any, store) => {
        pre.push(store - 1);
        return pre;
      }, [])
    }));
  }
  const getOption = (sales: any, stores: any) => ({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量',
        '库存']
    },
    xAxis: {
      data: ["衬衫",
        "羊毛衫",
        "雪纺衫",
        "裤子",
        "高跟鞋",
        "袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: sales
    },
    {
      name: '库存',
      type: 'bar',
      data: stores
    }]
  })
  return (
    <div>
      <Card>
        <Button type='primary' onClick={() => update()}>更新</Button>
      </Card>
      <Card title='柱状图一'>
        <ReactEcharts
          option={getOption(state.sales, state.stores)}
        />
      </Card>
    </div>
  );
}

export default Bar;
