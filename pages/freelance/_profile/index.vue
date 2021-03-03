<template>
    <div class="profile">
        <div class="cover">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
        </div>
        <!-- {{$route.params.profile}} -->
        <div class="head">
            <h3>{{ inforFrelance.firstName }} {{ inforFrelance.lastName }}</h3>
            <nuxt-link :to="`/freelance/${inforFrelance.lineId}/edit`">
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
            </nuxt-link>
        </div>
        <div class="task">
            <CellProjectEmploy
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
            <div class="div-submit">
                <nuxt-link :to="`/freelance/${inforFrelance.lineId}/add`">
                    <button
                        class="btn btn-green"
                    >
                        เพิ่มงาน
                    </button>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
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
            tasks: [ {
                id: 'xkkxj3',
                name: 'โปรเจกต์บ้านและสวน',
                dateStart: '02/02/2021',
                dateEnd: '10/02/2021',
                taskList: [ {
                    name: 'จัดสวน',
                    dateEnd: '05/02/2021'
                },
                {
                    name: 'ตัดหญ้า',
                    dateEnd: '10/02/2021'
                } ]
            } ]
        }
    },
    methods: {
    },
    async mounted() {
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const infor = await this.$fireStore.collection("Freelance").where("lineId", '==', this.profile.userId).get()
        // console.log(infor)
        infor.forEach((doc)=>{
            this.inforFrelance = doc.data()
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput

        // console.log(this.inforFrelance)
        // await location.reload()
    }

}
</script>
<style scoped>
.profile{
    padding: 0 30px;
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
.dateTask{
    display: flex;
    padding: 0 0 0 10px;
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
