<template>
    <div>
        <div class="regis">
            <h1>กรอกข้อมูลส่วนตัว</h1>
            <div class="cover">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
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
    </div>
</template>

<script>
// import liff from '@line/liff'
import { mapState } from 'vuex'
import { required, email, numeric } from 'vuelidate/lib/validators'
import toastr from 'toastr'

export default {
    data() {
        return {
            imgLine: '',
            inforFrelance: {},
            freelanceData: '',
            fName: '',
            lName: '',
            telNumber: '',
            email: '',
            lineId: '',
            task: null,
            loading: false,
            submitted: false
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    async mounted() {

    },
    methods: {
        async summit() { ///input db ??? "'async' 'await'"ใส่ไว้รอ
            this.submitted = true
            if (this.$v.fName.required && this.$v.lName.required &&
            this.$v.telNumber.required && this.$v.telNumber.numeric &&
            this.$v.email.email && this.$v.email.required) {
                this.loading = true
                const user = this.$fireStore.collection("Freelance").doc()
                await user.set({
                    freelanceId: user.id,
                    firstName: this.fName,
                    lastName: this.lName,
                    phone: this.telNumber,
                    email: this.email,
                    lineId: this.profile.userId,
                    pictureUrl: this.profile.pictureUrl
                }).then(()=>{
                    this.loading = false
                    this.$router.push(`/freelance/${this.profile.userId}`)
                }).catch(()=>{
                    this.loading = false
                    toastr.error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง')
                })
            }
        },
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
h1{
	font-size: 24px;
    margin-bottom: 20px;
}
.regis{
    width: 245px;
    margin: 0 auto;
}
.size-pic{
    width: 80px;
    height: 80px;
}
.cover{
    margin-bottom: 24px;
}
.regis h2{
    font-size: 14px;
}
.btn{
    margin-top: 10px;
}

</style>
