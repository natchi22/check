<template>
	<div class="regis">
        <div class="cover">
            <img class="pic size-pic" src="../../assets/som.jpeg" alt="รูปโปรไฟล์">
        </div>
		
        <h1>ชื่อ</h1>
        <input type="text" placeholder="ชื่อ*">
        <h1>นามสกุล</h1>
        <input type="text" placeholder="นามสกุล*">
        <h1>เบอร์โทรศัพท์</h1>
        <input type="text" placeholder="เบอร์โทรศัพท์*">
        <nuxt-link to="/user/checkin">
            <button class="btn btn-green">ถัดไป</button>
        </nuxt-link>
	</div>
</template>
<style>
.regis{
    width: 245px;
    margin: 0 auto;
}
.size-pic{
    width: 60px;
    height: 60px;
}
.cover{
    margin-bottom: 24px;
}
h1{
    font-size: 14px;
}

</style>