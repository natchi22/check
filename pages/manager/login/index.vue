<template>
    <div class="login">
        <h1>เข้าสู่ระบบ</h1>
        <a-input
            class="input"
            placeholder="E-mail"
            v-model="email"
        />
        <a-input-password
            class="input"
            placeholder="รหัสผ่าน"
            v-model="password"
        />

        <button
            class="btn btn-green"
            @click="login"
        >
            เข้าสู่ระบบ
        </button>
        <nuxt-link to="/manager/login/register">
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
// import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    // computed: { // นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย
    //     ...mapState({
    //         profile: state => state.profile.profileData
    //     })
    // },
    methods: {
        // ...mapMutations({
        //     saveProfile: 'profile/saveProfile'
        // }),
        async login(e) {
            e.preventDefault()
            if (this.email && this.password) {
                try {
                    await this.$fireAuth.signInWithEmailAndPassword(this.user, this.password)
                    this.$router.push('/manager/info')
                }
                catch (e) {
                    this.$router.push('/manager')
                }
            }

        }
    },
    // watch: { //เซฟไลน์เข้า DB
    //     async profile() { //ต่อไฟเบสเข้า คอลเลคชัน freelance ถ้าเจอ lineId = profile.userId(?) เหมือนกัน get ข้อมูลออกมา
    //         const manager = await this.$fireStore.collection('Manager')
    //             .where('lineId', '==', this.profile.userId).get()
    //         if (!manager.empty) {
    //             this.$router.push(`/manager`)
    //         }

    //     }
    // },
    // async mounted () {
    //     // const data = {
    //     //     img: this.image,
    //     //     id: this.userId,
    //     //     name: this.name
    //     // }
    //     liff.init({ liffId: '1655688087-m6GLXp2q' })
    //         .then(() => {
    //             if (liff.isLoggedIn()) {
    //                 // const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
    //                 // const params = new URLSearchParams(queryString)
    //                 liff.getProfile().then(async (profile) => {
    //                     const userId = profile.userId /// เอาuser id line จากที่ได้ตรงนี้ไปเก็บใน firestore get เข้าไปพร้อมกับหน้าfreelance index
    //                     const image = profile.pictureUrl
    //                     const name = profile.displayName
    //                     this.userId = userId
    //                     this.name = name
    //                     this.image = image
    //                     this.saveProfile(profile)
    //                 })
    //             }
    //             else {
    //                 liff.login()
    //             }
    //         })
    //         .catch(() => {
    //             alert('Connect failed, please try again.')
    //             liff.closeWindow()
    //         })
    // },
}
</script>
<style scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 245px;
    margin: 0 auto;
    color: #000000;
}
.login h1{
    font-size: 36px;
    font-weight: bold;
    color: #3ABCA7;
    margin: 100px 0 26px 0;
    text-align: center;
}
.input{
    margin: 0 0 16px 0;
}
.btn-green{
    margin: 0 0 16px 0;
}
</style>
