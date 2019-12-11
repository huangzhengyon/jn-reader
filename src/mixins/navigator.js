import wepy from 'wepy'

export default class Navigator extends wepy.mixin {
    data = {
            isHomeBackShow: false
        } // end data

    methods = {
            handleBackHome(event) {
                return new Promise((resolve, reject) => {
                    wx.reLaunch({
                            url: '/pages/tabPages/home',
                            success: response => resolve(response),
                            fail: error => reject(error)
                        }) // end reLaunch
                })
            } // handleBackHome
        } // end methods

    onShow() {
        let pages = getCurrentPages()
        this.isHomeBackShow = 1 === pages.length
    }

}
