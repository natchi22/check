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
<script>
export default {
    data(){
        return{
            fName: '',
            lName: '',
            telNumber: ''
        }
    },
    async mounted(){
        const editPro = await this.$fireStore.collection("Freelance").doc("IjlHx1m6jKAm8HvcJeri").update({
            firstName : this.fName,
            lastName : this.lName,
            phone : this.telNumber
        })
        // .where("freelanceId",'==','IjlHx1m6jKAm8HvcJeri').get()
        // editPro.update({
        //     firstName : this.fName,
        //     lastName : this.lName,
        //     phone : this.telNumber
        // })
        // const user = this.$fireStore.collection("Freelance").where("freelanceId",'==','IjlHx1m6jKAm8HvcJeri')
        // .update(

        // ) 
        console.log(editPro)
    }
}
</script>
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