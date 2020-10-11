<template>
	<div>
		<h1>ประวัติการทำงานของคุณ</h1>
		<CallHistory class="history" /> <!-- ทำ v-for  ให้มันวนงานทุกอันที่มี-->
	</div>
</template>
<script>
import CallHistory from '@/components/Freelance/CallHistory'
export default {
	components: {
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
/* @media screen and (min-width: 768px ){
.history{
    margin: 0 0 200px 0;
}
} */
</style>
