<template>
	<div >
        <div class="regis">
            <h1>กรอกข้อมูลส่วนตัว</h1>
            <div class="cover">
                <img class="pic size-pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">  <!-- ชื่อไฟล์.ตัวที่เอาไปเก็บ -->
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
computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
    ...mapState({
    profile: state => state.profile.profileData // มาทำอันนี้พรุ่งนี้
  })
},
  methods:{
      
  },

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