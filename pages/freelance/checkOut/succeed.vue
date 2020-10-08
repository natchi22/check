<template>
    <div class="check-in">
        <a-icon  
            type="check-circle"
            :style="{ fontSize: '100px', color: '#3ABCA7' }"
            theme="filled" 
        />
        <h1>
            บันทึกออกงาน <br>
            เรียบร้อยแล้ว
        </h1>
        <div class="box-time">
            <p> {{showDateTime.dateIn}}<br>
                {{showDateTime.timeIn}} น. - {{showDateTime.timeOut}} น.
            </p>
        </div>
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
    data(){
        return{
            // dateShow: '22/10/2020',
            // timeIn: '10.00',
            // timeOut: '18.00',
            showDateTime: '',
            // showdate:'',
            // showTime:'',
            freelanceData: '',

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
      }
}
</script>
<style scoped>
h1{
    font-size: 32px;
    margin: 24px 0 30px 0;
}
.box-time{
    display: flex;
    background-color: rgba(231, 110, 84, 0.1);
    border-radius: 35px ;
    height: 92px;
    justify-content: center;
    align-items: center;
}
.box-time p{
    font-size: 18px;
    font-weight: bold;
    color: #E76E54;
    margin: 0;
}
</style>