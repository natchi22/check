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
export default { ///ดึง วัน เวลา ออก มาไว้หน้านี้แต่ไม่โชว์
	data () {
		return {
			showDateOut:'',
			showTimeOut:'',
			showDetail:''
		}
	},
  	methods:{
        async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ
			const timeOut = this.$fireStore.collection("Task").doc()
            await timeOut.set({ 
				dateOut : this.showDateOut,
				timeOut : this.showTimeOut,
				detail : this.showDetail
				
			})
			// await timeOut.update({
			// 	dateOut : this.showDateOut,
			// 	timeOut : this.showTimeOut,
			// 	detail : this.showDetail
			// })
            console.log(timeOut)
        },
        //เอาidมาเก็บหน้านี้ ละโยนเข้าfirestore
	},
	// mounted(){
	// 	const today = new Date();
	// 	const dateOut = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
	// 	const timeOut = today.getHours() + ":" + today.getMinutes();
	// 	// const dateTime = date+' '+time;
	// 	this.showTimeOut = timeOut;
	// 	this.showDateOut = dateOut;
	// 	// this.showDateTime = dateTime
	// 		console.log(dateOut,timeOut)
	// },
	
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
