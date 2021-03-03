<template>
    <div class="body">
        <div class="top">
            <div>
                <h1>{{ form.taskName }}</h1>
                <div class="boxTime">
                    <a-icon
                        type="clock-circle"
                        :style="{ fontSize: '24px', color: '#ffffff' }"
                    />
                    <h2>{{ form.date }}</h2>
                </div>
            </div>
            <div>
                <img
                    class="pic size-pic"
                    :src="profile.pictureUrl"
                    alt="รูปโปรไฟล์"
                >
            </div>
        </div>
        <h2>ความสำเร็จตามแผน</h2>
        <a-progress
            :percent="50"
            status="active"
            class="progress"
        />
        <h2>ความสำเร็จปัจจุบัน</h2>
        <a-progress
            :percent="60"
            status="active"
            class="progress"
        />
        <!-- ถ้างานที่ส่งตรวจผ่านแล้ว แสดงช่องนี้ -->
        <div class="status">
            <div class="top-succeed">
                <h2>1.ชื่อstep</h2>
            </div>
            <div class="box-status">
                <div class="box-date">
                    <a-icon
                        type="clock-circle"
                        :style="{ fontSize: '14px', color: '#ffffff' }"
                    />
                    <h3>{{ taskList.date }}</h3>
                </div>
                <div class="btn-status btn-succeed">
                    <h3>ตรวจแล้ว</h3>
                </div>
            </div>
            <div class="main">
                <h3 class="topic">
                    แนบงาน
                </h3>
                <h3>:</h3>
                <h3 class="detail">
                    {{ urlTask }}
                </h3>
            </div>
            <div class="main">
                <h3 class="topic">
                    รายละเอียด
                </h3>
                <h3>:</h3>
                <h3 class="detail">
                    {{ detailTask }}
                </h3>
            </div>
            <hr>
            <div class="main">
                <h3 class="topic">
                    ความคิดเห็น
                </h3>
                <h3>:</h3>
                <h3 class="detail">
                    {{ commentTask }}
                </h3>
            </div>
        </div>
        <!-- งานที่ยังไม่ได้ส่ง แสดงช่องนี้ -->
        <div class="status">
            <div class="top-succeed">
                <h2>2.ชื่อstep</h2>
            </div>
            <div class="box-status">
                <div class="box-date">
                    <a-icon
                        type="clock-circle"
                        :style="{ fontSize: '14px', color: '#ffffff' }"
                    />
                    <h3>{{ taskList.date }}</h3>
                </div>
                <div class="btn-status btn-wait">
                    <h3>รอตรวจ</h3>
                </div>
            </div>

            <div class="main">
                <h3 class="topic">
                    แนบงาน
                </h3>
                <h3>:</h3>
                <a-upload
                    class="upload"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :default-file-list="defaultFileList"
                >
                    <a-button>
                        <a-icon
                            type="upload"
                        /> Upload
                    </a-button>
                </a-upload>
            </div>

            <div class="main">
                <h3 class="topic">
                    รายละเอียด
                </h3>
                <h3>:</h3>
                <a-textarea
                    class="boxInput"
                    placeholder="รายละเอียดงาน*"
                    :rows="4"
                />
            </div>
            <div class="btn-check">
                <button
                    @click="check()"
                    class="btn btn-green btn-size"
                >
                    ตรวจ
                </button>
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

            dateFormatList: [ 'DD/MM/YYYY', 'DD/MM/YY' ],
            form: {
                taskName: 'งานขึ้นบ้านใหม่',
                date: '01/01/2021',
                manager: null,
                tasks: []
            },
            taskList: {
                name: null,
                date: '16/01/2021'
            },
            urlTask: 'URLงานที่แนบมา',
            detailTask: 'รายละเอียดการทำงานชิ้นนี้รายละเอียดการทำงานชิ้นนี้รายละเอียดการทำงานชิ้นนี้',
            commentTask: 'คอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างานคอมเม้นจากหัวหน้างาน'
        }
    },
    methods: {
        check() {
            this.form.tasks.push({
                name: this.taskList.name,
                date: this.taskList.date
            })
            this.taskList = {
                name: null,
                date: null
            }
        },

    },
}
</script>
<style scoped>
/* รูป */
.size-pic{
    width: 80px;
    height: 80px;
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0 24px 0;
}
/* กรอบวันที่ใหญ่ */
.boxTime{
    display: flex;
    flex-direction: row;
    background: #FF0000;
    border-radius: 4px;
    padding: 3px 9px;
}
.boxTime h2{
    color: #ffffff;
}
h2{
    padding: 0 0 0 4px;
}
.progress{
    margin: 0 0 20px 0;
}
/* กรอบตรวจแล้ว อยู่style*/

</style>
