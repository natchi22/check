<template>
  <div class="card">
    <!-- <img class="pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์"> -->
    <h1>{{ freelanceData.firstName }} {{ freelanceData.lastName }}</h1>
  </div>
</template>
<script>
export default {
	props: ['profile', 'freelanceData'],
}
</script>
<style scoped>
.card{
    display: flex;
    height: 80px;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    align-items: center;
}
.card h1{
    margin: 0;
    font-size: 18px;
}
.pic{
    width: 40px;
    height: 40px;
    margin: 0 20px;
}
</style>
