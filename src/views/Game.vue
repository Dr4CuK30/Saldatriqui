<template>
    <div class="tableContainer">
        <GameTable :tableroBloqueado="!miTurno || winner" @selecciono="jugarTurno" :playerNumber="player" :tableData="tablero"/>
    </div>
    <div v-if="winner" class="centerpoint">
        <FinishAlert :ganador="winner == player" @volver="volver"/>
    </div>
</template>

<script>
import FinishAlert from '../components/FinishAlert.vue'
import GameTable from "../components/GameTable.vue"
import  gameLogic  from "../utils/tableProviders"

export default {
    components: {
        GameTable,
        FinishAlert
    },
    data(){
        return {
            roomId: '',
            tablero: [[0,0,0],
                      [0,0,0],
                      [0,0,0]],
            gameData: {},
            miTurno: false,
            player: null,
            winner: null
        }
    },
    created(){
        this.roomId = localStorage.getItem('roomId')
        if(localStorage.getItem('token').split('.')[1] == this.roomId){
            this.player = 1
            this.miTurno = true
        }else this.player = 2
        this.$socket.$subscribe('cargarTablero', payload => {
            console.log('cambio')
            this.tablero[payload.f][payload.c] = payload.player
            this.comprobarGanador()
            this.miTurno = true
        });
    },
    methods: {
        jugarTurno(data){
            this.miTurno = false
            this.tablero[data.f][data.c] = this.player
            this.comprobarGanador()
            this.$socket.client.emit('mover', {roomId: this.roomId, f: data.f, c:data.c, player: this.player})
        },
        comprobarGanador(){
            const winnerData = gameLogic.getWinner(this.tablero)
            if(winnerData){
                this.winner = winnerData.player
            }
        },
        volver(){
            this.$socket.client.emit('leave', {
                playerId: localStorage.getItem('token'), 
                roomId: this.roomId
            })
            localStorage.removeItem('roomId')
            this.$router.push('/menu')
        }
    }
}
</script>

<style scoped>
    .centerpoint {
        top: 50%;
        left: 50%;
        position: absolute;
    }
    .tableContainer{
        width: 100vw;
        height: 100vh;
    }
</style>