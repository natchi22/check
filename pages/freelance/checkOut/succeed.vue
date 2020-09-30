<template>
    <div class="check-in">
        <a-icon  
            type="check-circle"
            :style="{ fontSize: '100px', color: '#3ABCA7' }"
            theme="filled" 
        />
        <h1>
            บันทึกออกงาน <br>
            เรียบร้อยแล้ว
        </h1>
        <div class="box-time">
            <p> {{dateShow}}<br>
                {{timeIn}} น. - {{timeOut}} น.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dateShow: '22/10/2020',
            timeIn: '10.00',
            timeOut: '18.00'
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
    background-color: rgba(231, 110, 84, 0.1);
    border-radius: 35px ;
    height: 92px;
    justify-content: center;
    align-items: center;
}
.box-time p{
    font-size: 18px;
    font-weight: bold;
    color: #E76E54;
    margin: 0;
}
</style>