<template>
    <div class="check-in">
        <img src="../../../assets/icon/out.png" alt="">
        <h1>บันทึกออกงาน</h1>
        <div class="box-time">
            <h4>{{dateShow}}</h4>
            <h4>เข้า: {{timeIn}}</h4>
            <h3>ออก: {{timeOut}}</h3>
            <hr class="line line-grey">
            <h3 class="sum">รวม {{sum}}</h3>
        </div>
        <nuxt-link to="/freelance/checkOut/listTask">
            <button class="btn btn-red">ถัดไป</button>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dateShow: '22/09/2020',
            timeIn: 6,
            timeOut: 10,
            sum: null,
        }
    },
    methods:{
        sumTime(){
            this.sum = this.timeOut - this.timeIn
            return this.sum
        }
    },
    mounted(){
        this.sumTime()
    }
}
</script>
<style scoped>
.in img{
    width: 166px;
    height: 166px;
}
h1{
    font-size: 32px;
    margin: 24px 0;
}
.box-time{
    display: flex;
    flex-direction: column;
    background-color: rgba(76, 76, 76, 0.1);
    border-radius: 35px ;
    height: 179px;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    padding: 10px 15px;
}
.box-time h4{
    font-size: 18px;
    color:  rgba(0, 0, 0, 0.5);
    margin: 0;
}
.box-time h3{
    font-size: 18px;
    color:#000;
    margin: 0;
    margin-bottom: 10px;
}
.sum{
    margin: 20px 0 !important;
}
</style>