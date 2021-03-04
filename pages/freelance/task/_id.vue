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
                    <h2>{{ task.dateEnd }}</h2>
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
        <h2>ความสำเร็จตามแผน</h2>
        <a-progress
            :percent="calPlan(task.taskList)"
            status="active"
            class="progress"
        />
        <h2>ความสำเร็จปัจจุบัน</h2>
        <a-progress
            :percent="calReal(task.taskList)"
            status="active"
            class="progress"
        />
        <CellStepProject />
    </div>
</template>
<script>
import { mapState } from 'vuex'
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
            dateFormatList: [ 'DD/MM/YYYY', 'DD/MM/YY' ],
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
            task: {
                id: 'xkkxj3',
                name: 'จัดบ้านและสวน',
                dateStart: '01/03/2021',
                dateEnd: '15/03/2021',
                taskList: [ {
                    name: 'จัดสวน',
                    dateEnd: '03/03/2021',
                    status: 'APPROVE'
                },
                {
                    name: 'วางหิน',
                    dateEnd: '10/03/2021',
                    status: 'PENDING'
                },
                {
                    name: 'ตัดหญ้า',
                    dateEnd: '15/03/2021',
                    status: 'IN_PROCESS'
                } ]
            }
        }
    },
    methods: {
        calPlan(arr) {
            return 50
        },
        calReal(arr) {
            const lengthTasks = arr.length
            const count = arr.filter((item) => item.status === 'APPROVE').length
            console.log(count, lengthTasks)
            return parseInt((count/lengthTasks)*100)
        }
    }
}
</script>

<style scoped>
/* รูป */
.size-pic{
    width: 80px;
    height: 80px;
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0 24px 0;
}
/* กรอบวันที่ใหญ่ */
.boxTime{
    display: flex;
    flex-direction: row;
    background: #FF0000;
    border-radius: 4px;
    padding: 3px 9px;
}
.boxTime h2{
    color: #ffffff;
    padding: 4px 0 0 4px;
    margin-bottom: 0px;
}
.progress{
    margin: 0 0 20px 0;
}
/* กรอบตรวจแล้ว อยู่style*/

</style>

