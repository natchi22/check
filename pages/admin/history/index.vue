<template>
  <div class="tabs">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="วันที่">
        <div class="picker">
          <a-date-picker
            :default-value="moment('01/01/2015', dateFormatList[0])"
            :format="dateFormatList"
          />
        </div>
        <CallCardDate    
			class="margin-card" 
			v-for="item in tasks"
			:key="item.taskId"
			:freelanceData="() => getFreelanceData(item)"
			:tasks="item"
		/>
      	</a-tab-pane>
      	<a-tab-pane key="2" tab="รายชื่อ">
			<nuxt-link to="/admin/history/name">
				<CallCardName 
					class="margin-card"
					v-for="free in freelanceData" 
					:key="free.freelanceId"
					:profile="free" 
					:freelanceData="free"
				/>
				<!-- เหลือ date detail ทำให้มันขึ้นมาก่อน ใส่รูปด้วย-->
			</nuxt-link>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// import { mapState,mapMutations } from 'vuex'
import moment from 'moment'
import CallCardDate from '@/components/Admin/Date/CallCardDate'
import CallCardName from '@/components/Admin/Name/CallCardName'
export default {
	// computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
    //     ...mapState({
    //         profile: state => state.profile.profileData
    //     })
    // },
	components: {
		CallCardDate,
		CallCardName
	},
	data () {
		return {
			dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
			freelanceData:[],
			freelanceProfile: null,
			tasks: [],
		}
	},
	methods: {
		async getFreelanceData(task) {
			const freelance = await this.$fireStore.collection("Freelance")
				.where('freelanceId', '==', task.freelanceId)
				.get()
			freelance.forEach((doc)=>{
				return doc.data()
			})
		},
		callback (key) {
			console.log(key)
		},
		moment
	},
	async mounted(){

		// .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
		const freelance = await this.$fireStore.collection("Freelance").get()
		freelance.forEach((doc)=>{
			// console.log(doc.data());
			this.freelanceData.push(doc.data())
			console.log(doc.data());
		})
		 //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
		
		const dateTime = await this.$fireStore.collection("Task")
		.get()
		// dateTime.orderByChild('dateIn').limitToFirst(30)
		dateTime.forEach((doc)=>{
			this.tasks.push(doc.data())
			console.log(doc.data());
		})
		
  	}
}
</script>
<style scoped>
.date{
margin: 5px 0 21px 0;
}
.picker{
	margin-bottom: 20px;
}
.margin-card{
margin-bottom: 26px;
}
</style>
<style>
/* tabs */
.ant-tabs-nav .ant-tabs-tab-active{
color: #3ABCA7;
}
.ant-tabs-ink-bar{
background-color: #3ABCA7;
}
.ant-tabs-nav .ant-tabs-tab:hover{
color: #3ABCA7;
}
/* tabs */
/* date */
.ant-calendar-today .ant-calendar-date{
color: #3ABCA7;
border-color: #3ABCA7;
}
.ant-calendar-selected-day .ant-calendar-date{
background: rgba(58, 188, 167,0.1);
}
/* date */
</style>
