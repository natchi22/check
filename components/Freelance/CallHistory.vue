<template>
  <div class="card-detail">
    <h2>{{showDateTime.dateIn}}</h2>
    <hr class="line line-green">
    <div class="data-profile">
      <div class="title">
        <h1>เวลาเข้า - ออก:</h1>
        <h1>รายละเอียด:</h1>
      </div>
      <div class="detail">
        <h1>{{showDateTime.timeIn}} น. - {{showDateTime.timeOut}} น.</h1>
        <h1>{{showDateTime.detail}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
	computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
			...mapState({
				profile: state => state.profile.profileData
			})
	},
	data () {
		return {
		freelanceData: '',
		showDateTime: '',
		}
	},
	// async mounted(){
    //     // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
    //     const infor = await this.$fireStore.collection("Freelance").where("lineId",'==',this.profile.userId ).get()
    //     infor.forEach((doc)=>{
    //         this.fName = doc.data().firstName
    //         this.lName = doc.data().lastName
    //         this.telNumber = doc.data().phone
    //     }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    //     console.log(this.inforFrelance)
    //     const task = await this.$fireStore.collection("Task").where("freelance",'==',this.freelanceData.freelanceId).get()
    //     task.forEach((doc)=>{
    //         this.fName = doc.data().firstName
    //         this.lName = doc.data().lastName
    //         this.telNumber = doc.data().phone
    //     })
	// },
	async mounted(){
		// .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
		const freelance = await this.$fireStore.collection("Freelance").where("lineId",'==', this.profile.userId ).get()
		freelance.forEach((doc)=>{
			this.freelanceData = doc.data()
		}) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		
		const dateTime = await this.$fireStore.collection("Task").where("freelanceId",'==',  this.freelanceData.freelanceId).get()
		dateTime.forEach((doc)=>{
			this.showDateTime = doc.data()
		}) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		console.log(this.showDateTime)
    }
}
</script>
<style scoped>
.card-detail{
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    padding: 24px 15px;
}
.card-detail h2{
    font-size: 18px;
    font-weight: bold;
    width: 100px;
    margin: 0 auto 20px auto;
}
.data-profile{
    display: flex;
    margin-top: 10px;
}
.data-profile h1{
    font-size: 14px;
}
.title{
    width: 40%;
}
.detail{
    width: 60%;
}
.detail h1{
  color: rgba(0, 0, 0, 0.6) ;
}
</style>
