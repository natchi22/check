<template>
    <div class="layout-margin">
        <Nuxt />
    </div>
</template>
<style>
    @import '../style/style.css';
</style>
<script>
// import liff from '@line/liff'
// import { mapMutations } from 'vuex'
// export default {
//   data () {
//     return {
//       image: '',
//       name:'',
//       userId:''
//     }
//   },
//   methods:{
//     ...mapMutations({
//         saveProfile: 'profile/saveProfile'
//       }),
//   },
//   mounted () {
//     const data = {
//       img : this.image,
//       id : this.userId,
//       name : this.name
//     }
//     this.$store.commit('saveProfile',data)
//     liff.init({ liffId: '1654989800-V2XxzW4z' })
//       .then(() => {
//         if (liff.isLoggedIn()) {
//           liff.getProfile().then((profile) => {
//             const userId = profile.userId
//             const image = profile.pictureUrl
//             const name = profile.displayName
//             this.userId = userId
//             this.name = name
//             this.image = image
//             this.saveProfile(profile)
//           })
//         }
//         else{
//           liff.login()
//         }
//       })
//       .catch((err) => {
//             alert('Connect failed, please try again.')
//             liff.closeWindow()
//         })
//   }
// }
</script>
