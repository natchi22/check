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
                    type="mail"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <h2>{{ email }}</h2>
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
            fName: '',
            lName: '',
            email: ''
        }
    },
    methods: {
        async getManager() {
            const infor = await this.$fireStore.collection("Manager").where("managerId", '==', this.$fireAuth.currentUser.uid).get()
            infor.forEach((doc)=>{
                this.fName = doc.data().fName
                this.lName = doc.data().lName
                this.email = doc.data().email
            })
        }
    },
    async mounted () {
        await this.getManager()
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
    margin: 0px 30px;
}
.div-btn{
    text-align: center;
}
</style>
