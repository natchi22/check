<template>
  <div class="card">
    <img class="pic" :src="profile.pictureUrl" alt="รูปโปรไฟล์">
    <h1>{{ fName }} {{ lName }}</h1>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
export default {
  computed: { //นำstoreไปใช้ วางไว้หน้าที่จะใช้ และเรียกใช้บนโค้ด **importmapState ด้วย
    ...mapState({
    profile: state => state.profile.profileData // มาทำอันนี้พรุ่งนี้
  })
},
  data () {
    return {
      fName: 'นางสาว',
      lName: 'สมศรี'
    }
  }
}
</script>
<style scoped>
.card{
    display: flex;
    height: 80px;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(58,188,167,0.25);
    align-items: center;
}
.card h1{
    margin: 0;
    font-size: 18px;
}
.pic{
    width: 40px;
    height: 40px;
    margin: 0 20px;
}
</style>
