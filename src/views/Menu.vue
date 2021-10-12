<template>
  <div class="menu">
    <h2>Bienvenido <span class="username">{{$store.state.userData.usuario}}</span></h2>

    <div class="match-table">
      <table>
        <!--Head-->
        <tr>
          <th>Jugador</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>

        <!--Content/Games-->
        <tr v-for="(game, index) in currentRooms" :key="game">

          <th>{{game.host}}</th>

          <th v-if="game.isFull">En Partida</th>
          <th v-else>Esperando...</th>

          <th v-if="!game.isFull"><button @click="join(index)">Unirse</button></th>
          <th class="roomFull" v-else><a href="">Lleno</a></th>
        </tr>
      </table>
    </div>
    <div class="table-footer">
        <button class="reload" @click="getRooms">
          <font-awesome-icon icon="sync-alt" class="reloadIcon"/>
        </button>
    </div>
    <div class="buttons">
      <button
          class="iniciar"
          @click="createRoom"
          :disabled="buttonsDisabled"
      >
        Crear Sala
      </button>
      <button
          class="iniciar"
          @click="viewScores"
          :disabled="buttonsDisabled"
      >
        Ver puntajes
      </button>
    </div>


    <br>
    <button class="logout" @click="logout">Cerrar Sesión</button>
  </div>
</template>

<script>
import getRoomsMethod from "../services/matches_scs"
export default {
  data(){
    return {
      searchingOponent: false,
      buttonsDisabled: false,
      currentRooms: {}
    }
  },
  created(){
    this.$socket.$subscribe('start', payload => {
      localStorage.setItem('roomId', payload.roomId)
      this.$router.push('game')
    });
  
    this.getRooms();

  },
  methods: {
    logout(){
      this.$router.push('signin')
    },
    async getRooms(){
      this.currentRooms = await getRoomsMethod.getRoomsFromApi(this)
    },
    createRoom(){
      const playerId = localStorage.getItem('token')
      localStorage.setItem('roomId', playerId.split('.')[1])
      this.searchingOponent = true
      this.buttonsDisabled = true
      this.$socket.client.emit('create',  {"playerId" : playerId, "player": this.$store.state.userData})
      this.$router.push('game')
    },
    join(roomId){
      this.searchingOponent = true
      this.buttonsDisabled = true
      this.$socket.client.emit('join',  {"roomId":roomId,"player" : this.$store.state.userData})
    },
    viewScores(){
      this.$router.push('puntajes')
    }
  },
}
</script>

<style scoped>
  .menu{
    width: 100%;
    height: 95%;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em 4em;
  }
  .buttons{
    display: flex;
    justify-content: space-around;
    width: 800px;
  }

  .menu button{
    border: 0;
    font-family: Righteous;
    border-radius: 10px;
    padding: 5px 10px 5px 10px;
  }

  .menu .iniciar{  
    background-color: rgba(0, 0, 0, 0.459);

    font-size: 60px;
    font-weight: bold;
    color: #EFBE42;
    cursor: pointer;
  }

  .menu .iniciar:hover{
    background-color: rgba(0, 0, 0, 0.719);
  }

  .menu .logout{
    width: 10em;
    font-size: 1.5rem;

    background-color: rgb(218, 10, 10);
    color: white;
    cursor: pointer;
  }

  .menu .logout:hover{
    background-color: rgb(136, 1, 1);
  }

  .match-table{
    color: #FFF;
    font-family: "DM Sans";
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 3em 0;
  }

  .match-table table{
    padding: 1.5em;
    width: 100%;
    border: solid 2px #b2faff;
    border-radius: 20px;
    border-spacing: 0;

    background: rgba(61, 61, 61, 0.548);
  }

  .match-table table tr{
    border-radius: 20px;
    text-align: center;
    
  }

  .match-table table tr th{
    font-weight: 500;
    font-size: 2.5em;
    padding: 0.5em 0;
  }

  .match-table table tr th a{
    text-decoration: none;
    color: #FFF;
  }

  .roomFull a{
    color: rgb(107, 107, 107) !important; 
    cursor:default !important; 
  }

  .roomFull{
    cursor:default !important; 
  }

  .match-table table tr th:last-child{
    background-color: rgb(43, 43, 43);
  }

  .match-table table tr:not(:first-child) th:last-child:hover{
    cursor: pointer;
    background-color: rgb(90, 90, 90);
  }

  .match-table table tr:first-child th{
    font-weight: 600;
    background-color: #333333a9;
  }

  .match-table table tr:nth-child(even){
    background-color: #70707065;
  }
  .menu h2{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 4rem;
  }
  .username {
    font-family:Righteous;
    color: red
  }
  .reload{
    margin-bottom: 20px;
    cursor: pointer;
  }
  .reload .reloadIcon{
    width: 30px;
    height: 30px;
  }
  .table-footer{
    width: 100vw;
  }
</style>