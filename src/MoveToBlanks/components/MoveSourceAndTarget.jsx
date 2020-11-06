import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const imgDragType = 'doubleDragType';

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
}
const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(), // dragSorce()返回一个方法，将source组件传入这个方法，可以将source Dom和React Dnd backend连接起来
})

const itemSpecTarget = {
    //是否能够被拖动，可选
    canDrop(props, monitor){  
        const { itemData } = props;
        if(itemData.url === ''){
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
    }
}
const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(), // dragSorce()返回一个方法，将target组件传入这个方法，可以将drop target和React Dnd backend连接起来
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
                        background: 'rgba(68, 114, 196, .4)',
                        borderRadius: '10px'
                    }}
                >
                    <img alt='' src={itemData.url} style={{ width: '100px' }}></img>
                </div>
            ))
        )
    }
}
    
export default flow(DragSource(imgDragType, itemSpecSource, collectSource), DropTarget(imgDragType, itemSpecTarget, collectTarget))(MoveSourceAndTarget);
