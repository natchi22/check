<template>
	<div>
        <div class="regis">
            <h1>กรอกข้อมูลส่วนตัว</h1>
            <div class="cover">
                <img class="pic size-pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">  <!-- ชื่อไฟล์.ตัวที่เอาไปเก็บ -->
            </div>
            <h2>ชื่อ</h2>
            <input type="text" placeholder="ชื่อ*" v-model="fName">
            <h2>นามสกุล</h2>
            <input type="text" placeholder="นามสกุล*" v-model="lName">
            <h2>เบอร์โทรศัพท์</h2>
            <input type="text" placeholder="เบอร์โทรศัพท์*" v-model="telNumber">
            <nuxt-link to="/freelance/checkIn">
                <button class="btn btn-green" @click="summit">ถัดไป</button>
            </nuxt-link>
	    </div>
	</div>
</template>

<script>
// import liff from '@line/liff'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            // img: '',
            inforFrelance:{},
            freelanceData:'',
            fName: '',
            lName: '',
            telNumber: '',
            lineId: ''			,
            task:null,

        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย   
        ...mapState({
        profile: state => state.profile.profileData
    })
    },
    async mounted(){
    
    },
    methods:{
        async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ
            const user = this.$fireStore.collection("Freelance").doc()
            await user.set({
                freelanceId : user.id,
                firstName : this.fName,
                lastName : this.lName,
                phone : this.telNumber,
                lineId : this.profile.userId,
                // pictureUrl : profile.pictureUrl
            })
            console.log(user)
        },
        //เอาidมาเก็บหน้านี้ ละโยนเข้าfirestore
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