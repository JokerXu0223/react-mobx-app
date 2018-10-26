/**
 * @component index.js
 * @description 根store
 * @time 2018/10/25
 * @author JUSTIN XU
 */
import autobind from 'autobind-decorator';

import DemoStore from './demo';
import DownloadFileStore from './downloadFile';

@autobind
class RootStore {
  constructor() {
    this.demoStore = new DemoStore();
    this.downloadFileStore = new DownloadFileStore();
  }
}

export default new RootStore();
