<template>
  <div class="puntajes-page">
    <h1>Puntajes</h1>
    <div class="match-table">
      <table>
        <tr>
          <th>Jugador</th>
          <th>Puntaje</th>
        </tr>
        <tr v-for="(jugador) in data">
          <th>{{jugador.usuario}}</th>
          <th>{{jugador.max_score}}</th>
        </tr>
      </table>
    </div>
    <button
        class="iniciar"
        @click="goBack"
        :disabled="buttonsDisabled"
    >
      Volver al menú
    </button>

  </div>
</template>

<script>
import getRoomsMethod from "../services/matches_scs"

export default {
  name: "Scores",
  data(){
    return{
      data: []
    }
  },
  created() {
    this.getScores()
  },
  methods:{
    goBack(){
      this.$router.push('menu')
    },
    async getScores(){
      this.data = await getRoomsMethod.getScores(this)

    }
  }
}
</script>

<style scoped>
.puntajes-page{
  width: 100%;
  height: 95%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

.match-table{
  color: #FFF;
  font-family: "DM Sans";
  display: flex;
  justify-content: center;
  width: 50%;
  margin-top: 30px;

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
.puntajes-page h1{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: white;
  font-size: 4rem;
}

button{
  border: 0;
  font-family: Righteous;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  margin-top: 10px;
}

.iniciar{
  background-color: rgba(0, 0, 0, 0.459);

  font-size: 60px;
  font-weight: bold;
  color: #EFBE42;
  cursor: pointer;
}

.iniciar:hover{
  background-color: rgba(0, 0, 0, 0.719);
}
</style>