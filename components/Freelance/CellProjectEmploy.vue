<template>
    <div class="body">
        <nuxt-link :to="`/freelance/task/${task.id}`">
            <div class="box">
                <h2>{{ task.name }}</h2>
                <div class="dateTask">
                    <h3 class="topic">
                        เริ่ม :
                    </h3>
                    <h3>{{ task.dateStart }}</h3>
                </div>
                <div class="dateTask">
                    <h3 class="topic">
                        สิ้นสุด :
                    </h3>
                    <h3>{{ task.dateEnd }}</h3>
                </div>
                <div>
                    <h4>ความสำเร็จตามแผน</h4>
                    <a-progress
                        :percent="calPlan(task.dateStart,task.dateStart)"
                        status="active"
                    />
                </div>
                <div>
                    <h4>ความสำเร็จปัจจุบัน</h4>
                    <a-progress
                        :percent="calReal(task.taskList)"
                        status="active"
                    />
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import { moment, diff } from 'moment'
export default {
    props: [ 'task' ],
    data() {
        return {
        }
    },
    methods: {
        moment,
        diff,
        calPlan(startDate, endDate) {
            const today = moment()
            const start = moment(startDate, "MM-DD-YYYY")
            const end = moment(endDate, "MM-DD-YYYY")
            console.log('before diff')
            const count = today.diff(start, 'days')
            const length = end.diff(start, 'days')
            console.log(today, count, length)
            return parseInt((count/length)*100)
        },
        calReal(arr) {
            const lengthTasks = arr.length
            const count = arr.filter((item) => item.status === 'APPROVE').length
            return parseInt((count/lengthTasks)*100)
        }
    }
}
</script>

<style scoped>
.box{
    width: 100%;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 24px;
    margin: 0 auto 24px auto;
}
.dateTask{
    display: flex;
    padding: 0 0 0 10px;
}
.topic{
    width: 56px;
}
h1{
    text-align: center;
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
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.box{
    width: 700px;
}
}
</style>
