<template>
    <div class="body">
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{ inforManager }}  {{ inforManager }}</h2>
            <nuxt-link :to="`/manager/${profile.userId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div
            v-if="$fireAuth.currentUser.email === `superadmin@gmail.com`"
            class="tabs"
        >
            <a-tabs
                type="card"
            >
                <a-tab-pane
                    key="1"
                    tab="ช้ากว่ากำหนด"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="lateTask"
                    />
                </a-tab-pane>

                <a-tab-pane
                    key="2"
                    tab="ตามแผนงาน"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="onPlanTask"
                    />
                </a-tab-pane>

                <a-tab-pane
                    key="3"
                    tab="งานสำเร็จ"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="successTask"
                    />
                </a-tab-pane>

                <a-tab-pane
                    key="4"
                    tab="หัวหน้างาน"
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
                            <h4>
                                Email : {{ item.email }}
                            </h4>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div v-else>
            <a-tabs
                type="card"
            >
                <a-tab-pane
                    key="1"
                    tab="ช้ากว่ากำหนด"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="lateTask"
                    />
                </a-tab-pane>

                <a-tab-pane
                    key="2"
                    tab="ตามแผนงาน"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="onPlanTask"
                    />
                </a-tab-pane>

                <a-tab-pane
                    key="3"
                    tab="งานสำเร็จ"
                >
                    <CheckTaskBox
                        :inforManagers="inforManagers"
                        :tasks="successTask"
                    />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
import CheckTaskBox from '~/components/Manager/CheckTaskBox'

export default {
    components: {
        CheckTaskBox
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        }),
        lateTask() {
            var res = []
            this.inforTask.forEach(element => {
                const calPlan = this.calPlan(element.startDate, element.endDate)
                const calReal = this.calReal(element.taskList)
                if (this.checkStatus(calPlan, calReal) === `LATE`) {
                    res.push(element)
                }
            })
            return res
        },
        onPlanTask() {
            var res = []
            this.inforTask.forEach(element => {
                const calPlan = this.calPlan(element.startDate, element.endDate)
                const calReal = this.calReal(element.taskList)
                if (this.checkStatus(calPlan, calReal) === `ON_PLAN`) {
                    res.push(element)
                }
            })
            return res
        },
        successTask() {
            var res = []
            this.inforTask.forEach(element => {
                const calPlan = this.calPlan(element.startDate, element.endDate)
                const calReal = this.calReal(element.taskList)
                if (this.checkStatus(calPlan, calReal) === `DONE`) {
                    res.push(element)
                }
            })
            return res
        }
    },
    data() {
        return {
            manager: 'ชื่อหัวหน้า',
            email: 'email',
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
            console.log(infor, this.profile.userId)
            infor.forEach((doc)=>{
                this.inforManager = doc.data()
            })
        },
        async getTasksData() {
            const inforTask = await this.$fireStore.collection("Task").get()
            inforTask.forEach((doc)=>{
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
        countTask(id) {
            return this.inforTask.filter(item => item.freelanceId === id).length
        },
        calPlan(startDate, endDate) {
            const today = moment()
            const start = moment(startDate, "DD/MM/YYYY")
            const end = moment(endDate, "DD/MM/YYYY")
            const count = today.diff(start, 'days')
            const length = end.diff(start, 'days')
            return parseInt((count/length)*100) < 100 ? parseInt((count/length)*100) : 100
        },
        calReal(arr) {
            const lengthTasks = arr.length
            const count = arr.filter((item) => item.status === 'APPROVE').length
            return parseInt((count/lengthTasks)*100)
        },
        checkStatus(calPlan, calReal) {
            if (calReal === 100) {
                return `DONE`
            }
            else if (calReal !== 100 && calReal >= calPlan) {
                return `ON_PLAN`
            }
            else {
                return `LATE`
            }
        },
        showManager(managerId) {
            const manager = this.inforManagers.find(el => el.managerId == managerId)
            if (manager) {
                return `${manager.fName} ${manager.lName}`
            }
        },
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
/* .tabs{
	padding: 0 32px;
} */
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
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 26px 30px;
    margin: 0 10px 20px 10px;
}
.box-manager{
    max-height: 550px;
    overflow-y: scroll;
    padding: 7px;
}
.box-top{
    display: flex;
    justify-content: space-between;
}
.box-end{
    display: flex;
}
.box-end h3{
    margin: 5px 0 0 7px;
    height: 20px;
}
.box-tab4 h3{
    margin: 5px 0 0 7px;
    height: 20px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
/* .tabs{

} */
}
</style>
