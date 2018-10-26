/**
 * @component demo.js
 * @description demo store
 * @time 2018/10/22
 * @author JUSTIN XU
 */
// import { action, reaction, observable, observe, computed, autorun, runInAction } from 'mobx';
import { action, reaction, observable } from 'mobx';
import autobind from 'autobind-decorator';
import { delay } from '../services/demo';

@autobind
class DemoStore {
  @observable counter = 0;
  @observable total = 0;
  @observable loading = '';

  constructor() {
    reaction(() => this.counter, this.increaseTotal);
  }

  // async action, must use runInAction after fetch
  // @action async getRedPacketListReq() {
  //   try {
  //     const {
  //       totalCount = null,
  //       result = [],
  //     } = await getRedPacketList();
  //     runInAction(() => {
  //       this.redPackTotal = totalCount;
  //       this.redPackList = [...result];
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  @action increaseTotal() {
    this.total++;
    this.loading = '';
  }

  @action async increase() {
    this.loading = 'increase';
    await delay();
    this.counter++;
  }

  @action async decrease() {
    this.loading = 'decrease';
    await delay();
    this.counter--;
  }
}

export default DemoStore;
