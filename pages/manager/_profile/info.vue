<template>
    <div class="body">
        <div class="edit">
            <img
                v-if="!isAdmin && $fireAuth.currentUser.email === `superadmin@gmail.com`"
                class="pic size-pic"
                src="~/assets/images/avatardefault.png"
                alt="รูปโปรไฟล์"
            >
            <img
                v-else
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
            <nuxt-link
                :to="`/manager/${$fireAuth.currentUser.uid}/edit`"
            >
                <button
                    v-if="$fireAuth.currentUser.uid === managerId && $fireAuth.currentUser.email !== `superadmin@gmail.com`"
                    class="btn btn-green btn-size"
                >
                    แก้ไขข้อมูลส่วนตัว
                </button>
            </nuxt-link>
        </div>

        <div class="div-contact">
            <div
                class="form"
                v-if="!isAdmin"
            >
                <a-icon
                    type="user"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <p>{{ fName }}  {{ lName }}</p>
            </div>
            <div
                class="form"
                v-if="!isAdmin"
            >
                <a-icon
                    type="phone"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <p>{{ telNumber ? telNumber : '-' }}</p>
            </div>
            <div
                class="form"
                v-if="!isAdmin"
            >
                <a-icon
                    type="mail"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <p>{{ email }}</p>
            </div>
            <div
                class="form"
                v-if="isAdmin"
            >
                <a-icon
                    type="mail"
                    :style="{ fontSize: '16px', color: '#555555' , margin: '5px'}"
                />
                <p>superAdmin@gmail.com</p>
            </div>
            <div class="div-submit">
                <button
                    class="btn btn-wait"
                    @click="$router.go(-1)"
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
        }),
        isAdmin() {
            return this.managerId === `LkEgEE9HzgT06rcXANfOHyLtPoq2`
        }
    },
    data() {
        return {
            managerId: this.$route.params.profile,
            fName: '',
            lName: '',
            telNumber: '',
            email: ''
        }
    },
    methods: {
        async getManager() {
            const infor = await this.$fireStore.collection("Manager").where("managerId", '==', this.managerId).get()
            infor.forEach((doc)=>{
                this.fName = doc.data().fName
                this.lName = doc.data().lName
                this.telNumber = doc.data().telNumber
                this.email = doc.data().email
            })
        },
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
