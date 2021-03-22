<template>
    <div class="regis">
        <div class="cover">
            <img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
            <h1 style="margin-bottom: 5px;">
                แก้ไขข้อมูลส่วนตัว
            </h1>
        </div>
        <a-form @submit.prevent="summit">
            <a-form-item
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
    </div>
</template>
<script>
import toastr from 'toastr'
import { mapState } from 'vuex'
import { required, email, numeric } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            fName: '',
            lName: '',
            telNumber: '',
            email: '',
            loading: false,
            submitted: false
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    async mounted() {
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const infor = await this.$fireStore.collection("Freelance").where("lineId", '==', this.profile.userId).get()
        infor.forEach((doc)=>{
            this.fName = doc.data().firstName
            this.lName = doc.data().lastName
            this.telNumber = doc.data().phone
            this.email = doc.data().email
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
    },
    methods: { ///แก้ตรงนี้ แก้โปรไฟล์
        async summit() { ///input db ??? "'async' 'await'"ใส่ไว้รอ    /// กด submit แล้วเก็บข้อมูลที่ update
            this.submitted = true
            if (this.$v.fName.required && this.$v.lName.required &&
            this.$v.telNumber.required && this.$v.telNumber.numeric &&
            this.$v.email.email && this.$v.email.required) {
                this.loading = true
                await this.$fireStore.collection("Freelance")
                    .where('lineId', '==', this.profile.userId)
                    .get().then((query) => {
                        const profile = query.docs[0]
                        profile.ref.update({
                            firstName: this.fName,
                            lastName: this.lName,
                            phone: this.telNumber,
                            email: this.email
                        }).then(() => {
                            this.loading = false
                            toastr.success('แก้ไขข้อมูลสำเร็จ')
                            this.$router.go(-1)
                        }).catch(()=>{
                            toastr.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                        })
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
.regis{
    width: 245px;
    margin: 0 auto;
}
.regis h1{
    font-size: 24px;
}
.size-pic{
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-bottom: 10px;
}
h2{
    font-size: 14px;
}
.btn{
    margin-top: 28px;
}
.div-btn{
    text-align: center;
}
.cover{
    display: flex;
    justify-content: center;
    padding: 10px;
    flex-direction: column;
    text-align: center;
}
</style>
