/**
 * @component downloadFile.js
 * @description 下载文件 store
 * @time 2018/10/26
 * @author JUSTIN XU
 */
import { AsyncStorage } from 'react-native';
import RNFS from 'react-native-fs';
import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import Toast from '../utils/toast';
import { downloadFile } from '../utils/downloadFile';

@autobind
class DownloadFileStore {
  @observable videoList = [];
  @observable loading = false;
  // constructor() {
  //   AsyncStorage.clear();
  // }

  @action async clearStrongListReq() {
    const { videoList } = this;
    if (!videoList.length) return;
    videoList.forEach(async (v, i) => {
      await RNFS.unlink(v.uri);
      console.log('FILE DELETED SUCCESS', v.uri);
      if (i === videoList.length - 1) {
        await AsyncStorage.removeItem('videoList');
        runInAction(() => {
          this.videoList = [];
        });
      }
    });
  }

  @action async getDownloadReq() {
    try {
      // downloadFile('https://btccpool.com/static/images/bg.jpg', (pro) => {
      //   console.log('@pro', pro);
      // });
      const uri = await downloadFile('https://hashcloudmining.com//hashcloud_video_grey.mp4', (pro) => {
        // const url = await downloadFile('https://media.w3.org/2010/05/sintel/trailer.mp4', (pro) => {
        runInAction(() => {
          this.loading = pro < 1;
        });
      });
      const videoList = await AsyncStorage.getItem('videoList') || '[]';
      const arr = JSON.parse(videoList);
      arr.push({
        uri,
      });
      await AsyncStorage.setItem('videoList', JSON.stringify(arr));
      runInAction(() => {
        this.videoList = arr;
      });
    } catch (err) {
      Toast.showError(err.message);
    }
  }

  @action async getVideoListReq() {
    try {
      const videoList = await AsyncStorage.getItem('videoList') || '[]';
      this.videoList = JSON.parse(videoList);
    } catch (err) {
      Toast.showError(err.message);
    }
  }

  @action async onDeleteItemReq(path, index) {
    const { videoList } = this;
    try {
      // create a path you want to delete
      await RNFS.unlink(path);
      console.log('FILE DELETED SUCCESS', path);
      videoList.splice(index, 1);
      this.videoList = videoList || [];
      await AsyncStorage.setItem('videoList', JSON.stringify(videoList));
    } catch (err) {
      Toast.showError(err.message);
    }
  }
}

export default DownloadFileStore;
