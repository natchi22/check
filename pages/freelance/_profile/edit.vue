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
        <h2>ชื่อ*</h2>
        <input
            type="text"
            placeholder="ชื่อ*"
            v-model="fName"
        >
        <h2>นามสกุล*</h2>
        <input
            type="text"
            placeholder="นามสกุล*"
            v-model="lName"
        >
        <h2>เบอร์โทรศัพท์*</h2>
        <input
            type="text"
            placeholder="เบอร์โทรศัพท์*"
            v-model="telNumber"
        >
        <h2>Email*</h2>
        <input
            type="text"
            placeholder="Email*"
            v-model="email"
        >
        <div class="div-btn">
            <a-button
                class="btn btn-green"
                :loading="loading"
                @click="summit"
            >
                บันทึก
            </a-button>
        </div>
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
            loading: false,
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
