/**
 * @component demo.js
 * @description demo store
 * @time 2018/10/27
 * @author JUSTIN XU
 */
import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { getVideoList } from '../services/discover';
import { initFlatList } from './initState';
import Toast from '../utils/toast';

@autobind
class DiscoverStore {
  @observable videoList = initFlatList;

  // 列表
  @action async getVideoListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      const isFirst = pageNumber === 1;
      if (isFirst) {
        this.videoList.refreshing = true;
      } else {
        this.videoList.loadingMore = true;
      }
      const {
        trailers = [],
        totalCount = 0,
        errors = [],
      } = await getVideoList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.videoList.total = totalCount;
        this.videoList.pageNumber = pageNumber;
        if (isFirst) {
          this.videoList.list = [...trailers];
        } else {
          this.videoList.list = this.videoList.list.concat(trailers);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.videoList.refreshing = false;
        this.videoList.loadingMore = false;
      });
    }
  }
}

export default DiscoverStore;

// [{"id":72441,"movieName":"国产科幻《流浪地球》定档预告","coverImg":"http://img5.mtime.cn/mg/2018/10/25/205836.35990255_120X90X4.jpg","movieId":218707,"url":"http://vfx.mtime.cn/Video/2018/10/25/mp4/181025210019382009.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/25/mp4/181025210019382009.mp4","videoTitle":"流浪地球 正式预告","videoLength":70,"rating":-1,"type":["科幻"],"summary":"吴京首演宇航员助力中国科幻"},{"id":72420,"movieName":"东野圭吾《沉睡的人鱼之家》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/24/135036.78263602_120X90X4.jpg","movieId":254606,"url":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024135044050740.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024135044050740.mp4","videoTitle":"沉睡的人鱼之家 中文剧场版预告","videoLength":120,"rating":0,"type":["剧情"],"summary":"催泪的父母之爱"},{"id":72416,"movieName":"《叶问外传：张天志》定档预告","coverImg":"http://img5.mtime.cn/mg/2018/10/24/111134.47096131_120X90X4.jpg","movieId":234316,"url":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024112258582568.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024112258582568.mp4","videoTitle":"张天志 定档预告","videoLength":83,"rating":-1,"type":["动作"],"summary":"张晋杨紫琼托尼贾各显真功夫"},{"id":72408,"movieName":"王千源包贝尔《大人物》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/24/090821.25684408_120X90X4.jpg","movieId":255481,"url":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024090825363206.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/24/mp4/181024090825363206.mp4","videoTitle":"大人物 “跳楼案”版定档预告","videoLength":83,"rating":-1,"type":["犯罪","动作"],"summary":"富二代挑衅警察强拆逼民跳楼"},{"id":72367,"movieName":"《铁血战士》中文终极预告","coverImg":"http://img5.mtime.cn/mg/2018/10/22/083650.60046421_120X90X4.jpg","movieId":227422,"url":"http://vfx.mtime.cn/Video/2018/10/22/mp4/181022083653874222.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/22/mp4/181022083653874222.mp4","videoTitle":"铁血战士 终极预告","videoLength":90,"rating":6.4,"type":["动作","冒险","科幻","惊悚"],"summary":"“铁血”不灭，热血依旧"},{"id":72373,"movieName":"《无敌破坏王2》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/10/22/104643.54636409_120X90X4.jpg","movieId":226450,"url":"http://vfx.mtime.cn/Video/2018/10/22/mp4/181022104811265262.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/22/mp4/181022104811265262.mp4","videoTitle":"无敌破坏王  中国终极预告片","videoLength":75,"rating":-1,"type":["动画","冒险","喜剧","家庭","奇幻"],"summary":"破坏王拉尔夫大闹网络"},{"id":72336,"movieName":"《滴答屋》定档预告片","coverImg":"http://img5.mtime.cn/mg/2018/10/18/105522.82570420_120X90X4.jpg","movieId":251180,"url":"http://vfx.mtime.cn/Video/2018/10/18/mp4/181018105544048673.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/18/mp4/181018105544048673.mp4","videoTitle":"滴答屋 中国内地定档预告","videoLength":117,"rating":-1,"type":["奇幻","喜剧","冒险","家庭","惊悚","科幻","恐怖","悬疑"],"summary":"大魔王大战神秘力量"},{"id":72303,"movieName":"汤姆哈迪《毒液》定档预告 ","coverImg":"http://img5.mtime.cn/mg/2018/10/16/151251.92231589_120X90X4.jpg","movieId":103937,"url":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016153349501790.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016153349501790.mp4","videoTitle":"毒液：致命守护者  “与毒共舞”版定档预告","videoLength":111,"rating":7.3,"type":["动作","科幻","惊悚"],"summary":"汤老湿恶灵附体血口舔屏"},{"id":72302,"movieName":"《海王》定档预告片","coverImg":"http://img5.mtime.cn/mg/2018/10/16/153127.35819866_120X90X4.jpg","movieId":132277,"url":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016142837621932.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016142837621932.mp4","videoTitle":"海王  定档预告片","videoLength":77,"rating":-1,"type":["动作","冒险","奇幻","科幻"],"summary":"海王率领群鲨争夺王位"},{"id":72299,"movieName":"《神奇动物2》定档预告","coverImg":"http://img5.mtime.cn/mg/2018/10/16/152605.11778405_120X90X4.jpg","movieId":232243,"url":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016115514715240.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016115514715240.mp4","videoTitle":"神奇动物：格林沃德之罪  定档预告","videoLength":75,"rating":-1,"type":["冒险","家庭","奇幻"],"summary":"魔法暴击!纽特邓布利多同框"},{"id":72301,"movieName":"《摘金奇缘》定档预告","coverImg":"http://img5.mtime.cn/mg/2018/10/16/142259.36860633_120X90X4.jpg","movieId":233844,"url":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016142314527523.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/16/mp4/181016142314527523.mp4","videoTitle":"摘金奇缘  定档预告片","videoLength":84,"rating":7,"type":["喜剧","爱情"],"summary":"\"壕婆婆\"杨紫琼对决美国媳妇"},{"id":72281,"movieName":"刘亚仁《国家破产之日》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/15/120601.28400237_120X90X4.jpg","movieId":249691,"url":"http://vfx.mtime.cn/Video/2018/10/15/mp4/181015120659161573.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/15/mp4/181015120659161573.mp4","videoTitle":"国家破产之日 预告片","videoLength":55,"rating":0,"type":["剧情"],"summary":""},{"id":72250,"movieName":"迪士尼真人版《阿拉丁》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/12/101330.69941269_120X90X4.jpg","movieId":241773,"url":"http://vfx.mtime.cn/Video/2018/10/12/mp4/181012101111142697.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/12/mp4/181012101111142697.mp4","videoTitle":"阿拉丁 先导预告","videoLength":87,"rating":0,"type":["冒险","家庭","奇幻","歌舞","爱情"],"summary":"取材于阿拉伯民间流传的神话故事"},{"id":72252,"movieName":"《玻璃先生》正式预告片","coverImg":"http://img5.mtime.cn/mg/2018/10/12/102641.78850209_120X90X4.jpg","movieId":250505,"url":"http://vfx.mtime.cn/Video/2018/10/12/mp4/181012102652533562.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/12/mp4/181012102652533562.mp4","videoTitle":"玻璃先生  正式预告片","videoLength":163,"rating":-1,"type":["剧情","悬疑","科幻","惊悚"],"summary":"一美、威利斯大打出手"},{"id":72235,"movieName":"新版《宠物坟场》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/10/10/221817.90889396_120X90X4.jpg","movieId":257670,"url":"http://vfx.mtime.cn/Video/2018/10/10/mp4/181010222833316763.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/10/mp4/181010222833316763.mp4","videoTitle":"宠物坟场 台版中文预告","videoLength":124,"rating":-1,"type":["恐怖"],"summary":"斯蒂芬金经典小说改编"},{"id":72208,"movieName":"人气漫画真人版《王者天下》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/09/153545.75958683_120X90X4.jpg","movieId":255935,"url":"http://vfx.mtime.cn/Video/2018/10/09/mp4/181009153307111224.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/09/mp4/181009153307111224.mp4","videoTitle":"王者天下 先导预告","videoLength":110,"rating":0,"type":["动作","历史","战争"],"summary":"人气漫画《王者天下》真人版"},{"id":72171,"movieName":"彼得杰克逊监制《掠食城市》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/10/06/091129.62020381_120X90X4.jpg","movieId":237246,"url":"http://vfx.mtime.cn/Video/2018/10/06/mp4/181006091533361281.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/06/mp4/181006091533361281.mp4","videoTitle":"掠食城市：致命引擎 中字终极预告","videoLength":155,"rating":-1,"type":["冒险","奇幻","科幻"],"summary":"反乌托邦背景下的移动城市"},{"id":72168,"movieName":"金马提名片《谁先爱上他的》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/05/153003.50329419_120X90X4.jpg","movieId":259910,"url":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005153116740242.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005153116740242.mp4","videoTitle":"谁先爱上他的 预告片","videoLength":110,"rating":-1,"type":["爱情","喜剧","剧情"],"summary":"中年妇女大战男小三"},{"id":72166,"movieName":"《非凡公主希瑞》正式预告","coverImg":"http://img5.mtime.cn/mg/2018/10/05/114702.82723128_120X90X4.jpg","movieId":257653,"url":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005114459198922.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005114459198922.mp4","videoTitle":"非凡公主希瑞 正式预告片","videoLength":164,"rating":-1,"type":["动画","科幻","动作","冒险","家庭"],"summary":"童年回忆希瑞公主归来"},{"id":72163,"movieName":"伊斯特伍德《骡子》预告","coverImg":"http://img5.mtime.cn/mg/2018/10/05/095706.36164023_120X90X4.jpg","movieId":260838,"url":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005095042620189.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005095042620189.mp4","videoTitle":"骡子 预告片","videoLength":144,"rating":0,"type":["惊悚","犯罪","剧情","悬疑"],"summary":"二战老兵成毒品贩子"},{"id":72167,"movieName":"《玛丽女王》中文预告 ","coverImg":"http://img5.mtime.cn/mg/2018/10/05/144454.25271974_120X90X4.jpg","movieId":197804,"url":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005151912131026.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/05/mp4/181005151912131026.mp4","videoTitle":"苏格兰玛丽女王 中文国际版预告","videoLength":149,"rating":-1,"type":["传记","剧情","历史"],"summary":"聚焦英国皇室传奇恩怨"},{"id":72162,"movieName":"韩寒沈腾《飞驰人生》先导预告","coverImg":"http://img5.mtime.cn/mg/2018/10/04/151618.63089112_120X90X4.jpg","movieId":254868,"url":"http://vfx.mtime.cn/Video/2018/10/04/mp4/181004152252487123.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/04/mp4/181004152252487123.mp4","videoTitle":"飞驰人生 先导预告","videoLength":30,"rating":-1,"type":["动作","喜剧"],"summary":"\"寒式幽默\"遇上\"腾式喜感\""},{"id":72156,"movieName":"动画版《蜘蛛侠》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/10/03/095712.54650366_120X90X4.jpg","movieId":228745,"url":"http://vfx.mtime.cn/Video/2018/10/03/mp4/181003095735959762.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/03/mp4/181003095735959762.mp4","videoTitle":"蜘蛛侠：平行宇宙 预告片2","videoLength":147,"rating":-1,"type":["动画","动作","冒险","科幻"],"summary":"蜘蛛侠平行宇宙拓展新世界"},{"id":72151,"movieName":"《火箭人》预告神还原埃尔顿约翰","coverImg":"http://img5.mtime.cn/mg/2018/10/02/073850.49798994_120X90X4.jpg","movieId":255073,"url":"http://vfx.mtime.cn/Video/2018/10/02/mp4/181002111732042844.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/10/02/mp4/181002111732042844.mp4","videoTitle":"火箭人 中文先导预告片","videoLength":65,"rating":0,"type":["传记","剧情","奇幻","音乐","歌舞"],"summary":"讲述英国摇滚巨星埃尔顿·约翰的故事"},{"id":72091,"movieName":"《X战警：黑凤凰》中文先导预告","coverImg":"http://img5.mtime.cn/mg/2018/09/27/132403.58916439_120X90X4.jpg","movieId":241485,"url":"http://vfx.mtime.cn/Video/2018/09/27/mp4/180927130707381557.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/27/mp4/180927130707381557.mp4","videoTitle":"X战警：黑凤凰 中文先导预告","videoLength":122,"rating":-1,"type":["动作","冒险","科幻"],"summary":"黑凤凰觉醒危机重重"},{"id":72048,"movieName":"周润发郭富城《无双》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/09/25/093043.85448073_120X90X4.jpg","movieId":225752,"url":"http://vfx.mtime.cn/Video/2018/09/25/mp4/180925092501717531.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/25/mp4/180925092501717531.mp4","videoTitle":"无双 “钞级赢家”版终极预告","videoLength":77,"rating":7.8,"type":["犯罪","动作"],"summary":"犯罪天才与造假天才双剑合璧"},{"id":72046,"movieName":"《大黄蜂》中文正式预告","coverImg":"http://img5.mtime.cn/mg/2018/09/24/172717.29211879_120X90X4.jpg","movieId":246986,"url":"http://vfx.mtime.cn/Video/2018/09/24/mp4/180924172925058661.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/24/mp4/180924172925058661.mp4","videoTitle":"大黄蜂 中文版“蜂狂开战”预告","videoLength":142,"rating":-1,"type":["动作","冒险","科幻"],"summary":"大黄蜂又帅又萌惹人爱"},{"id":71991,"movieName":"漫威“惊奇队长”中文预告","coverImg":"http://img5.mtime.cn/mg/2018/09/18/204536.32204314_120X90X4.jpg","movieId":218087,"url":"http://vfx.mtime.cn/Video/2018/09/18/mp4/180918204610442500.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/18/mp4/180918204610442500.mp4","videoTitle":"惊奇队长 中文先导预告片","videoLength":119,"rating":-1,"type":["动作","冒险","科幻"],"summary":"万众期待！干掉灭霸就靠她了"},{"id":71997,"movieName":"开心麻花《李茶的姑妈》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/09/19/121104.49185261_120X90X4.jpg","movieId":254620,"url":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919121108161906.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919121108161906.mp4","videoTitle":"李茶的姑妈 终极预告","videoLength":72,"rating":6.2,"type":["喜剧"],"summary":"“三傻”合伙扮假姑妈"},{"id":72017,"movieName":"《无敌破坏王2》新预告","coverImg":"http://img5.mtime.cn/mg/2018/09/20/215658.75700969_120X90X4.jpg","movieId":226450,"url":"http://vfx.mtime.cn/Video/2018/09/21/mp4/180921104509661116.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/21/mp4/180921104509661116.mp4","videoTitle":"无敌破坏王2 中文版预告片2","videoLength":150,"rating":-1,"type":["动画","冒险","喜剧","家庭","奇幻"],"summary":"迪士尼诸多公主大聚会"},{"id":71994,"movieName":"动画《绿毛怪格林奇》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/09/19/093912.15370791_120X90X4.jpg","movieId":233407,"url":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919095245958262.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919095245958262.mp4","videoTitle":"绿毛怪格林奇 “花式神偷”版预告","videoLength":155,"rating":-1,"type":["动画","喜剧","家庭","奇幻"],"summary":"“小黄人”团队新作"},{"id":71996,"movieName":"张艺谋《影》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/09/19/103915.30334424_120X90X4.jpg","movieId":242119,"url":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919103609005609.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/19/mp4/180919103609005609.mp4","videoTitle":"影 终极版预告片","videoLength":119,"rating":7.4,"type":["动作","剧情"],"summary":"新预告动作场面气韵足"},{"id":71975,"movieName":"《新欢乐满人间》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/09/17/215157.45380259_120X90X4.jpg","movieId":228392,"url":"http://vfx.mtime.cn/Video/2018/09/17/mp4/180917215213735941.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/17/mp4/180917215213735941.mp4","videoTitle":"新欢乐满人间 正式中字预告","videoLength":147,"rating":-1,"type":["家庭","奇幻","歌舞"],"summary":"孩子们的仙女保姆又回来了"},{"id":71980,"movieName":"\"龙纹身女孩\"续集预告","coverImg":"http://img5.mtime.cn/mg/2018/09/18/100143.25460044_120X90X4.jpg","movieId":229567,"url":"http://vfx.mtime.cn/Video/2018/09/18/mp4/180918100244501800.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/18/mp4/180918100244501800.mp4","videoTitle":"蜘蛛网中的女孩 正式中字预告","videoLength":60,"rating":-1,"type":["犯罪","剧情","惊悚"],"summary":"克莱尔福伊凶悍亮相"},{"id":71948,"movieName":"杰拉德巴特勒\"冰海陷落\"预告","coverImg":"http://img5.mtime.cn/mg/2018/09/14/072856.57965041_120X90X4.jpg","movieId":157201,"url":"http://vfx.mtime.cn/Video/2018/09/14/mp4/180914072848108088.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/14/mp4/180914072848108088.mp4","videoTitle":"冰海陷落 终极预告","videoLength":65,"rating":-1,"type":["动作","惊悚"],"summary":"第三次世界大战一触即发"},{"id":71943,"movieName":"科恩兄弟《歌谣》预告片","coverImg":"http://img5.mtime.cn/mg/2018/09/13/104310.17480337_120X90X4.jpg","movieId":259954,"url":"http://vfx.mtime.cn/Video/2018/09/13/mp4/180913113053453374.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/13/mp4/180913113053453374.mp4","videoTitle":"巴斯特·斯克鲁格斯的歌谣 预告片","videoLength":123,"rating":0,"type":["喜剧","剧情","西部"],"summary":"付兰兰&连姆尼森参演致敬西部片\n"},{"id":71873,"movieName":"凯瑞穆里根《狂野生活》预告","coverImg":"http://img5.mtime.cn/mg/2018/09/07/135800.44859454_120X90X4.jpg","movieId":236797,"url":"http://vfx.mtime.cn/Video/2018/09/07/mp4/180907135906609714.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/07/mp4/180907135906609714.mp4","videoTitle":"狂野生活  中字预告片","videoLength":155,"rating":-1,"type":["剧情"],"summary":"保罗达诺导演处女作口碑爆棚"},{"id":71850,"movieName":"杨幂《宝贝儿》预告","coverImg":"http://img5.mtime.cn/mg/2018/09/06/083012.86422925_120X90X4.jpg","movieId":254854,"url":"http://vfx.mtime.cn/Video/2018/09/06/mp4/180906083142712290.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/06/mp4/180906083142712290.mp4","videoTitle":"宝贝儿 先导预告","videoLength":15,"rating":6.8,"type":["剧情"],"summary":"医院护工\"偷小孩\"折射弃婴遭遇"},{"id":71841,"movieName":"贾樟柯《江湖儿女》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/09/05/134901.74029650_120X90X4.jpg","movieId":250339,"url":"http://vfx.mtime.cn/Video/2018/09/05/mp4/180905134907179704.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/05/mp4/180905134907179704.mp4","videoTitle":"江湖儿女 终极预告片","videoLength":72,"rating":7.8,"type":["犯罪","爱情"],"summary":"廖凡赵涛共谱传奇爱情"},{"id":71811,"movieName":"高司令《登月第一人》新预告","coverImg":"http://img5.mtime.cn/mg/2018/09/03/202803.80336695_120X90X4.jpg","movieId":229976,"url":"http://vfx.mtime.cn/Video/2018/09/03/mp4/180903202704533375.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/03/mp4/180903202704533375.mp4","videoTitle":"登月第一人 台版中字预告","videoLength":90,"rating":7.6,"type":["传记","剧情","历史"],"summary":"震撼再现登月传奇"},{"id":71819,"movieName":"《我的天才女友》预告","coverImg":"http://img5.mtime.cn/mg/2018/09/04/155929.41301926_120X90X4.jpg","movieId":259155,"url":"http://vfx.mtime.cn/Video/2018/09/04/mp4/180904155412689104.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/09/04/mp4/180904155412689104.mp4","videoTitle":"我的天才女友 预告片","videoLength":121,"rating":0,"type":["剧情"],"summary":"畅销小说改编 两位闺蜜情深意长"},{"id":71788,"movieName":"休·杰克曼《领先者》预告","coverImg":"http://img5.mtime.cn/mg/2018/08/30/230722.32223160_120X90X4.jpg","movieId":249339,"url":"http://vfx.mtime.cn/Video/2018/08/30/mp4/180830230725882639.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/30/mp4/180830230725882639.mp4","videoTitle":"领先者 中字预告","videoLength":122,"rating":0,"type":["传记","剧情"],"summary":"风光一时却因丑闻戏剧性落败"},{"id":71757,"movieName":"锤哥《皇家酒店谋杀案》预告","coverImg":"http://img5.mtime.cn/mg/2018/08/29/082709.43112382_120X90X4.jpg","movieId":257745,"url":"http://vfx.mtime.cn/Video/2018/08/29/mp4/180829082744092695.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/29/mp4/180829082744092695.mp4","videoTitle":"皇家酒店谋杀案 剧场版中文预告片","videoLength":123,"rating":-1,"type":["悬疑","惊悚"],"summary":"密室悬疑戏充满诡异"},{"id":71744,"movieName":"玄彬张东健僵尸片《猖獗》预告","coverImg":"http://img5.mtime.cn/mg/2018/08/28/152259.94317561_120X90X4.jpg","movieId":256396,"url":"http://vfx.mtime.cn/Video/2018/08/28/mp4/180828152314850264.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/28/mp4/180828152314850264.mp4","videoTitle":"猖獗 预告片","videoLength":60,"rating":0,"type":["动作"],"summary":"玄彬血战僵尸群"},{"id":71707,"movieName":"新版《阴风阵阵》正式预告","coverImg":"http://img5.mtime.cn/mg/2018/08/23/222035.36075552_120X90X4.jpg","movieId":168207,"url":"http://vfx.mtime.cn/Video/2018/08/23/mp4/180823222144907956.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/23/mp4/180823222144907956.mp4","videoTitle":"阴风阵阵 正式预告","videoLength":157,"rating":-1,"type":["奇幻","恐怖","悬疑","惊悚"],"summary":"参赛威尼斯的文艺范儿恐怖片"},{"id":71712,"movieName":"《悲伤逆流成河》“校园欺凌”预告","coverImg":"http://img5.mtime.cn/mg/2018/08/24/105030.21062701_120X90X4.jpg","movieId":250539,"url":"http://vfx.mtime.cn/Video/2018/08/24/mp4/180824105213943957.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/24/mp4/180824105213943957.mp4","videoTitle":"悲伤逆流成河 “如果”版预告片","videoLength":67,"rating":6.1,"type":["剧情"],"summary":"反清新套路直面残酷现实"},{"id":71652,"movieName":"《碟中谍6》终极预告","coverImg":"http://img5.mtime.cn/mg/2018/08/20/110454.49211648_120X90X4.jpg","movieId":226992,"url":"http://vfx.mtime.cn/Video/2018/08/20/mp4/180820110500179769.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/20/mp4/180820110500179769.mp4","videoTitle":"碟中谍6 终极预告","videoLength":78,"rating":7.9,"type":["动作","冒险","惊悚"],"summary":"阿汤哥再次徒手扒飞机"},{"id":71622,"movieName":"《寡妇特工》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/08/16/080004.76663845_120X90X4.jpg","movieId":236877,"url":"http://vfx.mtime.cn/Video/2018/08/16/mp4/180816075924846198.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/16/mp4/180816075924846198.mp4","videoTitle":"寡妇特工 中字剧场版预告","videoLength":143,"rating":-1,"type":["犯罪","剧情","惊悚"],"summary":"结合黑人和女权主题"},{"id":71574,"movieName":"《阿尔法：狼伴归途》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/08/13/083952.78968548_120X90X4.jpg","movieId":229758,"url":"http://vfx.mtime.cn/Video/2018/08/13/mp4/180813084109743369.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/13/mp4/180813084109743369.mp4","videoTitle":"阿尔法：狼伴归途 定档预告","videoLength":60,"rating":6.8,"type":["冒险","剧情","家庭"],"summary":"科达和“狼主角”阿尔法的不凡冒险"},{"id":71537,"movieName":"迪士尼《胡桃夹子》中文预告","coverImg":"http://img5.mtime.cn/mg/2018/08/08/170834.76530809_120X90X4.jpg","movieId":232384,"url":"http://vfx.mtime.cn/Video/2018/08/08/mp4/180808170733434024.mp4","hightUrl":"http://vfx.mtime.cn/Video/2018/08/08/mp4/180808170733434024.mp4","videoTitle":"胡桃夹子与四个王国 中文剧场版预告片","videoLength":93,"rating":-1,"type":["冒险","家庭","奇幻"],"summary":"少女克拉拉面临邪恶的挑战"}]
