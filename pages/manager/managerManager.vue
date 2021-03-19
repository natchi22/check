<template>
    <div class="body">
        <button
            style="margin-top: 8px; margin-bottom: 8px"
            class="btn btn-green"
            @click="$router.push('/manager/login/register')"
        >
            เพิ่มหัวหน้างาน
        </button>
        <div class="box-manager">
            <div
                class="box"
                v-for="item in inforManagers"
                :key="item.managerId"
            >
                <h3 style="margin-bottom: 0px !important;">
                    {{ item.fName }} {{ item.lName }}
                </h3>
                <h4>
                    Email : {{ item.email }}
                </h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inforManagers: [],
            freelance: {},
            taskId: this.$route.params.id,
            task: {},
        }
    },
    methods: {
        showManager(managerId) {
            const manager = this.inforManagers.find(el => el.managerId == managerId)
            if (manager) {
                return `${manager.fName} ${manager.lName}`
            }
        },
        async getManagersData() {
            const inforManagers = await this.$fireStore.collection("Manager").get()
            inforManagers.forEach((doc)=>{
                this.inforManagers.push(doc.data())
            })
        },
    },
    mounted() {
        this.getManagersData()
    }
}
</script>

<style scoped>
.body{
    width: 100%;
    padding: 15px;
}
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
</style>

