import wepy from 'wepy'

export default class FolderSelectMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.',
    pool: {
    },
    get selectedFlagPools() {
      return [{
        content: '',
        actived: false
      }, {
        content: '',
        actived: false
      }, {
        content: '',
        actived: false
      }, {
        content: '',
        actived: false
      }, {
        content: '',
        actived: false
      }, {
        content: '',
        actived: false
      }]
    }, // selectedFlagPools
    set selectedFlagPools(value) {

    }
  }
  methods = {
    handleSelectCell({currentTarget: {dataset: {comIndex}}}) {
      this.mixin = 'mixin data was changed'
      console.log('folder mixin method tap', comIndex)
      console.log('folder mixin content', this.selectedFlagPools[comIndex])
      if (this.selectedFlagPools[comIndex]) this.selectedFlagPools[comIndex]['actived'] = !this.selectedFlagPools[comIndex]['actived']
    }
  } // end methods

}
