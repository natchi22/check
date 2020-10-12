<template>
	<div>
		<h1>ประวัติการทำงานของคุณ</h1> 
		<CallHistory
			v-for="(item, index) in tasks"
			:key="index"
			:showDateTime="item"
			class="history"
		/> 
		<!-- ทำ v-for  ให้มันวนงานทุกอันที่มี-->
	</div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import CallHistory from '@/components/Freelance/CallHistory'
export default {
	computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
	components: {
		CallHistory
	},
	data() {
		return {
			freelanceData:'',
			tasks: []
		}
	},
	async mounted(){
		// .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
		const freelance = await this.$fireStore.collection("Freelance").where("lineId",'==', this.profile.userId ).get()
		freelance.forEach((doc)=>{
			this.freelanceData = doc.data()

		}) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		
		const dateTime = await this.$fireStore.collection("Task").where("freelanceId",'==',  this.freelanceData.freelanceId)
		.get()
		// dateTime.orderByChild('dateIn').limitToFirst(30)
		dateTime.forEach((doc)=>{
			this.tasks.push(doc.data())
		})
		console.log(this.showDateTime)
  	}
}
</script>
<style scoped>
.history{
    margin: 0 0 20px 0;
}
h1{
    font-size: 24px;
}
/* @media screen and (min-width: 768px ){
.history{
    margin: 0 0 200px 0;
}
} */
</style>
