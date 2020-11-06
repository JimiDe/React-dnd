import React, { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MoveSource from './components/MoveSource';
import MoveTarget from './components/MoveTarget';
import first from './../picture/first-pink.png';

class MoveToBlank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgSourceUrl: first,
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
                <h1>图片可拖拽至粉色空白区域，仅可操作一次：</h1>
                <div style={{
                    display: 'flex',
                    width: '300px',
                    justifyContent: 'space-between'
                }}>
                    <DndProvider backend={HTML5Backend}>
                        {/* 要拖动的组件 */}
                        <MoveSource url={this.state.imgSourceUrl} changeUrl={this.changeImgUrl}/>
                        {/* 接受拖动的组件 */}
                        <MoveTarget url={this.state.imgTargetUrl} />
                    </DndProvider>
                </div>
            </Fragment>
        )
    }
}

export default MoveToBlank;