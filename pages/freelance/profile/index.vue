<template>
    <div class="profile">
        <div class="cover">
            <img class="pic size-pic" src="../../../assets/som.jpeg" alt="รูปโปรไฟล์">
        </div>
        
        <div class="data-profile">
            <div class="title">
                <h1>ชื่อ</h1>
                <h1>นามสกุล</h1>
                <h1>เบอร์โทรศัพท์</h1> 
            </div>
            <div class="main">
                <h1>{{fName}}</h1>
                <h1>{{lName}}</h1>
                <h1>{{telNumber}}</h1> 
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
export default {
    data(){
        return{
            fName: 'นางสาว',
            lName: 'สมศรี',
            telNumber: '0829077908'
        }
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