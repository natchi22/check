<template>
  <div class="check-in">
    <img src="../../../assets/icon/out.png" alt="">
    <h1>บันทึกออกงาน</h1>
    <div class="box-time">
		<h4>{{ showDateOut }}</h4>
		<h4>เข้า: {{showDateTime.timeIn}}</h4> <!-- ดึงข้อมูลจากcheck in มาใส่ -->
		<h3>ออก: {{ showTimeOut }}</h3>
		<hr class="line line-grey">
		<h3 class="sum">
			รวม {{ diffTime }} <!-- ติดรวม -->
		</h3>
    </div>
    <nuxt-link to="/freelance/checkOut/listTask">
      <button class="btn btn-red">
        ถัดไป
      </button>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
  	computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
		...mapState({
			profile: state => state.profile.profileData 
		})
	},
  data () {
    return {
		// dateShow: '22/09/2020',
		// timeIn: 6,
		// timeOut: 10,
		sum: null,
		showTimeIn:'10',
		showTimeOut:'',
		showDateOut:'',
		freelanceData: '',
		showDateTime: '',
		diffTime: null,
    }
  },
  
	methods: {
		sumTime () {
		this.sum = this.showTimeOut - this.showTimeIn
		return this.sum
		},
		diff(start, end) {
			start = start.split(":")
			end = end.split(":")
			var startDate = new Date(0, 0, 0, start[0], start[1], 0)
			var endDate = new Date(0, 0, 0, end[0], end[1], 0)
			var diff = endDate.getTime() - startDate.getTime()
			var hours = Math.floor(diff / 1000 / 60 / 60)
			diff -= hours * 1000 * 60 * 60
			var minutes = Math.floor(diff / 1000 / 60)

			// If using time pickers with 24 hours format, add the below line get exact hours
			if (hours < 0)
			hours = hours + 24

			return (hours <= 9 ? "0" : "") + hours + " ชม. " + (minutes <= 9 ? "0" : "") + minutes +" น."
		},
		timeDifference(date1,date2) {
			var difference = Math.abs(date1 - date2)
			console.log(difference)

			var hoursDifference = Math.floor(difference/1000/60/60);
			difference -= hoursDifference*1000*60*60

			var minutesDifference = Math.floor(difference/1000/60);
			difference -= minutesDifference*1000*60

			return hoursDifference+ " ชม. : "+ minutesDifference+" น."
		}
	},
    
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
		
		const today = new Date();  //เวลา
		const dateOut = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		const timeOut = today.getHours() + ":" + String(today.getMinutes()).padStart(2,'0');
		// const dateTime = date+' '+time;
		this.showTimeOut = timeOut;
		this.showDateOut = dateOut;
		// this.showDateTime = dateTime
			console.log(dateOut,timeOut)
		// this.diffTime = this.diff(this.showDateTime.timeIn,this.showTimeOut)
		this.diffTime = this.timeDifference(this.showDateTime.timeStampIn,+ new Date)
      }
}
</script>
<style scoped>
.in img{
    width: 166px;
    height: 166px;
}
h1{
    font-size: 32px;
    margin: 24px 0;
}
.box-time{
    display: flex;
    flex-direction: column;
    background-color: rgba(76, 76, 76, 0.1);
    border-radius: 35px ;
    height: 179px;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    padding: 10px 15px;
}
.box-time h4{
    font-size: 18px;
    color:  rgba(0, 0, 0, 0.5);
    margin: 0;
}
.box-time h3{
    font-size: 18px;
    color:#000;
    margin: 0;
    margin-bottom: 10px;
}
.sum{
    margin: 20px 0 !important;
}
.btn{
    margin-bottom: 20px;
}
</style>
