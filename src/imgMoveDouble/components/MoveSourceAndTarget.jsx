import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

//类型
const imgDragType = 'imgDragType';

/*拖动组件时回调的一些方法
* props: 组件当前的props
* monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped.
* component: 当前组件实例，使用它来访问底层DOM节点以进行位置或大小测量，或调用 setState 以及其他组件方法
*/
const itemSpecSource = {
    //是否能够被拖动，可选
    canDrag(props, monitor){  
        const { itemData } = props;
        if(itemData.url !== ''){
            return true
        }else{
            return false
        }
        
    },
    //拖动开始时触发的事件，必须。返回跟props相关的对象
    beginDrag(props, monitor, component){
        const { itemData } = props;
        return {
            imgData: itemData
        }
        
    },
    //拖动结束时触发的事件，可选
    endDrag(props, monitor, component){
        //...
    },
    //拖动时触发的事件，可选
    isDragging(props, monitor){
        //...
    }
}

/*该函数返回的对象会被注入到组件的props中，即可以通过this.props获取collect返回的所有属性
* connect: DragSourceConnector的实例，它内置了两个方法：dragSource()和dragPreview()
* monitor: 用于查询当前的拖拽状态
*/
const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(), // dragSorce()返回一个方法，将source组件传入这个方法，可以将source Dom和React Dnd backend连接起来
    connectDragPreview: connect.dragPreview(), // dragSorce()返回一个方法，将source组件传入这个方法，可以将source Dom和React Dnd backend连接起来
    
    canDrag: monitor.canDrag(),    // 是否能被拖拽
    isDragging: monitor.isDragging(),  // 是否正在拖拽
    getItemType: monitor.getItemType(), // 拖拽组件type
    getItem: monitor.getItem(),         // 当前拖拽的item
    getDropResult: monitor.getDropResult(),   // 查询drop结果
    didDrop: monitor.didDrop(),         // source是否已经drop在target
    getInitialClientOffset: monitor.getInitialClientOffset(),   // 拖拽组件初始拖拽时offset
    getClientOffset: monitor.getClientOffset(), // 拖拽组件当前offset
    getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(), // 当前拖拽offset和初始拖拽offset的差别
    getInitialSourceClientOffset: monitor.getInitialSourceClientOffset(), // 拖拽组件的根Dom节点初始拖拽时offset
    getSourceClientOffset: monitor.getSourceClientOffset(),  // 拖拽组件的根Dom节点当前offset
})
/*放置组件时回调的一些方法
* props: 组件当前的props
* monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped.
* component: 当前组件实例，使用它来访问底层DOM节点以进行位置或大小测量，或调用 setState 以及其他组件方法
*/
const itemSpecTarget = {
    //是否能够被拖动，可选
    canDrop(props, monitor){  
        const { itemData } = props;
        if(itemData.url == ''){
            return true
        }else{
            return false
        }
    },
    //组件放下时触发的事件，可选
    drop(props, monitor, component){
        const { itemData, changeUrl } = props;
        const getItem = monitor.getItem();

        changeUrl(getItem.imgData.id, itemData.id)
    },
    //组件在DropTarget上方时响应的事件，可选
    hover(props, monitor, component){
        //...
    }
}

/*该函数返回的对象会被注入到组件的props中，即可以通过this.props获取collect返回的所有属性
* connect: DropTargetConnector的实例，它内置了一个方法：dropTarget()
*/
const collectTarget = (connect, monitor) => ({
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

class MoveSourceAndTarget extends React.Component{
    render(){
        const { connectDragSource, itemData, connectDropTarget } = this.props;
        return (connectDragSource(
            connectDropTarget(
                <div 
                    key={itemData.id} 
                    style={{
                        width: '100px',
                        height: '100px',
                        background: 'rgba(139, 195, 74, 0.5)'
                    }}
                >
                    <img alt='' src={itemData.url} style={{ width: '100px' }}></img>
                </div>
            ))
        )
    }
}
    
export default flow(DragSource(imgDragType, itemSpecSource, collectSource), DropTarget(imgDragType, itemSpecTarget, collectTarget))(MoveSourceAndTarget);
