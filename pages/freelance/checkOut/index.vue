<template>
  <div class="check-in">
    <img src="../../../assets/icon/out.png" alt="">
    <h1>บันทึกออกงาน</h1>
    <div class="box-time">
		<h4>{{ showDateOut }}</h4>
		<h4>เข้า: {{ showTimeIn }}</h4> <!-- ดึงข้อมูลจากcheck in มาใส่ -->
		<h3>ออก: {{ showTimeOut }}</h3>
		<hr class="line line-grey">
		<h3 class="sum">
			รวม {{ sum }}
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
export default {
  data () {
    return {
		// dateShow: '22/09/2020',
		// timeIn: 6,
		// timeOut: 10,
		sum: null,
		showTimeIn:'10',
		showTimeOut:'',
		showDateOut:'',
    }
  },
  
	methods: {
		sumTime () {
		this.sum = this.showTimeOut - this.showTimeIn
		return this.sum
		}
	},
    mounted(){
		const today = new Date();
		const dateOut = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		const timeOut = today.getHours() + ":" + today.getMinutes();
		// const dateTime = date+' '+time;
		this.showTimeOut = timeOut;
		this.showDateOut = dateOut;
		// this.showDateTime = dateTime
			console.log(dateOut,timeOut)
		this.sumTime()
    },
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
