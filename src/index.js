/**
 * @component index.js
 * @description 入口页面
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import React from 'react';
import Navigator from './router';

class App extends React.Component {
  render() {
    return (
      <Navigator {...this.props} />
    );
  }
}

export default App;
