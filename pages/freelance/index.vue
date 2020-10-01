<template>
	<div >

        {{profile}}
        <div class="regis">
            <h1>กรอกข้อมูลส่วนตัว</h1>
            <div class="cover">
                <img class="pic size-pic" src="../../assets/som.jpeg" alt="รูปโปรไฟล์">
            </div>
            
            <h2>ชื่อ</h2>
            <input type="text" placeholder="ชื่อ*">
            <h2>นามสกุล</h2>
            <input type="text" placeholder="นามสกุล*">
            <h2>เบอร์โทรศัพท์</h2>
            <input type="text" placeholder="เบอร์โทรศัพท์*">
            <nuxt-link to="/freelance/checkIn">
                <button class="btn btn-green">ถัดไป</button>
            </nuxt-link>
	    </div>
	</div>
</template>

<script>
// import liff from '@line/liff'
import { mapState,mapMutations } from 'vuex'
export default {
computed: {
//     ...mapState({
//     // arrow functions can make the code very succinct!
//     saveProfile: state => state.saveProfile.profile
//   })
},
  methods:{
    // ...mapMutations({
    //     saveProfile: 'profile/saveProfile'
    //   }),
  },
mounted(){
    // const data = {
    //   img : this.image,
    //   id : this.userId,
    //   name : this.name
    // }
    // liff.init({ liffId: '1654989800-V2XxzW4z' })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       liff.getProfile()
    //       .then((profile) => {
    //            alert('Connect failed, please try again.')
    //           console.log('profile');
    //         const userId = profile.userId
    //         const image = profile.pictureUrl
    //         const name = profile.displayName
    //         this.userId = userId
    //         this.name = name
    //         this.image = image
    //         this.saveProfile(profile)
    //         this.router.push('/freelance')
    //       })
    //     }
    //     else{
    //       liff.login()
    //     }
    //   })
    //   .catch((err) => {
    //         alert('Connect failed, please try again.')
    //         liff.closeWindow()
    //     })
}

}
</script>
<style scoped>
h1{
	font-size: 24px;
    margin-bottom: 20px;
}
.regis{
    width: 245px;
    margin: 0 auto;
}
.size-pic{
    width: 80px;
    height: 80px;
}
.cover{
    margin-bottom: 24px;
}
.regis h2{
    font-size: 14px;
}
.btn{
    margin-top: 10px;
}

</style>