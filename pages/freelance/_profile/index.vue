<template>
    <div class="profile">
        <div class="cover">
            <img class="pic size-pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">
        </div>
        <!-- {{$route.params.profile}} -->
        <div class="data-profile">
            <div class="title">
                
                <h1>ชื่อ</h1>
                <h1>นามสกุล</h1>
                <h1>เบอร์โทรศัพท์</h1> 
            </div>
            <!-- เรียกข้อมูลมาโชว์ -->
            <div class="main"> 
                <h1>{{inforFrelance.firstName}}</h1>
                <h1>{{inforFrelance.lastName}}</h1>
                <h1>{{inforFrelance.phone}}</h1>
            </div>
        </div>
        <div class="cover">
            <nuxt-link to="/freelance/profile/edit">
                <button class="size btn btn-green">แก้ไขข้อมูลส่วนตัว</button> 
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
    ...mapState({
        profile: state => state.profile.profileData 
    })
},
    data(){
        return{
            inforFrelance:{},

        }
    },
    async mounted(){
        // .where freelanceId=ตัวที่อ่านค่า หัวข้อมูลกลุ่มนั้น อยู่หน้าที่inputมา,== ไอดีไหน,ไอดีที่จะเอามา อันนี้ระบุเป็นตัวแต่เดี๋ยวต้องระบุobject id
        const infor = await this.$fireStore.collection("Freelance").where("lineId",'==',this.profile.userId ).get()
        infor.forEach((doc)=>{
            this.inforFrelance = doc.data()
        }) //เรียกมาโชว์ doc=กลุ่มdataหน้าinput
        
        console.log(this.inforFrelance)
        location.reload()
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