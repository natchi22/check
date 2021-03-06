<template>
    <div class="login">
        <h1>สมัครสมาชิก</h1>
        <div class="div-pic">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
        </div>
        <h2>E-mail</h2>
        <input
            type="text"
            placeholder="E-mail"
            v-model="email"
        >
        <h2>Password</h2>
        <input
            type="text"
            placeholder="รหัสผ่าน"
            v-model="password"
        >
        <h2>ชื่อ</h2>
        <input
            type="text"
            placeholder="ชื่อ"
            v-model="fName"
        >
        <h2>นามสกุล</h2>
        <input
            type="text"
            placeholder="นามสกุล"
            v-model="lName"
        >
        <h2>เบอร์โทรศัพท์</h2>
        <input
            type="text"
            placeholder="เบอร์โทรศัพท์"
            v-model="telNumber"
        >
        <nuxt-link to="/manager/login">
            <button
                class="btn btn-green"
                @click="register"
            >
                สมัครสมาชิก
            </button>
        </nuxt-link>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            password: '',
            fName: '',
            lName: '',
            email: '',
            lineId: '',
            telNumber: '',
            rank: 'หัวหน้างาน',
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    async mounted() {

    },
    methods: {
        async register() {
            // const email = document.getElementById('email').value;
            // const password = document.getElementById('password').value;
            // if(password.length<8){
            //     alert("ตั้งรหัสผ่านใหม่")
            // } //เงื่อนไขตั้งรหัสผ่าน
            const user = this.$fireStore.collection("Manager").doc()
            await user.set({
                freelanceId: user.id,
                firstName: this.fName,
                lastName: this.lName,
                phone: this.telNumber,
                email: this.email,
                lineId: this.profile.userId,
                pictureUrl: this.profile.pictureUrl,
                rank: this.rank,
            })
            console.log(user)
            
            // firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            //     .then((userCredential) => {
            //     // Signed in 
            //     var user = userCredential.user;
            //     // ...
            //     })
            //     .catch((error) => {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     // ..
            //     });

        }

    }
}
</script>
<style scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 245px;
    margin: 0 auto;
    text-align: center;
    color: #000000;
}
.login h1{
    font-size: 36px;
    font-weight: bold;
    color: #3ABCA7;
    margin: 30px 0 16px 0;
}
h2{
    text-align: left;
}
.div-pic{
    display: flex;
    justify-content: center;
    margin: 0 0 16px 0;
}
.size-pic{
    width: 80px;
    height: 80px;
}
</style>
