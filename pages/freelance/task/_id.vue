<template>
    <div class="body">
        <div class="top">
            <div>
                <h1>{{ task.name }}</h1>
                <div class="boxTime">
                    <a-icon
                        type="clock-circle"
                        :style="{ fontSize: '24px', color: '#ffffff', padding: '4px' }"
                    />
                    <h2>{{ task.endDate }}</h2>
                </div>
            </div>
            <div>
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </div>
        </div>
        <div class="div-contact-mn">
            <a-icon
                type="phone"
                :style="{ color: '#3ABCA7',fontSize: '20px' }"
            />
            <h3>ติดต่อหัวหน้า : {{ task.manager ? showManager(task.manager) : '' }}</h3>
        </div>
        <h2>ความสำเร็จตามแผน</h2>
        <a-progress
            :percent="task.startDate && task.endDate ? calPlan(task.startDate,task.endDate) : 0"
            class="progress"
        />
        <h2>ความสำเร็จปัจจุบัน</h2>
        <a-progress
            :percent="task.taskList ? calReal(task.taskList) : 0"
            class="progress"
        />
        <CellStepProject
            v-for="(ts,index) in task.taskList"
            :key="index"
            :task="{...ts,index}"
            :taskBefore="index == 0 ? {} : task.taskList[index-1]"
            :taskId="taskId"
            @reCall="getData"
        />
        <div class="div-submit">
            <button
                class="btn btn-wait"
                @click="$router.go(-1)"
            >
                ย้อนกลับ
            </button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import moment from 'moment'
import diff from 'moment'
import CellStepProject from '@/components/Freelance/CellStepProject'

export default {
    components: {
        CellStepProject
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            inforManagers: [],
            taskId: this.$route.params.id,
            task: {},
            form: {
                taskName: 'งานขึ้นบ้านใหม่',
                date: '01/01/2021',
                manager: null,
                tasks: []
            },
            taskList: {
                name: null,
                date: '16/01/2021'
            },
            urlTask: 'URLงานที่แนบมา',
            detailTask: 'รายละเอียดการทำงานชิ้นนี้รายละเอียดการทำงานชิ้นนี้รายละเอียดการทำงานชิ้นนี้',
            commentTask: 'คอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างาน',
        }
    },
    methods: {
        diff,
        showManager(managerId) {
            const manager = this.inforManagers.find(el => el.managerId == managerId)
            if (manager) {
                return `${manager.fName} ${manager.lName}`
            }
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
        getData() {
            var docRef = this.$fireStore.collection("Task").doc(this.taskId)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    this.task = doc.data()
                }
            })
        },
        async getManagersData() {
            const inforManagers = await this.$fireStore.collection("Manager").get()
            inforManagers.forEach((doc)=>{
                this.inforManagers.push(doc.data())
            })
        },
    },
    mounted() {
        this.getData()
        this.getManagersData()
    }
}
</script>

<style scoped>
.div-contact-mn{
    display: flex;
    margin: 16px 0 22px 0;
}
/* รูป */
.size-pic{
    width: 80px;
    height: 80px;
}
.div-contact-mn{
    display: flex;
    margin: 16px 0 22px 0;
}
.div-contact-mn h3{
    margin: 0 0 0 5px;
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0 24px 0;
}
/* กรอบวันที่ใหญ่ */
.progress{
    margin: 0 0 20px 0;
}
/* กรอบตรวจแล้ว อยู่style*/
.div-submit{
    display: flex;
    justify-content: center;
    margin-bottom: 26px;
}
</style>

