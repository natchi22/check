<template>
    <div class="body">
        <div class="cover">
            <!-- <img class="pic size-pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">  ชื่อไฟล์.ตัวที่เอาไปเก็บ -->
            <nuxt-link to="/employ/profile/profile">
                <img
                    class="pic size-pic"
                    src="../assets/images/profile.jpg"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div class="head">
            <h2>{{ fName }} {{ lName }}</h2>
            <nuxt-link to="/employ/profile/edit">
                <a-icon
                    type="edit"
                    :style="{ color: '#555555' }"
                />
            </nuxt-link>
        </div>
        <nuxt-link to="/employ/work/stepproject">
            <div class="box">
                <h1>{{ nameTask }}</h1>
                <div class="dateTask">
                    <h2 class="topic">
                        เริ่ม :
                    </h2>
                    <h2>{{ dateStart }}</h2>
                </div>
                <div class="dateTask">
                    <h2 class="topic">
                        สิ้นสุด :
                    </h2>
                    <h2>{{ dateEnd }}</h2>
                </div>
                <div>
                    <h3>ความสำเร็จตามแผน</h3>
                    <a-progress
                        :percent="50"
                        status="active"
                    />
                </div>
                <div>
                    <h3>ความสำเร็จปัจจุบัน</h3>
                    <a-progress
                        :percent="50"
                        status="active"
                    />
                </div>
            </div>
        </nuxt-link>
        <div class="div-submit">
            <nuxt-link to="/employ/work">
                <button
                    class="btn btn-green"
                    @click="submit"
                >
                    เพิ่มงาน
                </button>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            fName: 'จิรัชญา',
            lName: 'นวลแก้ว',
            nameTask: 'งานขึ้นบ้านใหม่',
            dateStart: '01/01/2021',
            dateEnd: '01/02/2021',
        }
    },
    methods: {
        submit() {

        }
    }
}
</script>

<style scoped>
.box{
    width: 100%;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 24px;
    margin: 0 auto 24px auto;
}
.dateTask{
    display: flex;
    padding: 0 0 0 10px;
}
.topic{
    width: 56px;
}
h1{
    text-align: center;
}
/* รูป */
.size-pic{
    width: 80px;
    height: 80px;
}
.cover{
    display: flex;
    justify-content: center;
    margin: 0 0 24px 0;
}
.head{
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
}
.head h2{
    margin: 0 8px 0 0;
}
.btn{
    width: 180px;
}
.div-submit{
    display: flex;
    justify-content: center;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.box{
    width: 700px;
}
}
</style>
