<template>
  <div class="list-task">
    <h1>รายละเอียดงานวันนี้</h1>
    <textarea id="" name="" cols="40" rows="10" placeholder="รายละเอียดงาน*" v-model="showDetail"/>
    <nuxt-link to="/freelance/checkout/succeed">
      <button class="btn btn-red" @click="summit">
        ออกงาน
      </button>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default { ///ดึง วัน เวลา ออก มาไว้หน้านี้แต่ไม่โชว์
	computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
		...mapState({
			profile: state => state.profile.profileData 
		})
	},
	data () {
		return {
			showDateOut:'',
			showTimeOut:'',
			showDetail:'',
			freelanceData:''
	}
	},
  	methods:{
        async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ
			const time = this.$fireStore.collection("Task")
			.where('freelanceId','==', this.freelanceData.freelanceId)
			.where('status','==',false)
			.get().then((query) => {
				const task = query.docs[0]
				task.ref.update({
					dateOut : this.showDateOut,
					timeOut : this.showTimeOut,
					detail : this.showDetail,
					status : true,
					timeStampOut : +new Date
				})
			})
			console.log(time)
            console.log(timeOut)
        },
	},
	async mounted(){
		const freelance = await this.$fireStore.collection("Freelance").where("lineId",'==', this.profile.userId ).get()
		freelance.forEach((doc)=>{
			this.freelanceData = doc.data()
		}) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		const today = new Date();
		const dateOut = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		const timeOut = today.getHours() + ":" + today.getMinutes();
		// const dateTime = date+' '+time;
		this.showTimeOut = timeOut;
		this.showDateOut = dateOut;
		// this.showDateTime = dateTime
			console.log(dateOut,timeOut)
	},
	
}
</script>
<style scoped>
.list-task{
    width: 290px;
    margin: 0 auto;
}
textarea{
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    outline: none;
    padding: 10px 0 0 16px;
    margin-bottom: 50px;
    resize: none;
    color: #000000;
}
</style>
