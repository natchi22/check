<template>
    <div class="body">
        <nuxt-link :to="`/freelance/task/${task.taskId}`">
            <div class="box">
                <div class="div-nameproject">
                    <h2>{{ task.name }}</h2>
                    <!-- สถานะงานใหญ่ -->
                    <div
                        v-if="checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `DONE`"
                        class="btn-status btn-succeed"
                    >
                        <h3>
                            เสร็จสิ้น
                        </h3>
                    </div>
                    <div
                        v-if="checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `ON_PLAN`"
                        class="btn-status btn-wait"
                    >
                        <h3>
                            ตามแผน
                        </h3>
                    </div>
                    <div
                        v-if="checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) === `LATE`"
                        class="btn-status btn-process"
                    >
                        <h3>
                            ล่าช้า
                        </h3>
                    </div>
                </div>

                <div class="div-contact-mn">
                    <a-icon
                        type="phone"
                        :style="{ color: '#3ABCA7',fontSize: '20px', marginRight: '2px' }"
                    />
                    <h4>ติดต่อหัวหน้า : {{ task.manager ? showManager(task.manager) : '' }}</h4>
                </div>
                <div class="dateTask">
                    <h3 class="topic">
                        เริ่ม :
                    </h3>
                    <h3>{{ task.startDate }}</h3>
                </div>
                <div class="dateTask">
                    <h3 class="topic">
                        สิ้นสุด :
                    </h3>
                    <h3>{{ task.endDate }}</h3>
                </div>
                <div>
                    <h4>ความสำเร็จตามแผน</h4>
                    <a-progress
                        :percent="calPlan(task.startDate,task.endDate)"
                    />
                </div>
                <div>
                    <h4>ความสำเร็จปัจจุบัน</h4>
                    <a-progress
                        :percent="calReal(task.taskList)"
                    />
                </div>
                <div
                    class="div-progress"
                    v-if="checkStatus(calPlan(task.startDate,task.endDate),calReal(task.taskList)) !== `DONE`"
                >
                    <h3>ความคืบหน้างาน : {{ showProcess(task.taskList) }}</h3>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import moment from 'moment'
import diff from 'moment'

export default {
    props: [ 'task', 'inforManagers' ],
    data() {
        return {
        }
    },
    methods: {
        moment,
        diff,
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
        showManager(managerId) {
            const manager = this.inforManagers.find(el => el.managerId == managerId)
            if (manager) {
                return `${manager.fName} ${manager.lName}`
            }
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
        showProcess(taskList) {
            var task = taskList.find(el => el.status === `IN_PROCESS`)
            if (task) {
                return task.name
            }
            else {
                return 'รอตรวจงาน'
            }
        }
    }
}
</script>

<style scoped>
.body{
    padding: 0px 16px 16px 16px;
}
.box{
    width: 100%;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 14px;
}
.topic{
    width: 100%
}
h1{
    text-align: center;
}
.div-nameproject{
    display: flex;
    justify-content: space-between;
}
.div-contact-mn{
    display: flex;
    margin: 16px 0 22px 0;
}
.div-contact-mn h3{
    margin: 0 0 0 5px;
}
.div-progress{
    display: flex;
    justify-content: flex-end;
    margin: 17px 0px 0px 0px;
}
/* รูป */
.size-pic{
    width: 80px;
    height: 80px;
}
.cover{
    display: flex;
    justify-content: center;
    margin: 0 0 24px 0;
}
.head{
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
}
.head h2{
    margin: 0 8px 0 0;
}
.btn{
    width: 180px;
}
.div-submit{
    display: flex;
    justify-content: center;
}
.btn-status{
    width: 80px;
    height: 20px;
}
.btn-status h3{
    font-size: 11px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.box{
    width: 700px;
}
}
</style>
