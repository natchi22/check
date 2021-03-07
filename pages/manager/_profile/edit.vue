<template>
    <div class="body">	
        <img 
            class="pic size-pic"
            :src="profile.pictureUrl"
            alt="รูปโปรไฟล์"
        >
        <h2>ชื่อ</h2>
        <input 
            type="text" 
            placeholder="ชื่อ*" 
            v-model="fName"
        >
        <h2>นามสกุล</h2>
        <input 
            type="text" 
            placeholder="นามสกุล*" 
            v-model="lName"
        >
        <h2>เบอร์โทรศัพท์</h2>
        <input 
            type="text" 
            placeholder="เบอร์โทรศัพท์*" 
            v-model="telNumber"
        >
		<h2>E-mail</h2>
        <input 
            type="text" 
            placeholder="E-mail*" 
            v-model="email"
        >
        <h2>Password</h2>
        <input 
            type="text" 
            placeholder="Password*" 
            v-model="password"
        >
        <!-- บันทึกข้้อมูลส่วนตัว ไปหน้าแรก ของตัวเอง -->
        <!-- <nuxt-link to="/head/profile/boss"> -->
            <div class="div-btn">
                <button 
                    class="btn btn-green" 
                    @click="summit"
                >
                    บันทึก
                </button>
            </div> 
        <!-- </nuxt-link> -->
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
        return{
            fName: '',
            lName: '',
			telNumber: '',
            email:'',
            password:''
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    async mounted() {
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const infor = await this.$fireStore.collection("Manager").where("lineId", '==', this.profile.userId).get()
        infor.forEach((doc)=>{
            this.fName = doc.data().firstName
            this.lName = doc.data().lastName
            this.telNumber = doc.data().phone
            this.email = doc.data().email
            this.password = doc.data().password
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    },
    methods: { ///แก้ตรงนี้ แก้โปรไฟล์
        async summit() { ///input db ??? "'async' 'await'"ใส่ไว้รอ    /// กด submit แล้วเก็บข้อมูลที่ update
            await this.$fireStore.collection("Freelance")
                .where('lineId', '==', this.profile.userId)
                .get().then((query) => {
                    const profile = query.docs[0]
                    profile.ref.update({
                        firstName: this.fName,
                        lastName: this.lName,
                        phone: this.telNumber,
                        // email: this.email, //ไม่ให้แก้ email
                        pass: this.password,
                    }).then(() => {
                        this.$router.replace(`/manager/${this.profile.userId}`)
                    })
                })
        }
    }
}
</script>
<style scoped>
.size-pic{
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 26px auto;
}
.div-btn{
    display: flex;
    justify-content: center;
}
.btn{
    width: 245px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.body{
    width: 400px;
    margin: 0 auto;
}
}
</style>