import React, { Component } from 'react'

export const asyncComponent = (fn:any) => {
    // return 一个组件
    return class MyComponent extends Component<any,any> {
        constructor(props:any) {
            super(props);
            this.state = {
                C: null
            }
        }
        // 调用组件时会渲染当渲染完成后会执行componentDidMount这时候会调用fn
        componentDidMount() {
            // fn是一个异步的promise调用这时给组件进行复制重新渲染
            fn().then((module:any) => {
                this.setState({
                    C: module.default
                    // module.default就是页面引进的真正要加载的组件
                });
            });
        }
        render() {
            let { C } = this.state;
            return (
              <div>
                  {C ? <C {...this.props}></C> : null}
                  {/*{...this.props}是为了解决当前组件C没有Route所携带的信息无法跳转  但是如果想要必须接受,在App.js中route将信息传给Login,而Login就是此时类asyncComponent return的组件 所以进行结构赋值*/}
              </div>
            )
        }
    }
}
