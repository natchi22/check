<template>
    <div>
        <h1>ประวัติการทำงานของคุณ</h1>
        <CallHistory class="history"/>
        <CallHistory class="history"/>
    </div>
</template>
<script>
import CallHistory from '@/components/Freelance/CallHistory'
export default {
    components:{
        CallHistory
    }
}
</script>
<style scoped>
.history{
    margin: 0 0 20px 0;
}
h1{
    font-size: 24px;
}
</style>