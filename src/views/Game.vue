<template>
    <div class="tableContainer">
        <GameTable :tableroBloqueado="!miTurno" @selecciono="jugarTurno" :playerNumber="player" :tableData="tablero"/>
    </div>
</template>

<script>
import GameTable from "../components/GameTable.vue"

export default {
    components: {
        GameTable
    },
    data(){
        return {
            tablero: [[0,0,0],
                      [0,0,0],
                      [0,0,0]],
            gameData: {},
            miTurno: false,
            player: null
        }
    },
    created(){
        if(localStorage.getItem('token').split('.')[1] == this.$store.state.roomId){
            this.player = 1
            this.miTurno = true
        }else this.player = 2
        this.$socket.$subscribe('cargarTablero', payload => {
            this.tablero[payload.f][payload.c] = payload.player
            this.miTurno = true
        });
    },
    methods: {
        jugarTurno(data){
            console.log('oprimio')
            this.miTurno = false
            this.tablero[data.f][data.c] = this.player
            this.$socket.client.emit('mover', {roomId: this.$store.state.roomId, f: data.f, c:data.c, player: this.player})
        }
    }
}
</script>

<style scoped>
    .tableContainer{
        width: 100vw;
        height: 100vh;
    }
</style>