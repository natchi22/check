<template>
  <div class="card-detail">
    <div class="data-profile">
      <div class="title">
        <h1>วันที่ :</h1>
        <h1>เวลาเข้า - ออก :</h1>
        <h1>รายละเอียด : </h1>
      </div>
      <div class="detail">
        <h1>{{ dateShow }}</h1>
        <h1>{{ timeIn }} น. - {{ timeOut }} น.</h1>
        <h1>{{ detail }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dateShow: '22/01/2020',
      timeIn: '10.00',
      timeOut: '18.00',
      detail: 'รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอีย'
    }
  }
}
</script>
<style scoped>
.card-detail{
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    padding: 24px 15px;
    /* height: 116px; */
}
.data-profile{
    display: flex;
}
.data-profile h1{
    font-size: 14px;
}
.title{
    width: 50%;
}
.detail{
    width: 50%;
}
</style>
