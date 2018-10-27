/**
 * @component theme.js
 * @description 主题
 * @time 2018/7/30
 * @author JUSTIN XU
 */
import { moderateScale } from '../utils/scale';
import { getHeaderHeight, getHeaderPadding } from '../utils/device';

export default {
  primaryColor: '#5983F0',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  headerBackgroundColor: '#333333',
  dangerColor: '#D32E2B',
  headerColor: '#ffffff',
  borderColor: '#F6F6F6',
  pageBackColor: '#F6F6F6',
  textColor: '#484848',
  textGrayColor: '#A3A3A3',
  textSwipeItemColor: '#666666',
  textFormColor: '#373737',
  textPlaceholderColor: '#AEAEAE',
  textWeekColor: '#838383',
  textWeekDayColor: '#5E5E5E',
  listTitleColor: '#4F4F4F',
  listTipColor: '#787878',
  chartLineColor: '#5374C7',
  titleBackColor: '#FDFDFD',
  fontMedium: 'PingFangSC-Medium',
  fontRegular: 'PingFangSC-Regular',
  avatarSize: 60,
  headerHeight: 45,
  iconSize: 22,
  moderateScale: (size, factor) => moderateScale(size, factor),
  // header
  headerStyle: {
    paddingTop: getHeaderPadding(true),
    backgroundColor: '#333238',
    elevation: 0, // 去掉阴影
    height: getHeaderHeight() - getHeaderPadding(),
  },
  headerTitleStyle: {
    flex: 1,
    color: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
};
