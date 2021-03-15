<template>
    <div class="body">
        <!-- หน้าเลือกตรวจงาน -->
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{ inforManager.firstName }}  {{ inforManager.lastName }}</h2>
            <nuxt-link :to="`/manager/${profile.userId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div>
            <h1>
                {{project}}
            </h1>
        </div>
        <div class="box">
            <div class="div-name">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
                <h3>{{fName }} {{lName}}</h3>
            </div>
            
            <div class="div-task">
                ...
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
            manager:'ชื่อหัวหน้า',
            email:'email',
            project:'ชื่อโปรเจค',
            fName:'ชื่อ',
            lName:'สกุล ฟรีแลนซ์',
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
.box{
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 26px 30px;
    margin: 0 10px 20px 10px;
}
.div-name{
    display: flex;
}
</style>