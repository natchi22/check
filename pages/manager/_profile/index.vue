<template>
    <div class="body">
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{inforManager.firstName}}  {{inforManager.lastName}}</h2>
            <nuxt-link :to="`/manager/${profile.userId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div class="tabs">
            <a-alert
                message="งานขึ้นบ้านใหม่"
                description="ช้ากว่ากำหนดแล้ว"
                type="warning"
                show-icon
                closable
                @close="onClose"
                class="alert"
            />
            <a-tabs
                type="card"
                @change="callback"
            >
                <a-tab-pane
                    key="1"
                    tab="ตรวจงาน"
                >
                    <nuxt-link to="/head/foremen/checkProject">
                        <div
                            class="box"
                            v-for="task in inforTask"
                            :key="task.id"

                        >
                            <h1>{{ task.name }}</h1>
                        </div>
                    </nuxt-link>
                </a-tab-pane>
                <a-tab-pane
                    key="2"
                    tab="รายชื่อ"
                >
                    <nuxt-link to="/head/foremen/checkEmploy">
                        <div
                            class="box"
                            v-for="item in inforFreelance"
                            :key="item.id"
                        >
                            <img
                                class="pic size-picfreelance"
                                :src="item.pictureUrl"
                                alt="รูปโปรไฟล์"
                            >
                            <h1>{{ item.firstName }} {{ item.lastName }}</h1>
                        </div>
                    </nuxt-link>
                </a-tab-pane>
            </a-tabs>
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
    data() {
        return {
            inforManager: {},
            inforTask: [],
            inforFreelance: [],
            // form: {
            //     taskName: 'งานขึ้นบ้านใหม่', //ชื่องานที่หัวหน้าคนนี้งานดูแลทั้งหมด
            //     date: null,
            //     manager: null,
            //     tasks: []
            // },
        }
    },
    methods: {
        async getUserData() {
            const infor = await this.$fireStore.collection("Manager")
            .where("lineId", '==', this.profile.userId).get()
            infor.forEach((doc)=>{
                this.inforManager = doc.data()
                
            })
            console.log(infor)
          
        },
        async getTasksData() {
            const inforTask = await this.$fireStore.collection("Task")
            .where("freelanceId", '==', this.profile.userId).get()
            inforTask.forEach((doc)=>{
                this.inforTask.push(doc.data())
                console.log(doc.data())
            })
        },
        async getFreelanceData() {
            const inforFreelance = await this.$fireStore.collection("Freelance")
            .get()
            inforFreelance.forEach((doc)=>{
                this.inforFreelance.push(doc.data())
                console.log(doc.data())
            })
        },
        callback(key) {
            console.log(key)
        },
        onClose(e) {
            console.log(e, 'I was closed.')
        },
    },
    async mounted() {
        this.getUserData()
        this.getTasksData()
        this.getFreelanceData()
    }
}
</script>
<style scoped>
.body{
	padding: 16px;
}
.tabs{
	padding: 0 32px;
}
.alert{
    margin: 0 0 20px 0;
}
.size-pic{
    width: 30px;
	height: 30px;
	margin: 0 0 0 15px;
}
.size-picfreelance{
    width: 40px;
	height: 40px;
	margin: 0 24px 0 0;
}
.box{
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 24px;
    margin: 0 10px 20px 10px;
    display: flex;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
/* .tabs{

} */
}
</style>
<style>

</style>
