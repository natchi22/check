<template>
    <div class="card-detail">
        <h2>{{dateShow}}</h2>
        <hr class="line line-green">
        <h3>เวลาเข้า - ออก: <font>{{timeIn}} น. - {{timeOut}} น.</font></h3>
        <h3>รายละเอียด: <font>{{detail}}</font></h3>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dateShow: '22/10/2020',
            timeIn:'10.00',
            timeOut:'18.00',
            detail:'ลิสงาน'
        }
    }
}
</script>
<style scoped>
.card-detail{
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    padding: 24px 15px;
}
.card-detail h2{
    font-size: 18px;
    font-weight: bold;
    width: 100px;
    margin: 0 auto 20px auto;
}
.card-detail h3{
    font-size: 14px;
    margin: 10px 0 0 0;
}
font{
    color: rgba(0,0,0,0.6);
}
</style>