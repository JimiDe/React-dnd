import React from 'react';
import { DropTarget } from 'react-dnd';

//类型
const imgDragType = 'imgDragType';

/*放置组件时回调的一些方法
* props: 组件当前的props
* monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped.
* component: 当前组件实例，使用它来访问底层DOM节点以进行位置或大小测量，或调用 setState 以及其他组件方法
*/
const itemSpecTarget = {
    //是否能够被拖动，可选
    canDrop(props, monitor){  
        return true
    },
    //组件放下时触发的事件，可选
    drop(props, monitor, component){
        //...
    },
    //组件在DropTarget上方时响应的事件，可选
    hover(props, monitor, component){
        //...
    }
}

/*该函数返回的对象会被注入到组件的props中，即可以通过this.props获取collect返回的所有属性
* connect: DropTargetConnector的实例，它内置了一个方法：dropTarget()
*/
const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(), // dragSorce()返回一个方法，将target组件传入这个方法，可以将drop target和React Dnd backend连接起来

    canDrop: monitor.canDrop(),  //是否可被放置
    isOver: monitor.isOver({ shallow: true }),   // source是否在target上方
    getItemType: monitor.getItemType(),     // 拖拽组件type
    getItem: monitor.getItem(),         // 当前拖拽的item
    getDropResult: monitor.getDropResult(),   // 查询drop结果
    didDrop: monitor.didDrop(),         // source是否已经drop在target
    getInitialClientOffset: monitor.getInitialClientOffset(),   // 拖拽组件初始拖拽时offset
    getClientOffset: monitor.getClientOffset(), // 拖拽组件当前offset
    getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(), // 当前拖拽offset和初始拖拽offset的差别
    getInitialSourceClientOffset: monitor.getInitialSourceClientOffset(), // 拖拽组件的根Dom节点初始拖拽时offset
    getSourceClientOffset: monitor.getSourceClientOffset()   // 拖拽组件的根Dom节点当前offset
})

class ImgMoveTarget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgUrl: '',
        }
    }
    render(){
        const { connectDropTarget, url } = this.props;
        return connectDropTarget(
            <div style={{
                width: '100px',
                height: '240px',
                background: '#FFC107'
            }}>
                <img alt='' src={url.imgUrl} style={{ width: '100px' }}></img>
            </div>
        )
    }
}    
    

export default DropTarget(imgDragType, itemSpecTarget, collect)(ImgMoveTarget);