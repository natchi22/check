<template>
    <div class="body">
        <img
            class="pic size-pic"
            :src="profile.pictureUrl"
            alt="รูปโปรไฟล์"
        >
        <a-form @submit.prevent="summit">
            <a-form-item
                v-if="!isAdmin"
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.fName.required ? 'error' : ''"
                :help="submitted && !$v.fName.required ? 'กรุณากรอกชื่อ' : ''"
            >
                <template slot="label">
                    ชื่อ
                </template>
                <a-input
                    class="input"
                    name="fName"
                    placeholder="ชื่อ"
                    v-model="fName"
                />
            </a-form-item>
            <a-form-item
                v-if="!isAdmin"
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.lName.required ? 'error' : ''"
                :help="submitted && !$v.lName.required ? 'กรุณากรอกนามสกุล' : ''"
            >
                <template slot="label">
                    นามสกุล
                </template>
                <a-input
                    class="input"
                    name="lName"
                    placeholder="นามสกุล"
                    v-model="lName"
                />
            </a-form-item>
            <a-form-item
                v-if="!isAdmin"
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.telNumber.required ? 'error' : '' ||
                    submitted && !$v.telNumber.numeric ? 'error' : ''"
                :help="submitted && !$v.telNumber.required ? 'กรุณากรอกอีเมล' : ''||
                    submitted && !$v.telNumber.numeric ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง' : ''"
            >
                <template slot="label">
                    เบอร์โทรศัพท์
                </template>
                <a-input
                    class="input"
                    name="telNumber"
                    placeholder="เบอร์โทรศัพท์"
                    v-model="telNumber"
                />
            </a-form-item>
            <a-form-item
                v-if="!isAdmin"
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.email.required ? 'error' : '' ||
                    submitted && !$v.email.email ? 'error' : ''"
                :help="submitted && !$v.email.required ? 'กรุณากรอกอีเมล' : ''||
                    submitted && !$v.email.email ? 'กรุณากรอกอีเมลให้ถูกต้อง' : ''"
            >
                <template slot="label">
                    Email
                </template>
                <a-input
                    class="input"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                />
            </a-form-item>
            <hr
                class="line"
            >
            <p style="font-size:12px">
                หากต้องการเปลี่ยนรหัสผ่าน กรุณากรอก password เดิมและ password ใหม่ข้างล่าง หากไม่ต้องการเปลี่ยนรหัสผ่านให้เว้นว่างไว้
            </p>
            <a-button
                style="margin-bottom: 14px"
                block
                size="large"
                html-type="submit"
                type="primary"
                :loading="loading"
            >
                บันทึก
            </a-button>
        </a-form>

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
                style="margin-top: 8px"
                :loading="loading"
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
                    this.loading = true
                    this.$fireAuth
                        .signInWithEmailAndPassword(this.email, this.oldPassword)
                        .then(() => {
                            this.$fireAuth.currentUser.updatePassword(this.newPassword).then(async () =>{
                                const user = await this.$fireStore.collection("Manager").doc(this.$fireAuth.currentUser.uid)
                                await user.update({
                                    fName: this.fName,
                                    lName: this.lName,
                                    telNumber: this.telNumber,
                                }).then(() => {
                                    this.loading = false
                                    toastr.success('แก้ไขข้อมูลสำเร็จ')
                                    this.$router.go(-1)
                                })
                            }).catch(() => {
                                this.loading = false
                                toastr.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                            })
                        }).catch(() => {
                            this.loading = false
                            toastr.error('รหัสผ่านเดิมไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
                        })
                }
                else {
                    toastr.error('กรุณากรอกรหัสผ่านใหม่')
                }
            }
            else {
                const user = await this.$fireStore.collection("Manager").doc(this.$fireAuth.currentUser.uid)
                await user.update({
                    fName: this.fName,
                    lName: this.lName,
                    telNumber: this.telNumber,
                }).then(() => {
                    toastr.success('แก้ไขข้อมูลสำเร็จ')
                    this.$router.go(-1)
                })
            }
        }
    },
    validations: {
        fName: { required },
        lName: { required },
        email: { required, email },
        telNumber: { required, numeric },
    },
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
