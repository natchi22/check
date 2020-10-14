<template>
  <div class="card-detail">
    <div class="data-profile">
      <div class="title">
        <h1>วันที่ :</h1>
        <h1>เวลาเข้า - ออก :</h1>
        <h1>รายละเอียด : </h1>
      </div>
      <div class="detail">
        <h1>{{showDateTime.dateIn}}</h1>
        <h1>{{showDateTime.timeIn}} น. - {{showDateTime.timeOut}} น.</h1>
        <h1>{{showDateTime.detail}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	props: ['profile', 'showDateTime'],
}
</script>
<style scoped>
.card-detail{
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    padding: 20px 14px 14px 14px;
    /* height: 116px; */
}
.data-profile{
    display: flex;
}
.data-profile h1{
    font-size: 14px;
}
.title{
    width: 40%;
}
.detail{
    width: 60%;
}
.detail h1{
  color: rgba(0, 0, 0, 0.6) ;
}
</style>
