<template>
  <div class="card">
    <div class="name">
		<div class="cover">
			<!-- <img class="pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์"> -->
		</div>
		<h1>{{freelanceData.firstName}} {{freelanceData.lastName}}</h1>
    </div>
    <div class="content">
		<div class="title">
			<h2>เวลาเข้า - ออก</h2>
			<h2>รายละเอียด</h2>
		</div>
		<div class="detail">
			<h3>{{tasks.timeIn}} น. - {{tasks.timeOut}} น.</h3>
			<h3>{{tasks.detail}}</h3>
		</div>
    </div>
  </div>
</template>
<script>
export default {
  	props: ['profile', 'tasks','freelanceData'],
	methods: {
		seemore () {
		this.open = !this.open
		}
	}
}
</script>
<style scoped>
/* รูป */
.pic{
    width: 40px;
    height: 40px;
}
.cover{
    margin: 0 24px 0 10px;
}
/* รูป */
.card{
    /* height: 160px; */
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    padding: 0 14px;
}
.name{
    display: flex;
    border-bottom: 1px solid rgba(58,188,167,0.2);
    height: 66px;
    align-items: center;
}
.name h1{
    height: 21px;
    font-size: 18px;
    margin: 0;
}
.content{
    display: flex;
    justify-content: space-around;
	font-size: 14px;
	margin-top: 14px;
}
.content h2{
    font-size: 14px;
}
.content h3{
    font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin-bottom: 14px;
}
.titil{
    width: 30%;
}
.titil p{
    font-size: 14px;
}
.detail{
    width: 50%;
}
.box-detail h3{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
}
.box-detail{
    height: 30px;
}
</style>
