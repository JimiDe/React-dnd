import React, { Fragment } from 'react';
import ImgMove from './imgMove';
import ImgMoveDouble from './imgMoveDouble';
import ImgReorder from './ImgReorder';

class App extends React.Component{
  render(){
    return (
      <Fragment>
        <ImgMove />
        <ImgMoveDouble />
        <ImgReorder />
      </Fragment>
    )
  }
}

export default App;
