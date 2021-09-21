<template>
  <div class="menu">
    <h2>Bienvenido <span class="username">{{$store.state.userData.usuario}}</span></h2>
    <button @click="searchOponent" :disabled="buttonsDisabled">Iniciar Juego</button>
  </div>
  <div id="centerpoint">
    <SearchingPlayer v-show="searchingOponent"/>
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
    border: 0;  
    background-color: rgba(0, 0, 0, 0.459);
    margin-top: 5%;  
    font-family: Righteous;
    font-size: 60px;
    font-weight: bold;
    border-radius: 10px;
    color: #EFBE42;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
  }
  #centerpoint {
    top: 50%;
    left: 50%;
    position: absolute;
  }
  .menu h2{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 40px;
  }
  .username {
    font-family:Righteous;
    color: red
  }
</style>