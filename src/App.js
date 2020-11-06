import React, { Fragment } from 'react';
import MoveToBlank from './MoveToBlank';
import MoveToBlanks from './MoveToBlanks';
import MoveExchange from './MoveExchange';

class App extends React.Component{
  render(){
    return (
      <Fragment>
        <MoveToBlank />
        <MoveToBlanks />
        <MoveExchange />
      </Fragment>
    )
  }
}

export default App;
