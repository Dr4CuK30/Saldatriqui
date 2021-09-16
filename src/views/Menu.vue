<template>
  <div class="menu">
    <button @click="searchOponent" :disabled="buttonsDisabled"> JUGAR </button>
    <SearchingPlayer v-if="searchingOponent"/>
  </div>
</template>

<script>
import SearchingPlayer from '../components/SearchingPlayer.vue'
export default {
  components: { SearchingPlayer },
  data(){
    return {
      searchingOponent: false,
      buttonsDisabled: false
    }
  },
  created(){
    this.$socket.$subscribe('empezar', payload => {
      this.$store.state.roomId = payload
      this.$router.push('game')
    });
  },
  methods: {
    searchOponent(){
      this.searchingOponent = true
      this.buttonsDisabled = true
      this.$socket.client.emit('search', localStorage.getItem('token'))
    }
  },
}
</script>

<style scoped>
  .menu{
    width: 95%;
    height: 95%;
    position: absolute;
    text-align: center;
  }
  .menu button{  
    margin-top: 10%;  
    font-family: Righteous;
    font-size: 60px;
    font-weight: bold;
  }
</style>