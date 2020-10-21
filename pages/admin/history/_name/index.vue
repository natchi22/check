<template>
  <div>
    <div>
		</div>
		<div class="profile-img">
		<img class="pic size-pic" :src="freelanceData.pictureUrl" alt="รูปโปรไฟล์">
		<h2>{{freelanceData.firstName}} {{ freelanceData.lastName }}</h2>
		</div>
    <CallCardDetail 
		class="card" 
		v-for="item in tasks"
		:key="item.taskId"
		:showDateTime="item"
		:profile="item" 
	/>
  </div>
</template>
<script>
// import { mapState,mapMutations } from 'vuex'
import CallCardDetail from '@/components/Admin/Name/CallCardDetail'
export default {
//   computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
//     ...mapState({
//     profile: state => state.profile.profileData // มาทำอันนี้พรุ่งนี้
//   })
// },
	components: {
		CallCardDetail
	},
	data () {
		return {
			freelanceData: {},
			tasks: [],
		}
	},
	methods:{

	},
	async mounted(){
		console.log(this.$route.params.name)
		// .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
		const freelance = await this.$fireStore.collection("Freelance")
		.where("freelanceId",'==', this.$route.params.name)
		.get()
		freelance.forEach((doc)=>{
			// console.log(doc.data());
			this.freelanceData = doc.data()
		})
		 //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		const dateTime = await this.$fireStore.collection("Task")   ////จะเอาแค่task คนเดียว แต่มาหมดเลย
		
		.where("freelanceId",'==', this.$route.params.name)
		.where("status",'==', true)
		.orderBy( "dateIn" , "desc").orderBy( "timeIn" , "desc")
		.get()
		dateTime.forEach((doc)=>{
			this.tasks.push(doc.data())
			console.log(doc.data());
		})

		
  	}
}
</script>
<style scoped>
.pic{
    width: 60px;
    height: 60px;
}
.card{
    margin-bottom: 26px;
}
.profile-img{
    margin: 14px 0;
}
.profile-img h2{
    font-size: 18px;
    margin: 10px 0;
}
</style>
<style>
.anticon svg{
    color: #3ABCA7;
}
</style>
