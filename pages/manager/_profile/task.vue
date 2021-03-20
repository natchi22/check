<template>
    <div class="body">
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{ inforManager.firstName }}  {{ inforManager.lastName }}</h2>
            <nuxt-link :to="`/manager/${inforManager.managerId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div class="box">
            <div>
                <h1>
                    {{ name }}
                </h1>
            </div>
            <div class="div-freelance">
                <!-- รูปfreelance -->
                <img
                    class="pic size-picfreelance"
                    :src="inforFreelance.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
                <h3>{{ fName }} {{ lName }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            name: 'ชื่อโปรเจค',
            fName: 'ชื่อ',
            lName: 'สกุล freelance',
            inforManager: {},
            inforTask: [],
            inforFreelance: [],
            inforManagers: []
        }
    },
    methods: {
        async getUserData() {
            const infor = await this.$fireStore.collection("Manager")
                .where("lineId", '==', this.profile.userId).get()
            infor.forEach((doc)=>{
                this.inforManager = doc.data()
            })
        },
        async getTasksData() {
            const inforTask = await this.$fireStore.collection("Task").get()
            inforTask.forEach((doc)=>{
                this.inforTask.push(doc.data())
            })
        },
        async getManagersData() {
            const inforManagers = await this.$fireStore.collection("Manager").get()
            inforManagers.forEach((doc)=>{
                this.inforManagers.push(doc.data())
            })
        },
        async getFreelanceData() {
            const inforFreelance = await this.$fireStore.collection("Freelance").get()
            inforFreelance.forEach((doc)=>{
                this.inforFreelance.push(doc.data())
            })
        },
    },
    async mounted() {
        this.getUserData()
        this.getTasksData()
        this.getFreelanceData()
        this.getManagersData()
    }
}
</script>
<style scoped>
.body{
	padding: 16px;
}
.size-pic{
    width: 30px;
	height: 30px;
	margin: 0 0 0 15px;
}
.size-picfreelance{
    width: 60px;
	height: 60px;
	margin: 0 24px 0 0;
}
.box{
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 26px 30px;
    margin: 0 10px 20px 10px;
}
.div-freelance{
    display: flex;
}
.div-freelance h3{
    margin: 5px 0 0 7px;
    height: 20px;
}
</style>
