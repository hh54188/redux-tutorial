import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MyForm from './MyForm';

/** 
 * reducer是一个pure function, 没有任何副作用
 * 只依赖传入参数，并且根据参数返回唯一
 * 
 * 不同的reducer可以合并成在一个rootReducer中
 */
const reducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT': return { counter: state.counter + 1 };
    case 'FETCH_DATA_COMPLETE': console.log(action.payload); return state; break;
    case 'FETCH_DATA_ERROR': console.log(action.payload); return state; break;
    default: return state;
  }
}

/**
 * 只有一个全局state对象维护整个程序的状态，
 * 这也就是所谓的 single source
 * 
 * store代表着state, 但是是通过reducer
 * 当然你也可以传入处室状态state
 */
const store = createStore(reducer, { counter: 0 },  applyMiddleware(thunk));

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchMockyData();
  }
  render() {
    const { counter, onIncrement } = this.props;
    return (
      <div>
        <h1>{counter}</h1>
        <button onClick={onIncrement}>Add</button>
        <MyForm />
      </div>
    )
  }
}
/**
 * mapStateToProps必须要时一个函数
 * 它实际上的工作是订阅了Store的状态变化
 * 并传导给组件
 *  
 */
const mapStateToProps = (state) => {
  return { counter: state.counter };
}

/**
 * actions
 */
const actionCreator = {
  increase: () => {
    return {
      type: 'INCREMENT'
    };
  },
  fetchMockyData: (url) => {
    return function(dispatch) {
      return fetch(new Request(url))
        .then((result) => {
          dispatch({
            type: 'FETCH_DATA_COMPLETE',
            payload: result,
          });
        }).catch((error) => {
          dispatch({
            type: 'FETCH_DATA_ERROR',
            payload: error,
          });
        });
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Action Creator
     * 唯一修改 state 的方式就是通过触发 action
     * action 由 action creator 构造，
     * 本质上就是通过 dispath 方法构造一个 command
     * { type: , payload: }
     * （command比event更合适，因为这里有 command hander
     * 而不涉及订阅和发布）
     */
    onIncrement: () => {
      dispatch(actionCreator.increase())
    },
    fetchMockyData: () => dispatch(actionCreator.fetchMockyData('http://www.mocky.io/v2/59aec7601300004b060358d6'))
  }
}
/**
 * 通俗一点来说，connect 就是将Redux flow/Container与React组件连接起来的桥梁
 * Redux Contaienr中有你要的状态，action creator，你需要通过connect将它们导入
 * React组件中
 * 
 * connect 函数把 mapStateToProps 和 mapDispatchToProps 的返回值
 * 并把它们作为 Counter 组件的 props
 * 
 * 这种模式是HOC，通过组合的方式将一个组件封装为另一个组件，
 * 最外层包裹的组件是 container component，内被封装的组件是 wrppered component
 * connect 返回的是一个 enhance function，
 * 再通过上面的HOC的模式重新封装 wrappered component
 * 
 */
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

class TutorialApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      /**
       * Provider 将应用包裹起来，
       * 并且将store传递给孩子组件
       */
      <Provider store={store}>
        <Counter />
      </Provider>
    )
  }
}

export default TutorialApp;