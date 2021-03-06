import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MoveSourceAndTarget from './components/MoveSourceAndTarget';
import first from './../picture/first-gray.png';
import second from './../picture/second-gray.png';
import third from './../picture/third-gray.png';
import fourth from './../picture/fourth-gray.png';
import fifth from './../picture/fifth-gray.png';

class MoveOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [{
                id: 0,
                url: first
            },
            {
                id: 1,
                url: second
            },
            {
                id: 2,
                url: third
            },
            {
                id: 3,
                url: fourth
            },
            {
                id: 4,
                url: fifth
            },
            ]
        }
    }
    changeListOrder = (sourceIndex, targetIndex) => {
        let listDataCopy = JSON.parse(JSON.stringify(this.state.listData));
        let tempData = listDataCopy[sourceIndex];
        listDataCopy.splice(sourceIndex, 1);
        listDataCopy.splice(targetIndex, 0, tempData);
        this.setState({
            listData: listDataCopy
        });
    }
    render(){
        const { listData } = this.state;
        return (
            <Fragment>
                <h1>图片可拖拽进行排序，可操作多次：</h1>
                <div style={{
                    display: 'flex',
                    width: '900px',
                    justifyContent: 'space-between'
                }}>
                    {
                        listData.map((item, index) => (
                            <DndProvider backend={HTML5Backend} key={item.id}>
                                {/* 要拖动和放置的组件 */}
                                <MoveSourceAndTarget itemData={item} index={index} changeOrder={this.changeListOrder}/>
                            </DndProvider>
                        ))
                    }
                </div>
            </Fragment>
        )
    }
}

export default MoveOrder;