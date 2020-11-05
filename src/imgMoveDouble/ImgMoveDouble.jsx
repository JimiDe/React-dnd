import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MoveSourceAndTarget from './components/MoveSourceAndTarget';
// import ImgMoveTarget from './components/ImgMoveTarget';

class ImgMove extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [{
                    id: 0,
                    url: "https://iconfont.alicdn.com/t/2fc27ba5-e74c-4b6f-915d-cbb1e66ab439.png"
                },
                {
                    id: 1,
                    url: ""
                },
                {
                    id: 2,
                    url: ""
                },
                {
                    id: 3,
                    url: ""
                },
            ]
        }
    }
    changeImgUrl = (sourceIndex, targetIndex) => {
        let urlData = JSON.parse(JSON.stringify(this.state.data));
        let tempUrl = urlData[sourceIndex].url;
        urlData[sourceIndex].url = urlData[targetIndex].url;
        urlData[targetIndex].url = tempUrl;
        console.log(urlData);
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
                    width: '800px',
                    justifyContent: 'space-between'
                }}>
                    {
                        data.map(item => (
                            <DndProvider backend={HTML5Backend}>
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