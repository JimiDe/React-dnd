import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ItemMove from './components/itemMove';
import fitness1 from './../picture/fitness1.png';
import fitness2 from './../picture/fitness2.png';
import fitness3 from './../picture/fitness3.png';
import fitness4 from './../picture/fitness4.png';
import fitness5 from './../picture/fitness5.png';

class ListReorder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [{
                id: 0,
                url: fitness1
            },
            {
                id: 1,
                url: fitness2
            },
            {
                id: 2,
                url: fitness3
            },
            {
                id: 3,
                url: fitness4
            },
            {
                id: 4,
                url: fitness5
            },
            ]
        }
    }
    changeListOrder = (sourceIndex, targetIndex) => {
        let listDataCopy = JSON.parse(JSON.stringify(this.state.listData));
        let tempData = listDataCopy[sourceIndex].url;
        listDataCopy[sourceIndex].url = listDataCopy[targetIndex].url;
        listDataCopy[targetIndex].url = tempData;
        this.setState({
            listData: listDataCopy
        });
    }
    render(){
        const { listData } = this.state;
        return (
            <Fragment>
                <h1>图片拖拽重排序：</h1>
                <div style={{
                    display: 'flex',
                    width: '900px',
                    justifyContent: 'space-between'
                }}>
                    {
                        listData.map(item => (
                            <DndProvider backend={HTML5Backend} key={item.id}>
                                {/* 要拖动和放置的组件 */}
                                <ItemMove itemData={item} changeOrder={this.changeListOrder}/>
                            </DndProvider>
                        ))
                    }
                </div>
            </Fragment>
        )
    }
}

export default ListReorder;