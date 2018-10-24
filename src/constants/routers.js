/**
 * @component routers.js
 * @description 路由配置
 * @time 2018/10/23
 * @author JUSTIN XU
 */
export default {
  // initial loading screen
  authLoading: 'app.authLoading',
  // Auth Stack
  auth: 'app.auth',
  signIn: 'app.auth.signIn',
  signUp: 'app.auth.signUp',
  // Root Stack
  root: 'app.root',
  // Root Stack -> Modals
  search: 'app.root.search',
  // tabView
  tabView: 'app.root.tabView',
  // Root Stack -> TabView Stack -> Home
  home: 'app.root.tabView.home',
  // Root Stack -> TabView Stack -> Demo
  demo: 'app.root.tabView.demo',
  download: 'app.root.tabView.demo.download',
};
