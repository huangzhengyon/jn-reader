import wepy from 'wepy'
// import GoogleAnalytics from 'wxapp-ga'
import { HitBuilders, GoogleAnalytics } from 'wxapp-ga'

export default class GoogleAnalyticsMixin extends wepy.mixin {
    data = {
        trackerForGoogleAnalytics: null,
    }


    getTrackerForGoogleAnalytics() {

        if (!this.trackerForGoogleAnalytics) {
            // 初始化GoogleAnalytics Tracker
            this.trackerForGoogleAnalytics = GoogleAnalytics.getInstance(this)
                .setAppName('即能')
                .setAppVersion('1.0.0')
                .newTracker('UA-124925915-1'); //用你的 Tracking ID 代替

            //使用自己的合法域名做跟踪数据转发
            // this.tracker.setTrackerServer("https://ga-proxy.example.com"); 
            this.trackerForGoogleAnalytics.setTrackerServer("https://wx-small.runwise.cn");
        }
        return this.trackerForGoogleAnalytics;
    }
    testGA() {
        this.getTrackerForGoogleAnalytics().send(new HitBuilders.EventBuilder()
            .setCategory('视频')
            .setAction('点击')
            .setLabel('播放') // 可选
            .setValue(1).build()); // 可选
    }

    methods = {

    }

    onShow() {
        // console.log('mixin onShow')
        // let t = this.$parent.globalData.getTracker()
        let trackerForGoogleAnalytics = this.getTrackerForGoogleAnalytics()

        trackerForGoogleAnalytics.setScreenName('申请内测页');
        trackerForGoogleAnalytics.send(new HitBuilders.ScreenViewBuilder().build());
    }

    onLoad() {
        // console.log('mixin onLoad')
    }
}