<template>
    <div class="body">
        <!-- หน้าเลือกตรวจงาน -->
        <div class="profile-head">
            <!-- กดรูปดูโปรไฟล์ -->
            <h2>{{ inforManager.firstName }}  {{ inforManager.lastName }}</h2>
            <nuxt-link :to="`/manager/${profile.userId}/info`">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </nuxt-link>
        </div>
        <div>
            <h1>
                {{project}}
            </h1>
        </div>
        <div class="box">
            <div class="div-name">
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
                <h3>{{fName }} {{lName}}</h3>
            </div>
            
            <div class="div-task">
                <h2>
                    {{list}}
                </h2>
                <div class="box-status">
                    <div class="box-date">
                        <a-icon
                            type="clock-circle"
                            :style="{ fontSize: '14px', color: '#ffffff', padding: '4px 0px' }"
                        />
                        <h3>{{ task.endDate }}</h3>
                    </div>
                    <div
                        
                        class="btn-status btn-wait"
                    >
                        <h3>
                            รอตรวจ
                        </h3>
                    </div>
                </div>
                <div class="">
                    <div class="main">
                        <h2 class="topic">
                            แนบ link งาน :
                        </h2>
                        <a
                           
                        >
                            <h3 class="detail linkUrl">
                                {{ task.linkUrl }}
                            </h3>
                        </a>
                    </div>
                    <div class="main">
                        <h2 class="topic">
                            รายละเอียด :
                        </h2>
                        <h3
                            class="detail"
                            v-if="task.desc"
                        >
                            {{ task.desc }}
                        </h3>
                    </div>
                    <hr
                        class="line"
                        v-if="task.comment"
                    >
                    <div
                        class="main"
                        v-if="task.comment"
                    >
                        <h2 class="topic">
                            ความคิดเห็น :
                        </h2>
                        <!-- <h3 class="detail">
                            {{ task.comment }}
                        </h3> -->
                        <a-textarea
                          
                            class="boxInput"
                            placeholder="ความคิดเห็น*"
                           
                        />
                    </div>
                </div>
                <div class="div-btn">
                    <button
                        class="btn btn-size btn-green"
                    >
                        ยืนยัน
                    </button>
                    <button
                        class="btn btn-size btn-wait"
                    >
                        แก้ไข
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    data() {
        return {
            manager:'ชื่อหัวหน้า',
            email:'email',
            project:'ชื่อโปรเจค',
            fName:'ชื่อ',
            lName:'สกุล ฟรีแลนซ์',
            inforManager:{
                firstName:'ชื่อ',
                lastName:'สกุล หัวหน้า',
            },
            list:'ลิสงาน',
            task:{
                endDate:'12/03/2021',
                desc:'รายละเอียด',
                comment:'เม้น',
                linkUrl:'งานจ่ะงาน',

            }
        }
    },
    
}
</script>
<style scoped>
.box{
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 26px 30px;
    margin: 0 10px 20px 10px;
}
.size-pic{
    width: 30px;
	height: 30px;
	margin: 0 0 0 15px;
}
.size-picfreelance{
    width: 60px;
	height: 60px;
	margin: 0 24px 0 0;
}
.div-name{
    display: flex;
}
.div-btn{
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
ิ.btn-size{
    width: 80px;
    height: 20px;
    font-size: 11px;
}
.detail{
    margin: 0 0 0 16px;
}
</style>