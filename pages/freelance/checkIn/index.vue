<template>
  <div class="check-in">
    <img src="../../../assets/icon/in.png" alt="">
    <h1>บันทึกเข้างาน</h1>
    <div class="box-time">
      <p>{{ dateShow }}, {{ timeIn }} น.</p>
    </div>
    <nuxt-link to="/freelance/checkIn/Succeed">
      <button class="btn btn-green">
        เข้างาน
      </button>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dateShow: '22/01/2020',
      timeIn: '10.00'
    }
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
    background-color: rgba(76, 76, 76, 0.1);
    border-radius: 35px ;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
}
.box-time p{
    font-size: 18px;
    color:  rgba(0, 0, 0, 0.5);
    margin: 0;
}
.btn{
    margin-bottom: 20px;
}
</style>
