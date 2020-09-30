<template>
  <div class="layout-margin">
    <Nuxt />
  </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
}
.layout-margin{
    margin: 60px 42px 0 42px;
}
@import url(../assets/font/Roboto-Regular.ttf);
html {
    font-family:'Roboto';
}
/* รูป */
.pic{
    border-radius: 100%;
}
img{
    width: 100%;
    object-fit: cover;
}
/* รูป */
/* เส้น */
.line{
    border-style: solid none none none;
    width: 100%;
}
.line-grey{
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
}
.line-green{
    background-color: rgba(58, 188, 167,0.1);
    color:  rgba(58, 188, 167,0.1);
}
/* เส้น */
/* เชคอิน */
.check-in{
    width: 245px;
    margin: 0 auto;
    text-align: center;
    padding-top: 30px;
}
/* เชคอิน */
input{
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    outline: none;
    margin-bottom: 16px;
    height: 32px;
    padding: 0 0 0 15px;
}
/* ปุ่ม */
.button{
    display: flex;
    flex-direction: column;
}
.btn{
    width: 100%;
    height: 44px;
    border-radius: 4px;
    border: none;
    box-shadow: 4px 4px 8px rgba(0,0,0,0.25);
    outline: none;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 18px;
}
.size{
    width: 180px;
    height: 32px;
    font-size: 14px;
}
.btn-green{
    background: #3ABCA7;
}
.btn-red{
    background: #E76E54;
}
.btn-green:active{
    background: #FFFFFF;
    color: #3ABCA7;
    border: 1px solid  #3ABCA7;
}
.btn-red:active{
    background: #FFFFFF;
    color: #E76E54;
    border: 1px solid  #E76E54;
}
/* ปุ่ม */
</style>
