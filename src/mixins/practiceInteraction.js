import wepy from 'wepy'

export default class PracticeInteraction extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  } // end data

  methods = {
    tap() {
      console.log('PracticeInteraction mixin method tap')
    } // end tap
  } // end methods

  onShow() {
    console.log('mixin onShow')
  } // end onShow

  onLoad() {
    console.log('mixin onLoad')
  } // end onLoad
}
