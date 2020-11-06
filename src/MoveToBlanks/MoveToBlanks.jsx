import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MoveSourceAndTarget from './components/MoveSourceAndTarget';
import first from './../picture/first-blue.png';
import second from './../picture/second-blue.png';
import third from './../picture/third-blue.png';

class MoveToBlanks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [{
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
                    url: ''
                },
            ]
        }
    }
    changeImgUrl = (sourceIndex, targetIndex) => {
        let urlData = JSON.parse(JSON.stringify(this.state.data));
        let tempUrl = urlData[sourceIndex].url;
        urlData[sourceIndex].url = urlData[targetIndex].url;
        urlData[targetIndex].url = tempUrl;
        this.setState({
            data: urlData
        })
    }
    render(){
        const { data } = this.state;
        return (
            <Fragment>
                <h1>图片可拖拽至蓝色空白区域，可操作多次：</h1>
                <div style={{
                    display: 'flex',
                    width: '700px',
                    justifyContent: 'space-between'
                }}>
                    {
                        data.map(item => (
                            <DndProvider backend={HTML5Backend} key={item.id}>
                                {/* 要拖动和放置的组件 */}
                                <MoveSourceAndTarget itemData={item} changeUrl={this.changeImgUrl}/>
                            </DndProvider>
                        ))
                    }
                </div>
            </Fragment>
        )
    }
}

export default MoveToBlanks;