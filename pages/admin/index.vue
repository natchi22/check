<template>
	<div class="login">
		<h1>เข้าสู่ระบบ</h1>
		<input type="text" placeholder="ชื่อผู้ใช้" v-model="userAdmin" >
		<input type="text" placeholder="รหัสผ่าน" v-model="passwordAdmin" >
		<nuxt-link to="/admin/history">
		<button class="btn btn-green" >
			เข้าสู่ระบบ
		</button>
		</nuxt-link>
	</div>
</template>
<script>
// import liff from '@line/liff'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            userAdmin: '',
            passAdmin: ''
        }
    },
	mounted(){ ///สั่งพิมยูสภุงให้เข้า ผิดมีเด้งผิด ?

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
