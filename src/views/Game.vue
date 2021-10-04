<template>
    <div class="tableContainer">
        <GameTable :tableroBloqueado="!miTurno || winner" @selecciono="jugarTurno" :playerNumber="player" :tableData="tablero"/>
    </div>
    <div v-if="winner" class="centerpoint">
        <FinishAlert :ganador="winner == player" @volver="volver"/>
    </div>
    <div class="options">
        <button @click="volver">Salir</button>
    </div>
    <div class="centerpoint">
        <SearchingPlayer v-show="turnoDe == 3"/>
    </div>
</template>

<script>
import FinishAlert from '../components/FinishAlert.vue'
import GameTable from "../components/GameTable.vue"
import SearchingPlayer from '../components/SearchingPlayer.vue'
export default {
    components: {
        SearchingPlayer,
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
            winner: null,
            turnoDe: 3,
        }
    },
    created(){
        this.$socket.client.emit('cargarData', {roomId: localStorage.getItem('roomId')})
        this.roomId = localStorage.getItem('roomId')
        if(localStorage.getItem('token').split('.')[1] == this.roomId){
            this.player = 1
            this.miTurno = true
        }else this.player = 2
        this.$socket.$subscribe('cargarTablero', payload => {
            const { tableroData, turno, evento } = payload
            this.tablero = tableroData
            if(evento){
                if(evento.evento == 'hayGanador') {
                    this.winner = evento.ganadorData.winner
                    return
                }
                else if(evento.evento == 'empate') console.log('empate')
            }
            this.turnoDe = turno
            turno == this.player ? this.miTurno = true : this.miTurno = false
        });
    },
    methods: {
        jugarTurno(data){
            this.miTurno = false
            this.tablero[data.f][data.c] = this.player
            this.$socket.client.emit('mover', {roomId: this.roomId, f: data.f, c:data.c, player: this.player})
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