<template>
  <div class="card">
    <img class="pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">
    <h1>{{ freelanceData.firstName }} {{ freelanceData.lastName }}</h1>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
	computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
		...mapState({
		profile: state => state.profile.profileData // มาทำอันนี้พรุ่งนี้
		})
	},
	data () {
		return {
		fName: '',
		lName: '',
		freelanceData: '',
		}
	},
	async mounted(){
		// .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
		const freelance = await this.$fireStore.collection("Freelance").where("lineId",'==', this.profile.userId ).get()
		freelance.forEach((doc)=>{
			this.freelanceData = doc.data()
		}) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		
  	}
}
</script>
<style scoped>
.card{
    display: flex;
    height: 80px;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    align-items: center;
}
.card h1{
    margin: 0;
    font-size: 18px;
}
.pic{
    width: 40px;
    height: 40px;
    margin: 0 20px;
}
</style>
