<template>
    <div class="body">
        <div class="edit">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
            <nuxt-link
                :to="`/manager/${$fireAuth.currentUser.uid}/edit`"
            >
                <button class="btn btn-green btn-size">
                    แก้ไขข้อมูลส่วนตัว
                </button>
            </nuxt-link>
        </div>

        <div class="div-contact">
            <div class="form">
                <a-icon
                    type="user"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <h2>{{ fName }}  {{ lName }}</h2>
            </div>
            <div class="form">
                <a-icon
                    type="phone"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <h2>{{ telNumber }}</h2>
            </div>
            <div class="form">
                <a-icon
                    type="mail"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <h2>{{ email }}</h2>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            fName: '',
            lName: '',
            telNumber: '',
            email: ''
        }
    },
    async mounted () {
        const infor = await this.$fireStore.collection("Manager").where("lineId", '==', this.profile.userId).get()
        infor.forEach((doc)=>{
            console.log(doc.data())
            this.fName = doc.data().firstName
            this.lName = doc.data().lastName
            this.telNumber = doc.data().phone
            this.email = doc.data().email
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    }
}
</script>
<style scoped>
.size-pic{
    width: 80px;
    height: 80px;
}
.body img, .body a{
    margin: 0 0 10px 0;
    margin: 10px auto;
}
.edit{
    display: flex;
    flex-direction: column;
    margin: 0 0 24px 0;
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
.btn-size{
    width: 124px;
    height: 24px;
}
.div-contact{
    width: 100%;
    margin: 0px 20px;
}
</style>
