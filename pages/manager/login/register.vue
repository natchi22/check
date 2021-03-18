<template>
    <div class="login">
        <h1>เพิ่มหัวหน้างาน</h1>
        <h2>E-mail</h2>
        <input
            type="text"
            placeholder="E-mail"
            v-model="email"
        >
        <h2>Password</h2>
        <input
            type="password"
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
        <button
            class="btn btn-green"
            @click="register"
            :loading="loading"
        >
            เพิ่มหัวหน้างาน
        </button>
        <button
            style="margin-top: 8px"
            class="btn btn-wait"
            @click="$router.go(-1)"
        >
            ย้อนกลับ
        </button>
    </div>
</template>
<script>
import toastr from 'toastr'

export default {
    data() {
        return {
            uid: '',
            password: '',
            fName: '',
            lName: '',
            email: '',
            telNumber: '',
            rank: 'หัวหน้างาน',
            loading: false,
        }
    },
    async mounted() {

    },
    methods: {
        async register() {
            this.loading = true
            await this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    var user = userCredential.user
                    this.uid = user.uid
                    //this.$fireAuth.signOut()
                })
                .catch((error) => {
                    var errorMessage = error.message
                    toastr.error(`เกิดข้อผิดพลาด ${errorMessage}`)
                })
            const user = await this.$fireStore.collection("Manager").doc(this.uid)
            await user.set({
                fName: this.fName,
                lName: this.lName,
                telNumber: this.telNumber,
                managerId: this.uid,
                email: this.email,
            }).then(()=>{
                this.$fireAuth.signInWithEmailAndPassword('superAdmin@gmail.com', 'password')
                this.$router.push('/manager/LkEgEE9HzgT06rcXANfOHyLtPoq2')
                this.loading = false
            }).catch((error) => {
                var errorMessage = error.message
                toastr.error(`เกิดข้อผิดพลาด ${errorMessage}`)
                this.loading = false
            })
        }

    }
}
</script>
<style scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 85%;
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
