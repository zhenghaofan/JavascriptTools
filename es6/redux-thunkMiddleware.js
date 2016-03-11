//middleware用于包装store的dispatch, 使得异步时可以dispatch actions
//ES5:

'use strict'

function thunkMiddleWare(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;
  //next表示下一个middleware
  return function(next) {
    return function (action) {
      return typeof action === 'function' ? action(dispatch, getState) : next(action);
    }
  }
}

module.exports = thunkMiddleWare;

//ES6
module.exports = ({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ? action(dispatch, getState) : next(action)
}

//thunkMiddleWare example
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

function usingThunk(forPerson) {

  // 控制反转！
  // 返回一个接收 `dispatch` 的函数。
  // Thunk middleware 知道如何把异步的 thunk action 转为普通 action。

  return function (dispatch) {
    return fetchAPI().then( //fetch返回promise
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    )
  }
}

// Thunk middleware 可以让我们像 dispatch 普通 action
// 一样 dispatch 异步的 thunk action。

store.dispatch(
  usingThunk('Me')
)


//middleware logger实现：

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

let createStoreWithMiddleware = applyMiddleware(logger)(createStore)
let store = createStoreWithMiddleware(todos, [ 'Use Redux' ])
let addAction = {type: 'ADD_TODO',text: 'Understand the middleware'}

store.dispatch( addAction )//log: will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' , state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
