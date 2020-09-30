<template>
  <div class="layout-margin">
    <Nuxt />
    <img :src="image" alt="">
    name = {{name}}
    userId = {{userId}}
  </div>
</template>
<style>
    @import '../style/style.css';
</style>
<script>
import liff from '@line/liff'

export default {
  data () {
    return {
      image: '',
      name:'',
      userId:''        
    }
  },
  mounted () {
    liff.init({ liffId: '1654989800-V2XxzW4z' })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            const userId = profile.userId
            const image = profile.pictureUrl
            const name = profile.displayName
            this.userId = userId
            this.name = name
            this.image = image
          })
        }
        else{
          liff.login()
        }
      }).catch((err) => {
            alert('Connect failed, please try again.')
            liff.closeWindow()
        })
  }
}
</script>
