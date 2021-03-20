<template>
    <div class="body">
        <img
            class="pic size-pic"
            :src="profile.pictureUrl"
            alt="รูปโปรไฟล์"
        >
        <h3 v-if="!isAdmin">
            ชื่อ
        </h3>
        <input
            v-if="!isAdmin"
            type="text"
            placeholder="ชื่อ*"
            v-model="fName"
        >
        <h3 v-if="!isAdmin">
            นามสกุล
        </h3>
        <input
            v-if="!isAdmin"
            type="text"
            placeholder="นามสกุล*"
            v-model="lName"
        >
        <h3 v-if="!isAdmin">
            เบอร์โทรศัพท์
        </h3>
        <input
            v-if="!isAdmin"
            type="text"
            placeholder="เบอร์โทรศัพท์*"
            v-model="telNumber"
        >
        <!-- <h3 v-if="!isAdmin">
            E-mail
        </h3>
        <input
            v-if="!isAdmin"
            type="text"
            placeholder="E-mail*"
            v-model="email"
        > -->
        <hr
            class="line"
        >
        <p style="font-size:12px">
            หากต้องการเปลี่ยนรหัสผ่าน กรุณากรอก password เดิมและ password ใหม่ข้างล่าง หากไม่ต้องการเปลี่ยนรหัสผ่านให้เว้นว่างไว้
        </p>
        <h3 v-if="!isAdmin">
            Password เดิม
        </h3>
        <a-input-password
            v-if="!isAdmin"
            type="text"
            placeholder="Old Password*"
            v-model="oldPassword"
        />
        <h3 v-if="!isAdmin">
            Password ใหม่
        </h3>
        <a-input-password
            v-if="!isAdmin"
            type="text"
            placeholder="New Password*"
            v-model="newPassword"
        />
        <!-- บันทึกข้้อมูลส่วนตัว ไปหน้าแรก ของตัวเอง -->
        <!-- <nuxt-link to="/head/profile/boss"> -->
        <div
            class="div-btn"
            v-if="!isAdmin"
        >
            <a-button
                :loading="loading"
                class="btn btn-green"
                @click="summit"
            >
                บันทึก
            </a-button>
        </div>
        <!-- </nuxt-link> -->
    </div>
</template>
<script>
import toastr from 'toastr'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            fName: '',
            lName: '',
            telNumber: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            loading: false,
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        }),
        isAdmin() {
            return this.$fireAuth.currentUser.email === `superadmin@gmail.com`
        }
    },
    async mounted() {
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const infor = await this.$fireStore.collection("Manager").where("managerId", '==', this.$fireAuth.currentUser.uid).get()
        infor.forEach((doc)=>{
            this.fName = doc.data().fName
            this.lName = doc.data().lName
            this.telNumber = doc.data().telNumber
            this.email = doc.data().email
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    },
    methods: { ///แก้ตรงนี้ แก้โปรไฟล์
        async summit() { ///input db ??? "'async' 'await'"ใส่ไว้รอ    /// กด submit แล้วเก็บข้อมูลที่ update
            if (this.oldPassword) {
                if (this.newPassword) {
                    this.$fireAuth
                        .signInWithEmailAndPassword(this.email, this.oldPassword)
                        .then(() => {
                            this.$fireAuth.currentUser.updatePassword(this.newPassword).then(async () =>{
                                const user = await this.$fireStore.collection("Manager").doc(this.$fireAuth.currentUser.uid)
                                await user.ref.update({
                                    firstName: this.fName,
                                    lastName: this.lName,
                                    telNumber: this.telNumber,
                                }).then(() => {
                                    toastr.success('แก้ไขข้อมูลสำเร็จ')
                                    this.$router.go(-1)
                                })
                            }).catch(() => {
                                toastr.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                            })
                        }).catch(() => {
                            toastr.error('รหัสผ่านเดิมไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
                        })
                }
                else {
                    toastr.error('กรุณากรอกรหัสผ่านใหม่')
                }
            }
            else {
                const user = await this.$fireStore.collection("Manager").doc(this.$fireAuth.currentUser.uid)
                await user.ref.update({
                    firstName: this.fName,
                    lastName: this.lName,
                    telNumber: this.telNumber,
                }).then(() => {
                    toastr.success('แก้ไขข้อมูลสำเร็จ')
                    this.$router.go(-1)
                })
            }
        }
    }
}
</script>
<style scoped>
.size-pic{
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 26px auto;
}
.div-btn{
    display: flex;
    justify-content: center;
}
.btn{
    width: 245px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.body{
    width: 400px;
    margin: 0 auto;
}
}
.line{
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2px 0px;
}
</style>
