import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  Card,
  Button
} from 'antd';

const Pie:React.FC = () => {
  const [state, setState] = useState({
    datas: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 274, name: '联盟广告' },
      { value: 235, name: '视频广告' },
      { value: 400, name: '搜索引擎' }
    ]
  });
  const update = () => {
    setState((state) => ({
      datas: state.datas.map((val) => ({
        value: val.value + Math.ceil(Math.random() * 10) * Math.ceil(Math.random() * 10),
        name: val.name
      }))
    }));
  }
  const getOption = (datas:any) => ({
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%',
          '50%'],
        data: datas.sort((a:any, b:any) => a.value - b.value),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay () {
          return Math.random() * 200;
        }
      }
    ]
  });
  return (
    <div>
      <Card>
        <Button type='primary' onClick={update}>更新</Button>
      </Card>
      <Card title='饼图一'>
        <ReactEcharts
          option={getOption(state.datas)}
        />
      </Card>
    </div>
  );
}

export default Pie;
