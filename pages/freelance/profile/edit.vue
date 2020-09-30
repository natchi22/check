<template>
    <div class="regis">	
        <h1>แก้ไขข้อมูลส่วนตัว</h1>
        <h2>ชื่อ</h2>
        <input type="text" placeholder="ชื่อ*">
        <h2>นามสกุล</h2>
        <input type="text" placeholder="นามสกุล*">
        <h2>เบอร์โทรศัพท์</h2>
        <input type="text" placeholder="เบอร์โทรศัพท์*">
        <div class="div-btn">
            <nuxt-link to="/freelance/profile">
                <button class="btn btn-green">บันทึก</button>
            </nuxt-link>
        </div> 
	</div>
</template>
<style scoped>
.regis{
    width: 245px;
    margin: 0 auto;
}
.regis h1{
    font-size: 24px;
}
.size-pic{
    width: 60px;
    height: 60px;
}
h2{
    font-size: 14px;
}
.btn{
    margin-top: 28px;
}
.div-btn{
    text-align: center;
}
</style>