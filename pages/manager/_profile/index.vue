<template>
    <div class="body">
		<div class="profile-head">
			<!-- กดรูปดูโปรไฟล์ -->
			<h2>ชื่อหัวหน้า งาน</h2>
			<nuxt-link :to="`/freelance/${profile.userId}`">
				<img
                class="pic size-pic"
                :src="profile.pictureUrl"
                alt="รูปโปรไฟล์"
            >
			</nuxt-link>
			
		</div>
		<div class="tabs">
            <a-alert
                message="งานขึ้นบ้านใหม่"
                description="ช้ากว่ากำหนดแล้ว"
                type="warning"
                show-icon
                closable
                @close="onClose"
                class="alert"
            />
			<a-tabs type="card" @change="callback">
				<a-tab-pane key="1" tab="ตรวจงาน">
					<nuxt-link to="/head/foremen/checkProject">	
						<div 
							class="box" 
							v-for=""
						> 
							<h1>{{form.taskName}}</h1>
						</div>
					</nuxt-link>
				</a-tab-pane>
				<a-tab-pane key="2" tab="รายชื่อ">
				<nuxt-link to="/head/foremen/checkEmploy">	
					<div 
                        class="box"
                        v-for=""
                    >
						<h1>{{fName}} {{lName}}</h1>
					</div>
				</nuxt-link>
				</a-tab-pane>
       		</a-tabs>
		</div>
        


    </div>
</template>
<script>
export default {
  	data() {
    	return {
            form:{
				taskName: 'งานขึ้นบ้านใหม่', //ชื่องานที่หัวหน้าคนนี้งานดูแลทั้งหมด
				date: null,
				manager: null,
				tasks: []
            },
            //ชื่อพนักงานที่หัวหน้าคนนี้ดูแลทั้งหมด
            fName: 'จิรัชญา',
            lName: 'นวลแก้ว',
        };
  	},
  	methods: {
    	callback(key) {
      	    console.log(key);
        },
        onClose(e) {
        console.log(e, 'I was closed.');
        },
    },
};
</script>
<style scoped>
.body{
	padding: 16px;
}
.tabs{
	padding: 0 32px;
}
.alert{
    margin: 0 0 20px 0;
}
.size-pic{
    width: 30px;
	height: 30px;
	margin: 0 0 0 15px;
}
.box{
    box-shadow: 4px 4px 8px rgb(229,229,229);
    padding: 24px;
    margin: 0 10px 20px 10px;
}
@media screen and (max-width: 1920px ) and (min-width: 768px ){
.tabs{
	
}
}
</style>
<style>

</style>