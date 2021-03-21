<template>
    <div class="body">
        <a-form @submit.prevent="addWork">
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.form.name.required ? 'error' : ''"
                :help="submitted && !$v.form.name.required ? 'กรุณากรอกชื่องาน' : ''"
            >
                <template slot="label">
                    ชื่องาน
                </template>
                <a-input
                    class="boxInput"
                    placeholder="ชื่อ Project*"
                    v-model="form.name"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.form.endDate.required ? 'error' : ''"
                :help="submitted && !$v.form.endDate.required ? 'กรุณากรอก รหัสผ่าน' : ''"
            >
                <template slot="label">
                    กำหนดส่งงาน
                </template>
                <a-date-picker
                    :disabled-date="disabledDate"
                    :format="dateFormatList"
                    class="boxDate"
                    placeholder="กำหนดส่ง Project*"
                    v-model="form.endDate"
                />
            </a-form-item>
            <a-form-item
                style="margin-bottom: 14px"
                :validateStatus="submitted && !$v.form.manager.required ? 'error' : ''"
                :help="submitted && !$v.form.manager.required ? 'กรุณาเลือกหัวหน้างาน' : ''"
            >
                <template slot="label">
                    หัวหน้างาน
                </template>
                <a-select
                    style="width: 100%"
                    @change="handleChangeManager"
                    placeholder="หัวหน้างาน*"
                >
                    <a-icon
                        slot="suffixIcon"
                        type="user"
                    />
                    <a-select-option
                        v-for="item in inforhead"
                        :value="item.managerId"
                        :key="item.managerId"
                    >
                        {{ item.fName }} {{ item.lName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form
                @submit.prevent="addList"
                :validateStatus="submitted && !$v.form.taskList.minLength ? 'error' : ''"
                :help="submitted && !$v.form.name.minLength ? 'กรุณาเพิ่มงานย่อย' : ''"
            >
                <a-form-item
                    style="margin-bottom: 14px"
                    :validateStatus="submittedSub && !$v.subTaskFocus.required ? 'error' : ''"
                    :help="submittedSub && !$v.subTaskFocus.required ? 'กรุณากรอกชื่องานย่อย' : ''"
                >
                    <template slot="label">
                        งานย่อย
                    </template>
                    <a-input
                        class="boxInput"
                        placeholder="งานย่อย*"
                        allow-clear
                        v-model="subTaskFocus"
                    />
                </a-form-item>
                <a-form-item
                    style="margin-bottom: 14px"
                    :validateStatus="submittedSub && !$v.subTaskFocus.required ? 'error' : ''"
                    :help="submittedSub && !$v.subTaskFocus.required ? 'กรุณากรอกชื่องานย่อย' : ''"
                >
                    <template slot="label">
                        นัดตรวจ
                    </template>
                    <a-date-picker
                        class="boxDate"
                        :format="dateFormatList"
                        placeholder="นัดตรวจ*"
                        v-model="dateFocus"
                    />
                </a-form-item>
                <a-button
                    html-type="submit"
                    type="primary"
                >
                    เพิ่มงานย่อย
                </a-button>
            </a-form>
            <a-button
                block
                size="large"
                html-type="submit"
                type="primary"
            >
                เพิ่มงาน
            </a-button>
        </a-form>
        <div
            class="box-list"
            v-for="(item,index) in form.taskList"
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
                <h3>กำหนดส่ง : {{ item.endDate }}</h3>
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
import { mapState } from 'vuex'
import moment from 'moment'
import toastr from 'toastr'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            inforhead: [],
            moment,
            dateFormatList: 'DD/MM/YYYY',
            form: {
                name: '',
                startDate: moment().format('DD/MM/YYYY'),
                endDate: '',
                manager: '',
                taskList: []
            },
            subTaskFocus: '',
            dateFocus: '',
            submitted: false,
            submittedSub: false
        }
    },
    computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย == นำอะไรที่มาจากไลน์มาใช้
        ...mapState({
            profile: state => state.profile.profileData
        })
    },
    methods: {
        async getManagerData() {
            const inforhead = await this.$fireStore.collection("Manager")
                .get()
            inforhead.forEach((doc)=>{
                this.inforhead.push(doc.data())
            })
        },
        addList() {
            this.submittedSub = true
            this.form.taskList.push({
                name: this.subTaskFocus,
                endDate: moment(this.dateFocus).format('DD/MM/YYYY'),
                status: 'IN_PROCESS'
            })
            this.subTaskFocus = ''
            this.dateFocus = ''
        },
        remove(index) {
            this.form.taskList.splice(index, 1)
        },
        async addWork() {
            this.submitted = true
            const task = this.$fireStore.collection("Task").doc()
            await task.set({
                taskId: task.id,
                name: this.form.name,
                freelanceId: this.profile.userId,
                startDate: this.form.startDate,
                endDate: moment(this.form.endDate).format('DD/MM/YYYY'),
                manager: this.form.manager,
                taskList: this.form.taskList,
            }).then(()=>{
                toastr.success('เพิ่มงานสำเร็จ')
                this.$router.go(-1)
            }).catch(()=>{
                toastr.error('เกิดข้อผิดพลาด ลองใหม่อีกครั้ง')
            })
        },
        handleChangeManager(value) {
            this.form.manager = value
        },
        disabledDate(current) {
            return current <= moment()
        },

    },
    async mounted() {
        this.getManagerData()
    },
    validations: {
        form: {
            name: { required },
            endDate: { required },
            manager: { required },
            taskList: { minLength: minLength(1) }
        },
        subTaskFocus: { required },
        dateFocus: { required },
    },
}
</script>

<style scoped>
.div-top{
	width: 100%;
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
	width: 100%;
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
.ant-btn{
    box-shadow: 4px 4px 8px rgba(0,0,0,0.25);
}
.ant-btn-group.ant-dropdown-button{
	width: 100%;
}
.ant-btn.ant-btn-default{
	width: 85%;
}
.ant-btn.ant-btn-default.ant-dropdown-trigger{
	width: 15%;
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

<style>
.ant-select-open .ant-select-icon-arrow-icon svg {
    transform: rotate(0deg);
}
</style>
