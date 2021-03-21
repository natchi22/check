<template>
    <!-- <div class="body"> -->
    <div class="status">
        <div class="top-succeed">
            <h1>{{ task.index }}. {{ task.name }}</h1>
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
            v-if="!taskBefore || taskBefore.status !== `IN_PROCESS`"
        >
            <h2 class="topic">
                แนบ link งาน
            </h2>
            <a-input
                v-model="linkUrl"
                v-if="!task.linkUrl"
                placeholder="link งาน หรือ url รูปภาพ"
            />
            <a
                v-if="task.linkUrl"
                :href="task.linkUrl"
                target="_blank"
            >
                <h3
                    class="detail linkUrl"
                >
                    {{ task.linkUrl }}
                </h3>
            </a>
        </div>
        <div
            class="main"
            v-if="!taskBefore || taskBefore.status !== `IN_PROCESS`"
        >
            <h2 class="topic">
                รายละเอียด
            </h2>
            <a-textarea
                v-if="!task.desc"
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
            v-if="task.comment && (!taskBefore || taskBefore.status !== `IN_PROCESS`)"
        >
        <div
            class="main"
            v-if="task.comment && (!taskBefore || taskBefore.status !== `IN_PROCESS`)"
        >
            <h2 class="topic">
                ความคิดเห็น
            </h2>
            <h3 class="detail">
                {{ task.comment }}
            </h3>
        </div>
        <div class="submit-task">
            <a-button
                class="btn btn-green btn-send"
                type="primary"
                v-if="task.status === `IN_PROCESS` && (!taskBefore || taskBefore.status !== `IN_PROCESS`)"
                @click="submit(task)"
            >
                ส่งงาน
            </a-button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import toastr from 'toastr'

export default {
    props: [ 'task', 'taskId', 'taskBefore' ],
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            linkUrl: '',
            desc: ''
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
