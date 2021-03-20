<template>
    <div class="body">
        <div class="profile-img">
            <img
                class="pic size-pic"
                :src="pictureUrl"
                alt="รูปโปรไฟล์"
            >
        </div>
        <div class="form">
            <a-icon
                type="user"
                :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
            />
            <p>{{ fName }}   {{ lName }}</p>
        </div>
        <div class="form">
            <a-icon
                type="phone"
                :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
            />
            <p>{{ telNumber }}</p>
        </div>
        <div class="form">
            <a-icon
                type="mail"
                :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
            />
            <p>{{ email }}</p>
        </div>
        <div class="div-btn">
            <button
                class="btn btn-green"
                @click="back"
            >
                ย้อนกลับ
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            freelanceId: this.$route.params.profile,
            fName: '',
            lName: '',
            telNumber: '',
            email: '',
            pictureUrl: ''
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },
    async mounted () {
        const infor = await this.$fireStore.collection("Freelance").where("lineId", '==', this.freelanceId).get()
        infor.forEach((doc)=>{
            this.fName = doc.data().firstName
            this.lName = doc.data().lastName
            this.telNumber = doc.data().phone
            this.email = doc.data().email
            this.pictureUrl = doc.data().pictureUrl
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    }
}
</script>
<style scoped>
.profile-img{
    display: flex;
    justify-content: center;
}
.size-pic{
    width: 90px;
    height: 90px;
}
.body img{
    margin: 20px 0px;
}
.form{
    display: flex;
    margin: 0 0  18px 0;
}
.form img{
    width: 16px;
    height: 16px;
    margin: 5px;
}
.form h2{
    margin: 0 0 0 16px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
    .body{
        width: 800px;
        margin: 0 auto;
    }
}
.div-btn{
    text-align: center;
}
</style>
