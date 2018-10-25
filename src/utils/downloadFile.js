/**
 * @component downloadFile.js
 * @description 下载文件
 * @time 2018/10/23
 * @author JUSTIN XU
 */
import RNFS from 'react-native-fs';
import { Platform, CameraRoll } from 'react-native';

export const downloadFile = (uri, callback) => {
  if (!uri) return null;
  return new Promise((resolve, reject) => {
    const timestamp = (new Date()).getTime();// 获取当前时间错
    const random = String(((Math.random() * 1000000) | 0));// 六位随机数
    const dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android
    const suffixIndex = uri.lastIndexOf('.');
    const suffix = uri.slice(suffixIndex) || '.jpg';
    const downloadDest = `${dirs}/${timestamp + random}${suffix}`;
    // const downloadDest = `${dirs}/${timestamp+random}.zip`;
    // const downloadDest = `${dirs}/${timestamp+random}.mp4`;
    // const downloadDest = `${dirs}/${timestamp+random}.mp3`;
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => {
        console.log('begin', res);
        // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
      progress: (res) => {
        const pro = res.bytesWritten / res.contentLength;
        callback(pro);// 下载进度
      },

    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then((res) => {
        console.log('success', res);
        console.log(`file://${downloadDest}`);
        resolve(`file://${downloadDest}`);
        const promise = CameraRoll.saveToCameraRoll(downloadDest);
        promise.then((result) => {
          console.log(`保存成功！地址如下：\n${result}`);
        }).catch((error) => {
          console.log('error', error);
          // alert('保存失败！\n' + error);
        });
        resolve(res);
      }).catch((err) => {
        reject(new Error(err));
      });
    } catch (e) {
      reject(new Error(e));
    }
  });
};
