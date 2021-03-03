<template>
    <div class="body">
        <div class="top">
            <div>
                <h1>{{ form.taskName }}</h1>
                <div class="boxTime">
                    <a-icon
                        type="clock-circle"
                        :style="{ fontSize: '24px', color: '#ffffff', padding: '4px' }"
                    />
                    <h2>{{ form.date }}</h2>
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
            :percent="50"
            status="active"
            class="progress"
        />
        <h2>ความสำเร็จปัจจุบัน</h2>
        <a-progress
            :percent="60"
            status="active"
            class="progress"
        />
        <CellStepProject />
    </div>
</template>
<script>
import CellStepProject from '@/components/Freelance/CellStepProject'
export default {
    components: {
        CellStepProject
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
            commentTask: 'คอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างาน'
        }
    },
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

