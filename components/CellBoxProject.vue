<template>
    <div
        class="box"
    >
        <div class="box-top">
            <h1>
                ชื่อโปรเจค
            </h1>
            <!-- สถานะงานใหญ่ -->
            <div
                v-if="task && checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `DONE`"
                class="btn-status btn-succeed"
            >
                <h3>
                    งานสำเร็จ
                </h3>
            </div>
            <div
                v-if="task && checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `ON_PLAN`"
                class="btn-status btn-wait"
            >
                <h3>
                    ตามแผนการ
                </h3>
            </div>
            <div
                v-if="task && checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `LATE`"
                class="btn-status btn-process"
            >
                <h3>
                    ช้ากว่ากำหนด
                </h3>
            </div>
        </div>
        <div class="box-end">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
            <h3 style="margin-bottom: 0px !important;">
                ชื่อ สกุล
            </h3>
        </div>
    </div>
</template>
<script>
//import CellBoxProject from '@/component/CellBoxProject'
import { mapState } from 'vuex'
export default {
    components: {
        //CellBoxProject,
    },
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
.box{
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 17px 30px;
    margin: 0 10px 20px 10px;
    display: flex;
}
.box-top{
    display: flex;
    justify-content: space-between;
}
.box-end{
    display: flex;
}
</style>
