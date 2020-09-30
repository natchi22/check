<template>
    <div>
        <div>
            <nuxt-link to="/admin/history">
                <a-icon 
                    type="left" 
                    :style="{ 
                        fontSize: '20px'
                 }"
                />
            </nuxt-link>   
        </div>
        <div class="profile-img">
            <img class="pic size-pic" src="../../../../assets/som.jpeg" alt="รูปโปรไฟล์">
            <h2>{{fName}} {{lName}}</h2>
        </div>
        <CallCardDetail class="card"/>
        <CallCardDetail class="card"/>
    </div>
</template>
<script>
import CallCardDetail from '@/components/Admin/Name/CallCardDetail'
export default {
    data(){
        return{
            fName: 'นางสาว',
            lName: 'สมศรี'
        }
    },
    components:{
        CallCardDetail
    }
}
</script>
<style scoped>
.pic{
    width: 60px;
    height: 60px;
}
.card{
    margin-bottom: 26px;
}
.profile-img{
    margin: 30px 0;
}
.profile-img h2{
    font-size: 18px;
}
</style>
<style>
.anticon svg{
    color: #3ABCA7;
}
</style>
