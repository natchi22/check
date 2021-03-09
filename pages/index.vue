<template>
    <div class="loaddata">
        <!-- ใส่ตัวโหลด -->
        <a-icon
            type="loading"
            :style="{ fontSize: '64px', color: '#3ABCA7' }"
        />
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
    watch: {
        async profile() { //ต่อไฟเบสเข้า คอลเลคชัน freelance ถ้าเจอ lineId = profile.userId(?) เหมือนกัน get ข้อมูลออกมา

            const freelance = await this.$fireStore.collection('Freelance')
                .where('lineId', '==', this.profile.userId).get()
            if (!freelance.empty) { //ถ้ามันแม่น get ข้อมูล ไปพาร์ทตัวเอง
                this.$router.push(`/freelance/${this.profile.userId}`)
            }
            else {
                this.$router.push(`/freelance`)
            }

        }
    },
    async mounted () {
        // const data = {
        //     img: this.image,
        //     id: this.userId,
        //     name: this.name
        // }
        liff.init({ liffId: '1655688087-NzP8r7n2' })
            .then(() => {
                if (liff.isLoggedIn()) {
                    // const queryString = decodeURIComponent(window.location.search).replace('?liff.state=', '')
                    // const params = new URLSearchParams(queryString)
                    liff.getProfile().then(async (profile) => {
                        const userId = profile.userId /// เอาuser id line จากที่ได้ตรงนี้ไปเก็บใน firestore get เข้าไปพร้อมกับหน้าfreelance index
                        const image = profile.pictureUrl
                        const name = profile.displayName
                        this.userId = userId
                        this.name = name
                        this.image = image
                        this.saveProfile(profile)
                    })
                }
                else {
                    liff.login()
                }
            })
            .catch(() => {
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
