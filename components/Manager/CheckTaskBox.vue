<template>
    <div class="box-manager">
        <div
            class="box"
            v-for="item in tasks"
            :key="item.id"
        >
            <div
                class="box-top"
                v-if="item"
            >
                <h2>
                    {{ item.name }}
                </h2>
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
    }
}
</script>

<style scoped>
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
</style>
