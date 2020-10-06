<template>
	<div class="check-in">
		<img src="../../../assets/icon/in.png" alt="">
		<h1>บันทึกเข้างาน</h1>
		<div class="box-time">
		<p>{{showDateTime}} น.</p>
		</div>
		<nuxt-link to="/freelance/checkIn/Succeed">
		<button class="btn btn-green" @click="summit">
			เข้างาน
		</button>
		</nuxt-link>
	</div>
</template>
<script>
export default {
	data () {
		return {
			showDateTime: '',
			showTime:'',
			showDate:'',
			timeIn:'',
			freelanceId:'',
			time:'',
			date:''
			
		}
	},
	mounted(){
		const today = new Date();
		const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+',';
		const time = today.getHours() + ":" + today.getMinutes();
		const dateTime = date+' '+time;
		this.showTime = time;
		this.showDate = date;
		this.showDateTime = dateTime
			console.log(dateTime)
	},
	methods:{
        async summit(){ ///input db ??? "'async' 'await'"ใส่ไว้รอ
            const time = this.$fireStore.collection("Task").doc()
            await time.set({
				freelanceId : time.id,
                timeIn : this.showTime,
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
