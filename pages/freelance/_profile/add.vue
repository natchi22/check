<template>
    <div class="body">
        <div class="div-top">
            <h2>งาน</h2>
            <a-input
                class="boxInput"
                placeholder="ชื่อ Project*"
                v-model="form.taskName"
            />

            <h2>กำหนดส่งงาน</h2>
            <a-date-picker
                class="boxDate"
                @change="onChange"
                placeholder="กำหนดส่ง Project*"
                v-model="form.date"
            />

            <h2>หัวหน้างาน</h2>
            <a-dropdown-button>
                หัวหน้างาน*
                <a-menu
                    class="boxDropdown"
                    slot="overlay"
                    @click="handleMenuClick"
                    v-model="form.manager"
                >
                    <a-menu-item key="1">
                        <a-icon type="user" />หัวหน้าคนที่่ 1
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="user" />หัวหน้าคนที่ 2
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="user" />หัวหน้าคนที่ 3
                    </a-menu-item>
                </a-menu>
                <a-icon
                    slot="icon"
                    type="user"
                />
            </a-dropdown-button>
        </div>


        <div class="box">
            <h2>ลำดับงาน :</h2>
            <a-input
                class="boxInput"
                placeholder="ลำดับงาน*"
                allow-clear
                v-model="taskList.name"
            />

            <h2>นัดตรวจ :</h2>
            <a-date-picker
                class="boxDate"
                @change="onChange"
                :format="dateFormatList"
                :disabled-date="disabledDate"
                placeholder="นัดตรวจ*"
                v-model="taskList.date"
            />
        </div>
        <div class="div-list">
            <button
                class="btn btn-green btn-size-list"
                @click="addList()"
            >
                เพิ่มลิส
            </button>
        </div>

        <div
            class="box-list"
            v-for="(item,index) in form.tasks"
            :key="index"
        >
            <div class="div-delete">
                <a-icon
                    type="close"
                    @click="remove(index)"
                />
            </div>
            <div class="topic">
                <h2>{{ index+1 }}. {{ item.name }}</h2>
            </div>
            <div class="topic">
                <h3>กำหนดส่ง : {{ item.date }}</h3>
            </div>
        </div>
        <br>
        <div class="div-add">
            <button
                class="btn btn-green btn-size-add"
                @click="addWork()"
            >
                เพิ่มงาน
            </button>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {

    data() {
        return {
            moment,
            dateFormatList: [ 'DD/MM/YYYY', 'DD/MM/YY' ],
            form: {
                taskName: '',
                date: null,
                manager: null,
                tasks: []
            },
            taskList: {
                name: null,
                date: null
            },
        }
  	},
    methods: {
        addList() {
            this.form.tasks.push({
                name: this.taskList.name,
                date: this.taskList.date
            })
            this.taskList = {
                name: null,
                date: null
            }
        },
        remove(index) {
            this.form.tasks.splice(index, 1)
        },
        // addWork() {
        //   this.work.push(this.nameWork)
        // },
        //     onChange(date, dateString) {

        //       console.log(date, dateString)
        // },
        handleButtonClick(e) {
            console.log('click left button', e)
        },
        handleMenuClick(e) {
            this.form.manager = e.key
        },
  	},
}
</script>
<style scope>
.body{
	padding: 48px;
}
.div-top{
	width: 300px;
	padding: 0 18px;
}
.div-top h2{
	margin: 14px 0 0 0;
}
.btn{
	font-size: 12px;
}
.btn-size-list{
	width: 50px;
	height: 26px;
	margin: 0 0 28px 0;
}
.div-list{
	width: 300px;
	display: flex;
	justify-content: flex-end;
	padding: 0 32px;
}
.div-add{
	display: flex;
	justify-content: center;
}
.div-delete{
	display: flex;
	justify-content: flex-end;
}
.btn-size-add{
	width: 180px;
	height: 32px;
}
.box{
	width: 300px;
	padding: 32px 32px 14px 32px;
}
.box h2{
	margin: 14px 0 0 0;
}
.box-list{
	padding: 16px 18px;
	box-shadow: 4px 4px 8px rgb(229,229,229);
	margin: 0 24px 20px 24px;
}
.boxInput{
	width: 100%;
	margin: 0;
}
.boxDate{
	width: 100%;
}
.boxDropdown{
	width: 100%;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.div-top{
	width: 600px;
	margin: 0 auto;
}
.box{
	width: 600px;
	margin: 0 auto;
	padding: 32px 48px 14px 48px;
}
.div-list{
	width: 600px;
	margin: 0 auto;
	padding: 0 48px;
}
.box-list{
	width: 504px;
	margin: 0 auto 20px auto;
}
}
</style>
