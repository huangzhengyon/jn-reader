import wepy from 'wepy'

export default class LoadingMixin extends wepy.mixin {
    data = {
        imageLoaded: false
    }

    methods = {
        handleImageLoaded(event) {
            this.imageLoaded = true
            this.$apply()
        },
        handleFailToLoadImage(event) {
            console.log('catch image load error', event)
            this.$emit('failToLoadImage', {componentOffset: this.$index})
        },
        handleReloadImage(event) {
            this.$emit('tendToReloadImage', {componentOffset: this.$index})
        }
    }
}
