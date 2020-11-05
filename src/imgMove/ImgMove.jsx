import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImgMoveSource from './components/ImgMoveSource';
import ImgMoveTarget from './components/ImgMoveTarget';

class ImgMove extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgSourceUrl: "https://iconfont.alicdn.com/t/2fc27ba5-e74c-4b6f-915d-cbb1e66ab439.png" ,
            imgTargetUrl: "" 
        }
    }
    changeImgUrl = (sourceUrl, targetUrl) => {
        this.setState({
            imgSourceUrl: sourceUrl,
            imgTargetUrl: targetUrl
        })
    }
    render(){
        return (
            <Fragment>
                <h1>图片单向拖拽：</h1>
                <div style={{
                    display: 'flex',
                    width: '300px',
                    justifyContent: 'space-between'
                }}>
                    <DndProvider backend={HTML5Backend}>
                        {/* 要拖动的组件 */}
                        <ImgMoveSource url={this.state.imgSourceUrl} changeUrl={this.changeImgUrl}/>
                        {/* 接受拖动的组件 */}
                        <ImgMoveTarget url={this.state.imgTargetUrl} />
                    </DndProvider>
                </div>
            </Fragment>
        )
    }
}

export default ImgMove;