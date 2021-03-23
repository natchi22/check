<template>
    <div class="box-manager">
        <div
            class="box"
            v-for="item in tasks"
            :key="item.id"
        >
            <nuxt-link :to="`/manager/task/${item.taskId}`">
                <div
                    style="position: relative;"
                    class="box-top"
                    v-if="item"
                >
                    <h2 style="width: 71%; z-index: 1;">
                        {{ item.name }}
                    </h2>
                    <img
                        v-if="alertApprove(item.taskList) && $fireAuth.currentUser.email !== `superadmin@gmail.com`"
                        src="~/assets/images/stamp.png"
                        class="stamp"
                    >
                </div>
                <div
                    class="box-end"
                    v-if="item"
                >
                    <a-avatar :size="36">
                        {{ showManager(item.manager).charAt(0) }}
                    </a-avatar>
                    <h3 style="margin-bottom: 0px !important;">
                        ผู้ดูแล : {{ showManager(item.manager) }}
                    </h3>
                </div>
                <div class="div-progress">
                    <h4>ความคืบหน้างาน : {{ showProcess(item.taskList) }}</h4>
                </div>
            </nuxt-link>
        </div>
        <div
            v-if="tasks.length === 0"
            class="no-task"
        >
            <img
                class="icon-empty"
                style="opacity: 0.5"
                src="~/assets/images/empty-box.png"
            >
            <p style="margin-top: 5px">
                ไม่มีงานในสถานะนี้
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'tasks', 'inforManagers' ],
    methods: {
        showManager(managerId) {
            const manager = this.inforManagers.find(el => el.managerId == managerId)
            if (manager) {
                return `${manager.fName} ${manager.lName}`
            }
        },
        alertApprove(list) {
            return list.filter(e => e.status === 'PENDING').length > 0
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
    },
    data() {
        return {
            list: []
        }
    }
}
</script>

<style scoped>
.box{
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 14px;
    margin: 0 0px 20px 0px;
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
.no-task{
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.no-task img{
    margin: 0 auto;
}
.stamp{
    transform: rotateZ(7deg);
    width: 82px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 0;
}
.div-progress{
    display: flex;
    justify-content: flex-end;
    margin: 17px 0px 0px 0px;
}
</style>
