import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


const imgDragType = 'imgDragType';
const itemSpecSource = {
    beginDrag(props, monitor, connection){
        const { itemData, index } = props;
        return {
            imgData: itemData,
            imgIndex: index
        }
    }
};
const collectSource = (connect, monitor) => ({
    connectionDragSource: connect.dragSource(),
});

const itemSpecTarget = {
    drop(props, monitor, component){
        const { changeOrder, index } = props;
        const getItem = monitor.getItem();

        changeOrder(getItem.imgIndex, index)
    },
}
const collectTarget = (connect, monitor) => ({
    connectionDropTarget: connect.dropTarget(), 
})

class MoveSourceAndTarget extends React.Component{
    render(){
        const { connectionDragSource, connectionDropTarget, itemData } = this.props;
        return (connectionDragSource(connectionDropTarget(
            <div 
                key={itemData.id} 
                style={{
                    width: '100px',
                    height: '100px',
                    background: 'rgba(138, 138, 138, 0.4)',
                    borderRadius: '10px'
                }}
            >
                <img alt='' src={itemData.url} style={{ width: '100px' }}></img>
            </div>
        ))
        )
    }
}

export default flow(DragSource(imgDragType, itemSpecSource, collectSource), 
                    DropTarget(imgDragType, itemSpecTarget, collectTarget))(MoveSourceAndTarget);