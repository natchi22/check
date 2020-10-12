<template>
  <div class="card-detail">
    <h2>{{showDateTime.dateIn}}</h2>
    <hr class="line line-green">
    <div class="data-profile">
      <div class="title">
        <h1>เวลาเข้า - ออก:</h1>
        <h1>รายละเอียด:</h1>
      </div>
      <div class="detail">
        <h1>{{showDateTime.timeIn}} น. - {{showDateTime.timeOut}} น.</h1>
        <h1>{{showDateTime.detail}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	props: ['showDateTime'],	
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
.data-profile{
    display: flex;
    margin-top: 10px;
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
