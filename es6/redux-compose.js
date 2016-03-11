//compose 是让你不使用深度右括号的情况下来写深度嵌套的函数。

export default function compose(...funcs) {
  return (...args) => {
    if (funcs.length === 0) {
      return args[0]
    }
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)

    return rest.reduceRight(
      (composed, f) =>
        f(composed), last(...args)
    )
  }
}

// 不使用 compose 来写是这样子：
//
// finalCreateStore =
//   applyMiddleware(middleware)(
//     devTools()(
//       persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))(
//         createStore
//       )
//     )
//   );

finalCreateStore = compose(
  applyMiddleware(...middleware),
  require('redux-devtools').devTools(),
  require('redux-devtools').persistState(
    window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  ),
  createStore
);
