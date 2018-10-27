/**
 * @component discover.js
 * @description 发现 service
 * @time 2018/10/27
 * @author JUSTIN XU
 */
import axios from '../utils/request';

/** 获取视频地址
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 * }
 * @return Promise<ArrayList>
 */
export function getVideoList({
  pageNumber = 1,
  pageSize = 15,
}) {
  return axios.get('/PageSubArea/TrailerList.api', {
    params: {
      pageNumber,
      pageSize,
    },
  });
}
