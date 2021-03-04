<template>
    <div class="login">
        <h1>เข้าสู่ระบบ</h1>
        <a-input
            class="input"
            placeholder="ชื่อผู้ใช้"
            v-model="user"
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
        <nuxt-link to="/manager/register">
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
// import { mapState,mapMutations } from 'vuex'
export default {
    data() {
        return {
            user: '',
            password: ''
        }
    },
    // methods:{
    //     async login(e) {
    //         e.preventDefault();
    //         if (this.user && this.password) {
    //             try {
    //                 await this.$fireAuth.signInWithEmailAndPassword(this.user,  this.password);
    //                 this.$router.push('/admin/history');
    //             } catch (e) {
    //                 this.$router.push('/admin');
    //             }
    //         }

    //     }

    // }
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
