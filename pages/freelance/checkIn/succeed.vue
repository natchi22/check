<template>
    <div class="check-in">
        <a-icon
            type="check-circle"
            :style="{
                fontSize: '100px',
                color: '#3ABCA7' }"
            theme="filled"
        />
        <h1>
            บันทึกเข้างาน <br>
            เรียบร้อยแล้ว
        </h1>
        <div class="box-time">
            <!-- <p>{{showDate}}, {{showTime}} น</p> -->
            <p>{{ showDateTime.dateIn }}, {{ showDateTime.timeIn }}น.</p>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data () {
        return {
            showDateTime: '',
            //   showdate:'',
            //   showTime:'',
            freelanceData: '',
        }
    },
    async mounted() {
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const freelance = await this.$fireStore.collection("Freelance").where("lineId", '==', this.profile.userId).get()
        freelance.forEach((doc)=>{
            this.freelanceData = doc.data()
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput

        const dateTime = await this.$fireStore.collection("Task")
            .where("freelanceId", '==', this.freelanceData.freelanceId)
            .where('status', '==', false).get()

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
    background-color: rgba(58, 188, 167, 0.1);
    border-radius: 35px ;
    height: 60px;
    justify-content: center;
    align-items: center;
}
.box-time p{
    font-size: 18px;
    font-weight: bold;
    color: #3ABCA7;
    margin: 0;
}
</style>
