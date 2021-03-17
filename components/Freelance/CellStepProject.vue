<template>
    <!-- <div class="body"> -->
    <!-- ถ้างานที่ส่งตรวจผ่านแล้ว แสดงช่องนี้ -->
    <div class="status">
        <div class="top-succeed">
            <h1>{{ task.name }}</h1>
        </div>
        <div class="box-status">
            <div class="box-date">
                <a-icon
                    type="clock-circle"
                    :style="{ fontSize: '14px', color: '#ffffff', padding: '4px 0px' }"
                />
                <h3>{{ task.endDate }}</h3>
            </div>
            <div
                v-if="task.status === `APPROVE`"
                class="btn-status btn-succeed"
            >
                <h3>ตรวจแล้ว</h3>
            </div>
            <div
                v-if="task.status === `PENDING`"
                class="btn-status btn-wait"
            >
                <h3>
                    รอตรวจ
                </h3>
            </div>
            <div
                v-if="task.status === `IN_PROCESS`"
                class="btn-status btn-process"
            >
                <h3>
                    รอส่ง
                </h3>
            </div>
        </div>
        <div
            class="main"
        >
            <h2 class="topic">
                แนบ link งาน
            </h2>
            <a-input
                v-model="linkUrl"
                v-if="!task.linkUrl && !forManager"
                placeholder="link งาน หรือ url รูปภาพ"
            />
            <a
                v-if="task.linkUrl"
                :href="task.linkUrl"
                target="_blank"
            >
                <h3 class="detail linkUrl">
                    {{ task.linkUrl }}
                </h3>
            </a>
        </div>
        <div class="main">
            <h2 class="topic">
                รายละเอียด
            </h2>
            <a-textarea
                v-if="!task.desc && !forManager"
                class="boxInput"
                placeholder="รายละเอียดงาน*"
                :rows="4"
                v-model="desc"
            />
            <h3
                class="detail"
                v-if="task.desc"
            >
                {{ task.desc }}
            </h3>
        </div>
        <hr
            class="line"
            v-if="task.comment || forManager"
        >
        <div
            class="main"
        >
            <h2
                class="topic"
                v-if="task.comment || forManager"
            >
                ความคิดเห็น
            </h2>
            <a-textarea
                v-if="!task.comment && forManager"
                class="boxInput"
                placeholder="ความคิดเห็นจากผู้ตรวจ*"
                :rows="4"
                v-model="comment"
            />
            <h3
                class="detail"
                v-if="task.comment && task.status !== `APPROVE`"
            >
                {{ task.comment }}
            </h3>
        </div>
        <div class="submit-task">
            <a-button
                type="primary"
                v-if="task.status === `IN_PROCESS` && !forManager"
                @click="submit()"
            >
                ส่งงาน
            </a-button>
            <a-button
                type="primary"
                v-if="task.status === `PENDING` && forManager"
                @click="approve()"
            >
                ตรวจงาน
            </a-button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import toastr from 'toastr'

export default {
    props: [ 'task', 'taskId', 'forManager' ],
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            dateFormatList: [ 'DD/MM/YYYY', 'DD/MM/YY' ],
            linkUrl: '',
            desc: '',
            comment: ''
        }
    },
    methods: {
        async submit() {
            await this.$fireStore.collection("Task")
                .where('taskId', '==', this.taskId)
                .get().then((query) => {
                    const task = query.docs[0]
                    var taskList = task.data().taskList
                    taskList[this.task.index].linkUrl = this.linkUrl
                    taskList[this.task.index].desc = this.desc
                    taskList[this.task.index].status = 'PENDING'
                    task.ref.update({
                        taskList: taskList
                    }).then(() => {
                        toastr.success('ส่งงานสำเร็จ')
                        this.$emit('reCall')
                    })
                })
        },
        async approve() {
            await this.$fireStore.collection("Task")
                .where('taskId', '==', this.taskId)
                .get().then((query) => {
                    const task = query.docs[0]
                    var taskList = task.data().taskList
                    taskList[this.task.index].comment = this.comment
                    taskList[this.task.index].status = 'APPROVE'
                    task.ref.update({
                        taskList: taskList
                    }).then(() => {
                        toastr.success('ตรวจงานสำเร็จ')
                        this.$emit('reCall')
                    })
                })
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
.line{
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2px 0px;
}
.linkUrl {
    color: blue;
    text-decoration: underline;
}
.submit-task{
    display: flex;
    justify-content: flex-end;
}
</style>
