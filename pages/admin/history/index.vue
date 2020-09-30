<template>
  <div class="tabs">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="วันที่">
        <div class="picker">
          <a-date-picker
            :default-value="moment('01/01/2015', dateFormatList[0])"
            :format="dateFormatList"
          />
        </div>
        <CallCardDate class="margin-card" />
        <CallCardDate class="margin-card" />
        <CallCardDate class="margin-card" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="รายชื่อ">
        <nuxt-link to="/admin/history/name">
          <CallCardName class="margin-card" />
          <CallCardName class="margin-card" />
          <CallCardName class="margin-card" />
        </nuxt-link>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import moment from 'moment'
import CallCardDate from '@/components/Admin/Date/CallCardDate'
import CallCardName from '@/components/Admin/Name/CallCardName'
export default {
  components: {
    CallCardDate,
    CallCardName
  },
  data () {
    return {
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY']
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    moment
  }
}
</script>
<style scoped>
.date{
margin: 5px 0 21px 0;
}
.picker{
	margin-bottom: 20px;
}
.margin-card{
margin-bottom: 26px;
}
</style>
<style>
/* tabs */
.ant-tabs-nav .ant-tabs-tab-active{
color: #3ABCA7;
}
.ant-tabs-ink-bar{
background-color: #3ABCA7;
}
.ant-tabs-nav .ant-tabs-tab:hover{
color: #3ABCA7;
}
/* tabs */
/* date */
.ant-calendar-today .ant-calendar-date{
color: #3ABCA7;
border-color: #3ABCA7;
}
.ant-calendar-selected-day .ant-calendar-date{
background: rgba(58, 188, 167,0.1);
}
/* date */
</style>
