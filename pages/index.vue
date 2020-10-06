<template>
	<div>
		<!-- ใส่ตัวโหลด -->
    โหลดแพพ
	 <img class="pic size-pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">
	{{profile.userId}}
	</div>
</template>


<script>
import liff from '@line/liff'
import { mapMutations } from 'vuex'
export default {
  	data () {
    	return {
			image: '',
			name:'',
			userId:''        
		}
  	},
  	methods:{
    	...mapMutations({
        	saveProfile: 'profile/saveProfile'
		}),
	},
 	mounted () {
    	const data = {
      	img : this.image,
      	id : this.userId,
     	name : this.name
    }
    liff.init({ liffId: '1654989800-V2XxzW4z' })
      	.then(() => {
        	if (liff.isLoggedIn()) {
				const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
                const params = new URLSearchParams(queryString)
          	liff.getProfile().then((profile) => { 
            	const userId = profile.userId ///เอาuser id line จากที่ได้ตรงนี้ไปเก็บใน firestore get เข้าไปพร้อมกับหน้าfreelance index
            	const image = profile.pictureUrl
            	const name = profile.displayName
            	this.userId = userId
            	this.name = name
            	this.image = image
				this.saveProfile(profile)
				if (params.get('page') === 'freelance'){
					this.$router.replace('/freelance')
				}
				else if (params.get('page') === 'profile'){
					this.$router.replace('/freelance/profile')
				}
				else if (params.get('page') === 'history'){
					this.$router.replace('/freelance/history')
				} 
          		})
       		}
        	else{
          		liff.login()
        	}
      	})
      	.catch((err) => {
            alert('Connect failed, please try again.')
            liff.closeWindow()
        })
  	}
}
</script>
<style>

</style>
