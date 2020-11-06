import React, { Fragment } from 'react';
import MoveToBlank from './MoveToBlank';
import MoveToBlanks from './MoveToBlanks';
import MoveExchange from './MoveExchange';
import MoveOrder from './MoveOrder';

class App extends React.Component{
  render(){
    return (
      <Fragment>
        <MoveToBlank />
        <MoveToBlanks />
        <MoveExchange />
        <MoveOrder />
      </Fragment>
    )
  }
}

export default App;
