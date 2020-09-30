<template>
    <div class="list-task">
        <h1>รายละเอียดงานวันนี้</h1>
        <textarea name="" id="" cols="30" rows="10" placeholder="รายละเอียดงาน*"></textarea>
        <nuxt-link to="/freelance/checkout/succeed">
            <button class="btn btn-red">ออกงาน</button>
        </nuxt-link>
    </div>
</template>
<style scoped>
.list-task{
    width: 245px;
    margin: 0 auto;
}
textarea{
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    outline: none;
    padding: 10px 0 0 16px;
    margin-bottom: 50px;
    resize: none;
    color: #000000;
}
</style>