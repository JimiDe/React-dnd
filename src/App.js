import React, { Fragment } from 'react';
import ImgMove from './imgMove';
import ImgMoveDouble from './imgMoveDouble';

class App extends React.Component{
  render(){
    return (
      <Fragment>
        <ImgMove />
        <ImgMoveDouble />
      </Fragment>
    )
  }
}

export default App;
