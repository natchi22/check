<template>
    <div class="check-in">
        <a-icon  
            type="check-circle"
            :style="{ 
                fontSize: '100px', 
                color: '#3ABCA7' }"
            theme="filled" 
        />
        <h1>
            บันทึกเข้างาน <br>
            เรียบร้อยแล้ว
        </h1>
        <div class="box-time">
            <p>{{dateShow}}, {{timeShow}} น.</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dateShow: '22/10/2020',
            timeShow: '10.10'
        }
    }
}
</script>
<style scoped>
h1{
    font-size: 32px;
    margin: 24px 0 30px 0;
}
.box-time{
    display: flex;
    background-color: rgba(58, 188, 167, 0.1);
    border-radius: 35px ;
    height: 60px;
    justify-content: center;
    align-items: center;
}
.box-time p{
    font-size: 18px;
    font-weight: bold;
    color: #3ABCA7;
    margin: 0;
}
</style>