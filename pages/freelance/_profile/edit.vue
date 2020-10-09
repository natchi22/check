<template>
    <div class="regis">	
        <h1>แก้ไขข้อมูลส่วนตัว</h1>
        <h2>ชื่อ</h2>
        <input type="text" placeholder="ชื่อ*">
        <h2>นามสกุล</h2>
        <input type="text" placeholder="นามสกุล*">
        <h2>เบอร์โทรศัพท์</h2>
        <input type="text" placeholder="เบอร์โทรศัพท์*">
        <div class="div-btn">
            <nuxt-link to="/freelance/profile">
                <button class="btn btn-green" @click="summit">บันทึก</button>
            </nuxt-link>
        </div> 
	</div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return{
            fName: '',
            lName: '',
            telNumber: ''
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    async mounted(){ /// edit profile ไว้ทำวันศุกร์
        const editPro = await this.$fireStore.collection("Freelance").doc("IjlHx1m6jKAm8HvcJeri").update({
            firstName : this.fName,
            lastName : this.lName,
            phone : this.telNumber
        })
        console.log(editPro)
    },
    methods:{  ///แก้ตรงนี้ แก้โปรไฟล์
        async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ    /// กด submit แล้วเก็บข้อมูลที่ update
			const edit = this.$fireStore.collection("Freelance")
			.where('FreelanceId','==', this.profile.userId)
			.get().then((query) => {
				const profile = query.docs[0]
				profile.ref.update({
					firstName : this.fName,
                    lastName : this.lName,
                    phone : this.telNumber
			    })
			})
        console.log(edit)
        }
    }
}
</script>
<style scoped>
.regis{
    width: 245px;
    margin: 0 auto;
}
.regis h1{
    font-size: 24px;
}
.size-pic{
    width: 60px;
    height: 60px;
}
h2{
    font-size: 14px;
}
.btn{
    margin-top: 28px;
}
.div-btn{
    text-align: center;
}
</style>