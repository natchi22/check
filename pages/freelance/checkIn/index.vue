<template>
	<div class="check-in">
		<img src="../../../assets/icon/in.png" alt="">
		<h1>บันทึกเข้างาน</h1>
		<div class="box-time">
		<p>{{showDateIn}}, {{showTimeIn}} น.</p>
		</div>
		<nuxt-link to="/freelance/checkIn/Succeed">
		<button class="btn btn-green" @click="summit">
			เข้างาน
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
			showDateTime: '',
			showTimeIn:'',
			showDateIn:'',
			timeIn:'',
			freelanceId:'',
			freelanceData:'',
			// taskId:'',
			// time:'',
			// date:'',
			dateIn:'',
			
		}
	},
	async mounted(){
		
		const today = new Date();
		const dateIn = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		const timeIn = today.getHours() + ":" + today.getMinutes();
		// const dateTime = date+' '+timeIn;
		this.showTimeIn = timeIn;
		this.showDateIn = dateIn;
		// this.showDateTime = dateTime
			console.log(dateIn,timeIn)
		
	},
	methods:{
		async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ
			const time = await this.$fireStore.collection("Task").doc()
			console.log(time)
            await time.set({
				taskId : time.id,
				freelanceId : this.freelanceData.freelanceId,
				timeIn : this.showTimeIn,
				dateIn : this.showDateIn,
				status: false,
				// taskId : 
            })
            console.log(time)
        },
        //เอาidมาเก็บหน้านี้ ละโยนเข้าfirestore
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
    background-color: rgba(76, 76, 76, 0.1);
    border-radius: 35px ;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
}
.box-time p{
    font-size: 18px;
    color:  rgba(0, 0, 0, 0.5);
    margin: 0;
}
.btn{
    margin-bottom: 20px;
}
</style>
