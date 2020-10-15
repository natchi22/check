<template>
	<div class="login">
		<h1>เข้าสู่ระบบ</h1>
		<input type="email" placeholder="ชื่อผู้ใช้" v-model="email">
		<input type="password" placeholder="รหัสผ่าน" v-model="password">
		<button class="btn btn-green" @click="login" >
			เข้าสู่ระบบ
		</button>
	</div>
</template>
<script>
// import liff from '@line/liff'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        async login(e) {
            e.preventDefault();
            if (this.email && this.password) {
                try {
                    await this.$fireAuth.signInWithEmailAndPassword(this.email,  this.password);
                    this.$router.push('/admin/history');
                } catch (e) {
                    this.$router.push('/admin');
                }
            }

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
    margin-bottom: 26px;
}

</style>
