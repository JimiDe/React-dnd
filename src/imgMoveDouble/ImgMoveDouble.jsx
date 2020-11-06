import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MoveSourceAndTarget from './components/MoveSourceAndTarget';
import girl2 from './../picture/girl2.png';
import longCat from './../picture/longCat.png';
import warMan from './../picture/warMan.png';

class ImgMove extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [{
                    id: 0,
                    url: girl2
                },
                {
                    id: 1,
                    url: longCat
                },
                {
                    id: 2,
                    url: ""
                },
                {
                    id: 3,
                    url: warMan
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
                <h1>图片双向拖拽：</h1>
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

export default ImgMove;