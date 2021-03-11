<template>
    <div class="body">
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{ inforManager.firstName }}  {{ inforManager.lastName }}</h2>
            <nuxt-link :to="`/manager/${profile.userId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        {{ $fireAuth }}
        <div
            class="tabs"
        >
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
                    <div class="box-manager">
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
                            <div>
                                <h3>
                                    {{ item.firstName }} {{ item.lastName }}
                                </h3>
                                <p>จำนวนงาน: {{ countTask(item.lineId) }}</p>
                            </div>
                        </div>
                    </div>
                </a-tab-pane>
                <a-tab-pane
                    key="2"
                    tab="รายชื่อ"
                >
                    <button
                        style="margin-top: 8px; margin-bottom: 8px"
                        class="btn btn-green"
                        @click="$router.push('/manager/login/register')"
                    >
                        เพิ่มหัวหน้างาน
                    </button>
                    <div class="box-manager">
                        <div
                            class="box"
                            v-for="item in inforManagers"
                            :key="item.managerId"
                        >
                            <h3 style="margin-bottom: 0px !important;">
                                {{ item.fName }} {{ item.lName }}
                            </h3>
                        </div>
                    </div>
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
            inforManagers: []
        }
    },
    methods: {
        async getUserData() {
            const infor = await this.$fireStore.collection("Manager")
                .where("lineId", '==', this.profile.userId).get()
            infor.forEach((doc)=>{
                this.inforManager = doc.data()
            })
        },
        async getTasksData() {
            const inforTask = await this.$fireStore.collection("Task").get()
            inforTask.forEach((doc)=>{
                console.log(doc.data())
                this.inforTask.push(doc.data())
            })
        },
        async getManagersData() {
            const inforManagers = await this.$fireStore.collection("Manager").get()
            inforManagers.forEach((doc)=>{
                this.inforManagers.push(doc.data())
            })
        },
        async getFreelanceData() {
            const inforFreelance = await this.$fireStore.collection("Freelance").get()
            inforFreelance.forEach((doc)=>{
                this.inforFreelance.push(doc.data())
            })
        },
        callback(key) {
            console.log(key)
        },
        onClose(e) {
            console.log(e, 'I was closed.')
        },
        countTask(id) {
            return this.inforTask.filter(item => item.freelanceId === id).length
        }
    },
    async mounted() {
        this.getUserData()
        this.getTasksData()
        this.getFreelanceData()
        this.getManagersData()
    }
}
</script>
<style scoped>
.body{
	padding: 16px;
}
.tabs{
	/* padding: 0 32px; */
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
    width: 60px;
	height: 60px;
	margin: 0 24px 0 0;
}
.box{
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 17px 30px;
    margin: 0 10px 20px 10px;
    display: flex;
}
.box-manager{
    max-height: 500px;
    overflow-y: scroll;
    padding: 7px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
/* .tabs{

} */
}
</style>
<style>

</style>
