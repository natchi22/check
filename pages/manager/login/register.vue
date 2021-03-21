<template>
    <div class="login">
        <h1>เพิ่มหัวหน้างาน</h1>
        <a-form @submit.prevent="register">
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.email.required ? 'error' : '' ||
                    submitted && !$v.email.email ? 'error' : ''"
                :help="submitted && !$v.email.required ? 'กรุณากรอกอีเมล' : ''||
                    submitted && !$v.email.email ? 'กรุณากรอกอีเมลให้ถูกต้อง' : ''"
            >
                <template slot="label">
                    Email
                </template>
                <a-input
                    class="input"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.password.required ? 'error' : ''"
                :help="submitted && !$v.password.required ? 'กรุณากรอกรหัสผ่าน' : ''"
            >
                <template slot="label">
                    Password
                </template>
                <a-input-password
                    class="input"
                    name="password"
                    placeholder="รหัสผ่าน"
                    v-model="password"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.fName.required ? 'error' : ''"
                :help="submitted && !$v.fName.required ? 'กรุณากรอกชื่อ' : ''"
            >
                <template slot="label">
                    ชื่อ
                </template>
                <a-input
                    class="input"
                    name="fName"
                    placeholder="ชื่อ"
                    v-model="fName"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.lName.required ? 'error' : ''"
                :help="submitted && !$v.lName.required ? 'กรุณากรอกนามสกุล' : ''"
            >
                <template slot="label">
                    นามสกุล
                </template>
                <a-input
                    class="input"
                    name="lName"
                    placeholder="นามสกุล"
                    v-model="lName"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.telNumber.required ? 'error' : '' ||
                    submitted && !$v.telNumber.numeric ? 'error' : ''"
                :help="submitted && !$v.telNumber.required ? 'กรุณากรอกอีเมล' : ''||
                    submitted && !$v.telNumber.numeric ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง' : ''"
            >
                <template slot="label">
                    เบอร์โทรศัพท์
                </template>
                <a-input
                    class="input"
                    name="telNumber"
                    placeholder="เบอร์โทรศัพท์"
                    v-model="telNumber"
                />
            </a-form-item>
            <a-button
                style="margin-bottom:14px"
                block
                size="large"
                html-type="submit"
                type="primary"
                :loading="loading"
            >
                เพิ่มผู้จัดการ
            </a-button>
        </a-form>
        <a-button
            block
            size="large"
            type="warning"
            @click="$router.go(-1)"
        >
            ย้อนกลับ
        </a-button>
    </div>
</template>
<script>
import toastr from 'toastr'
import { required, email, numeric } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            uid: '',
            password: '',
            fName: '',
            lName: '',
            email: '',
            telNumber: '',
            loading: false,
            submitted: false
        }
    },
    methods: {
        async register() {
            this.submitted = true
            if (this.$v.email.required && this.$v.password.required &&
            this.$v.fName.required && this.$v.lName.required &&
            this.$v.telNumber.required && this.$v.telNumber.numeric) {
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

    },
    validations: {
        password: { required },
        fName: { required },
        lName: { required },
        email: { required, email },
        telNumber: { required, numeric },
    },
}
</script>
<style scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
    /* text-align: center; */
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
