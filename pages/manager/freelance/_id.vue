<template>
    <div class="profile">
        <div class="cover">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
        </div>
        <div class="head">
            <h3>{{ inforFrelance.firstName }} {{ inforFrelance.lastName }}</h3>
            <!-- <nuxt-link :to="`/freelance/${inforFrelance.lineId}/edit`">
                <a-icon
                    type="edit"
                    :style="{ color: '#555555' }"
                />
            </nuxt-link>
            <nuxt-link :to="`/freelance/${inforFrelance.lineId}/info`">
                <a-icon
                    type="info-circle"
                    :style="{ color: '#555555' }"
                />
            </nuxt-link> -->
        </div>
        <div class="task">
            <CellProjectEmploy
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
            <!-- <div class="div-submit">
                <nuxt-link :to="`/freelance/${inforFrelance.lineId}/add`">
                    <button
                        class="btn btn-green"
                    >
                        เพิ่มงาน
                    </button>
                </nuxt-link>
            </div> -->
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CellProjectEmploy from '@/components/Freelance/CellProjectEmploy'

export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    components: {
        CellProjectEmploy
    },
    data() {
        return {
            // profileId: this.$route.params.profile,
            inforFrelance: {},
            tasks: []
        }
    },
    methods: {
        async getUserData() {
            const infor = await this.$fireStore.collection("Freelance")
                .where("lineId", '==', this.profile.userId)
                .get()
            infor.forEach((doc)=>{
                this.inforFrelance = doc.data()
            })
        },
        async getTasksData() {
            const tasks = await this.$fireStore.collection("Task")
                .where("freelanceId", '==', this.profile.userId)
                .get()
            tasks.forEach((doc)=>{
                this.tasks.push(doc.data())
            })
        }
    },
    async mounted() {
        this.getUserData()
        this.getTasksData()
    }

}
</script>
<style lang="css" scoped>
.profile{
    padding: 0 10px;
}
.size-pic{
    width: 140px;
    height: 140px;
}
.cover{
    text-align: center;
}
.data-profile{
    display: flex;
    margin: 47px 0 32px 0;
}
.data-profile h1{
    font-size: 14px;
}
.title{
    width: 50%;
}
.main{
    width: 50%;
}
.main h1{
    color: rgba(0,0,0,0.7);
}
</style>

<style scoped>
.box{
    width: 100%;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 24px;
    margin: 0 auto 24px auto;
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
