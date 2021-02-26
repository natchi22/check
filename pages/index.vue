<template>
  <div class="loaddata">
    <!-- ใส่ตัวโหลด -->
    <a-icon type="loading" :style="{ fontSize: '64px', color: '#3ABCA7' }" />
  </div>
</template>

<script>
import liff from '@line/liff'
import { mapState, mapMutations } from 'vuex'
export default {
  	data () {
    	return {
      image: '',
      name: '',
      userId: '',

      inforFrelance: {},
      freelanceData: '',
      fName: '',
      lName: '',
      telNumber: '',
      lineId: '',
      task: null

    }
	  },
  computed: { // นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **import mapState ด้วย
    ...mapState({
      profile: state => state.profile.profileData
    })
  },
  	methods: {
    	...mapMutations({
        	saveProfile: 'profile/saveProfile'
    })

  },
 	async mounted () {
    	const data = {
      	img: this.image,
      	id: this.userId,
     	name: this.name
    }

    liff.init({ liffId: '1655688087-NzP8r7n2' })
      	.then(() => {
        	if (liff.isLoggedIn()) {
          const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
          const params = new URLSearchParams(queryString)
          		liff.getProfile().then(async (profile) => {
            console.log(profile)
            const userId = profile.userId /// เอาuser id line จากที่ได้ตรงนี้ไปเก็บใน firestore get เข้าไปพร้อมกับหน้าfreelance index
            const image = profile.pictureUrl
            const name = profile.displayName
            this.userId = userId
            this.name = name
            this.image = image
            this.saveProfile(profile)
            if (params.get('page') === 'freelance') {
              const getInfo = await this.$fireStore.collection('Freelance').where('lineId', '==', this.profile.userId).get()
              getInfo.forEach((doc) => {
                this.inforFrelance = doc.data()
              })
              if (this.inforFrelance.lineId && this.inforFrelance.firstName &&
							this.inforFrelance.lastName &&
							this.inforFrelance.phone) {
                const freelance = await this.$fireStore.collection('Freelance').where('lineId', '==', this.profile.userId).get()
                freelance.forEach((doc) => {
                  this.freelanceData = doc.data()
                })

                const dateTime = await this.$fireStore.collection('Task')
                  .where('freelanceId', '==', this.freelanceData.freelanceId)
                  .where('status', '==', false).get()
                dateTime.forEach((doc) => {
                  this.task = doc.data()
                })

                if (this.task !== null) {
                  this.$router.replace('/freelance/checkout')
                } else {
                  this.$router.replace('/freelance/checkin')
                }
              } else {
                this.$router.replace('/freelance')
              }
            } else if (params.get('page') === 'profile') {
              this.$router.replace('/freelance/profile')
            } else if (params.get('page') === 'history') {
              this.$router.replace('/freelance/history')
            }
          })
        } else {
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
.loaddata{
	margin: 60% 0 0 40%;
}
</style>
