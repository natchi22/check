<template>
	<div class="">
		หน้าไร?
	<nuxt-link to="/freelance">ไป</nuxt-link>
	  img =<img :src="image" alt="">
    name = {{name}}
    userId = {{userId}}
  <nuxt-link to="/freelance/profile">ไปหน้าโปรไฟล์</nuxt-link>

	</div>
</template>


<script>
import liff from '@line/liff'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      image: '',
      name:'',
      userId:''        
    }
  },
  methods:{
    ...mapMutations({
        saveProfile: 'profile/saveProfile'
      }),
  },
  mounted () {
    const data = {
      img : this.image,
      id : this.userId,
      name : this.name
    }
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
            this.saveProfile(profile)
          })
        }
        else{
          liff.login()
        }
      })
      .catch((err) => {
            alert('Connect failed, please try again.')
            liff.closeWindow()
        })
  }
}
</script>
<style>

</style>
