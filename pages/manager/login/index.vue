<template>
    <div class="login">
        <h1>เข้าสู่ระบบ</h1>
        <a-form @submit.prevent="onLoginSubmit">
            <a-form-item
                :validateStatus="submitted && !$v.email.required ? 'error' : '' ||
                    submitted && !$v.email.email ? 'error' : ''"
                :help="submitted && !$v.email.required ? 'กรุณากรอก อีเมล' : ''||
                    submitted && !$v.email.email ? 'กรุณากรอก อีเมล ให้ถูกต้อง' : ''"
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
                :validateStatus="submitted && !$v.password.required ? 'error' : ''"
                :help="submitted && !$v.password.required ? 'กรุณากรอก รหัสผ่าน' : ''"
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
            <a-button
                size="large"
                html-type="submit"
                class="button login"
                type="primary"
            >
                เข้าสู่ระบบ
            </a-button>
        </a-form>
    </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex' //ไม่ได้ใช้รูปไม่ต้องเอามา
import toastr from 'toastr'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: { // นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    methods: { //ปิดloginไว้ก่อน ทำสมัครสมาชิกไม่ได้
        ...mapMutations({
            saveProfile: 'profile/saveProfile'
        }),

        async login(e) {
            e.preventDefault()
            if (this.email && this.password) {
                try {
                    await this.$fireAuth.signInWithEmailAndPassword(this.email, this.password).then((response)=>{
                        this.$router.push(`/manager/${response.user.uid}`)
                    })
                }
                catch (e) {
                    toastr.error('Email หรือ Password ไม่ถูกต้อง')
                }
            }
        }
    },
    watch: { //เซฟไลน์เข้า DB
        async profile() { //ต่อไฟเบสเข้า คอลเลคชัน freelance ถ้าเจอ lineId = profile.userId(?) เหมือนกัน get ข้อมูลออกมา
            const manager = await this.$fireStore.collection('Manager')
                .where('lineId', '==', this.profile.userId).get()
            if (!manager.empty) {
                this.$router.push(`/manager`)
            }
        }
    },
    async mounted () {
        // const data = {
        //     img: this.image,
        //     id: this.userId,
        //     name: this.name
        // }
        liff.init({ liffId: '1655688087-m6GLXp2q' })
            .then(() => {
                if (liff.isLoggedIn()) {
                    // const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
                    // const params = new URLSearchParams(queryString)
                    liff.getProfile().then(async (profile) => {
                        const userId = profile.userId /// เอาuser id line จากที่ได้ตรงนี้ไปเก็บใน firestore get เข้าไปพร้อมกับหน้าfreelance index
                        const image = profile.pictureUrl
                        const name = profile.displayName
                        this.userId = userId
                        this.name = name
                        this.image = image
                        this.saveProfile(profile)
                    })
                }
                else {
                    liff.login()
                }
            })
            .catch(() => {
                alert('Connect failed, please try again.')
                liff.closeWindow()
            })
    },
    validations: {
        email: { required, email },
        password: { required },
    },
}
</script>
<style scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
    color: #000000;
}
.login h1{
    font-size: 36px;
    font-weight: bold;
    color: #3ABCA7;
    margin: 30px 0 26px 0;
    text-align: center;
}
.input{
    margin: 0 0 16px 0;
}
.btn-green{
    margin: 0 0 16px 0;
}
</style>
