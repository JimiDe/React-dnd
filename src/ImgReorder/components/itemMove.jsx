import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


const imgDragType = 'imgDragType';
const itemSpecSource = {
    beginDrag(props, monitor, connection){
        const { itemData } = props;
        return {
            imgData: itemData
        }
    }
};
const collectSource = (connect, monitor) => ({
    connectionDragSource: connect.dragSource(),
});

const itemSpecTarget = {
    drop(props, monitor, component){
        const { itemData, changeOrder } = props;
        const getItem = monitor.getItem();

        changeOrder(getItem.imgData.id, itemData.id)
    },
}
const collectTarget = (connect, monitor) => ({
    connectionDropTarget: connect.dropTarget(), 
})

class ItemMove extends React.Component{
    render(){
        const { connectionDragSource, connectionDropTarget, itemData } = this.props;
        return (connectionDragSource(connectionDropTarget(
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

export default flow(DragSource(imgDragType, itemSpecSource, collectSource), 
                    DropTarget(imgDragType, itemSpecTarget, collectTarget))(ItemMove);