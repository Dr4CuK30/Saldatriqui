<template>
  <div class="menu">
    <h2>Bienvenido <span class="username">{{$store.state.userData.usuario}}</span></h2>
    <button class="iniciar" @click="searchOponent" :disabled="buttonsDisabled">Iniciar Juego</button><br>
    <button class="logout" @click="logout">Cerrar Sesión</button>
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
    },
    logout(){
      this.$router.push('signin')
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
    font-family: Righteous;
    border-radius: 10px;
    padding: 5px 10px 5px 10px;
  }

  .menu .iniciar{  
    background-color: rgba(0, 0, 0, 0.459);
    margin-top: 20%;  
    font-size: 60px;
    font-weight: bold;
    color: #EFBE42;
    cursor: pointer;
  }

  .menu .iniciar:hover{
    background-color: rgba(0, 0, 0, 0.719);
  }

  .menu .logout{
    margin-top: 40px;
    background-color: rgb(218, 10, 10);
    color: white;
    cursor: pointer;
  }

  .menu .logout:hover{
    background-color: rgb(136, 1, 1);
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