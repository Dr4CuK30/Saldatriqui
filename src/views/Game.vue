<template>
    <div class="page">
        <div class="game">
            <div class="stats">
                <h1 v-if="playersData.length == 2">
                    <b class="p1">{{playersData[0].puntuacion}} - {{playersData[0].usuario}}</b> : <b class="p2">{{playersData[1].usuario}} - {{playersData[1].puntuacion}}</b>
                </h1>
            </div>
            <div class="tableContainer">
                <GameTable :tableroBloqueado="!miTurno || winner" @selecciono="jugarTurno" :playerNumber="player" :tableData="tablero"/>
            </div>
            <div class="options">
                <button @click="volver" class="exit-btn">Salir</button>
            </div>
        </div>
        <div class="chat">
            <div class="chat-header">
                <h2 class="chat-title">Room Chat</h2>
                <hr>
            </div>
            <div class="messages">
                <div :class="messageStyleProvider(message.playerNum)" v-for="(message, index) in messages" :key="message">
                    <span v-if="validateTitleMsg(index, message.playerNum)">{{message.usuario}}:</span>
                    <p>{{message.content}}</p>
                </div>
            </div>
            <div class="msg-input">
                <hr>
                <input v-model="chatText" @keyup.enter="sendMessage">
                <button @click="sendMessage">
                    <font-awesome-icon icon="chevron-right" class="reloadIcon"/>
                </button>
            </div>
        </div>
    </div>
    <!-- Elementos flotantes -->
    <div v-if="winner" class="centerpoint">
        <FinishAlert :ganador="winner == player" @volver="volver" @jugarAgain="jugarAgain"/>
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
            chatText: '',
            roomId: '',
            tablero: [[0,0,0],
                      [0,0,0],
                      [0,0,0]],
            playersData: [],
            miTurno: false,
            player: null,
            winner: null,
            turnoDe: 3,
            messages: [
                {
                    usuario: null,
                    playerNum: 3,
                    content: 'hurtado se ha unido a la sala',
                    date: Date.now()
                },
                {
                    usuario: 'davids',
                    playerNum: 1,
                    content: 'hola mamabichos',
                    date: Date.now()
                },
            ]
        }
    },
    created(){
        this.$socket.client.emit('cargarData', {roomId: localStorage.getItem('roomId')})
        this.roomId = localStorage.getItem('roomId')
        if(localStorage.getItem('token').split('.')[1] == this.roomId){
            this.player = 1
            this.miTurno = true
        }else this.player = 2
        this.$socket.$subscribe('loadPlayersData', payload => {
            this.playersData = payload.players
            this.messages = payload.chat
        })
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
                playerId: this.$store.state.userData.uid, 
                roomId: this.roomId
            })
            localStorage.removeItem('roomId')
            this.$router.push('/menu')
        },
        jugarAgain(){
            this.turnoDe = 3
            this.winner = null
            this.$socket.client.emit('reiniciar', {roomId: this.roomId, playerId: this.player})
        },
        messageStyleProvider(num){
            let classes = {'message': true}
            if(num == this.player){
                classes['player-msg'] = true
            } else if (num == 3){
                classes['server-msg']= true
            } else {
                classes['opponent-msg'] = true
            }
            return classes
        },
        validateTitleMsg(index, msgPlayerNum){
            if(msgPlayerNum == 3) return false
            if(index == 0) return true
            return(index > 0 && this.messages[index-1].playerNum != msgPlayerNum) 
        },
        sendMessage(){
            this.$socket.client.emit('enviarMensaje', {
                roomId: this.roomId,
                playerNum: this.player,
                usuario: this.$store.state.userData.usuario,
                content: this.chatText
            })
            this.chatText = ''
        }
    }
}
</script>

<style scoped>
    .centerpoint {
        top: 53%;
        left: 42%;
        position: absolute;
    }
    .tableContainer{
        padding-top: 50px;
        width: 100%;
        height: 70%;
    }
    .game{
        width: 75vw;
        height: 100vh;
    }
    .options{
        height: 15%;
        background: rgba(0, 0, 0, 0.425);
        text-align: center;
        padding-top: 30px;
    }
    .stats{
        height: 15%;
        background: rgba(0, 0, 0, 0.425);
        text-align: center;
        padding-top: 25px 
    }
    .chat{
        padding: 15px;
        width: 25vw;
        height: 100vh;
        background: #0000006c;
        color: white
    }
    .page{
        display: flex;
        font-family: Righteous;
    }
    .stats h1{
        font-size: 45px;
        color: white;
    }
    .p1{
        color: rgb(204, 133, 0);
    }
    .p2{
        color: rgb(89, 161, 18);
    }
    .exit-btn{
        background-color: red;
        color: white;
        font-size: 30px;
        padding: 7px 20px;
    }
    .exit-btn:hover{
        background-color: rgb(197, 0, 0);
    }
    .chat-title{
        text-align: center;
        color: rgb(204, 133, 0);
    }
    hr{
        display: block; height: 1px;
        border: 0; border-top: 1px solid rgb(124, 124, 124);
        margin: 1em 0; padding: 0;
    }
    .chat-header{
        height: 8%;
    }
    .messages{
        height: 83%;
        overflow-y: scroll;
        padding-right: 10px;
    }
    .msg-input input{
        border: 0;
        font-size: 22px;
        padding: 3px 5px;
        border-radius: 5px;
        width: 85%;
        outline: none;
    }
    .msg-input button{
        width: 15%;
        height: 25PX;
        background: rgb(89, 161, 18);
        color: white;
    }
    .msg-input button:hover{
        background: rgb(70, 126, 13);
    }
    button{
        border: 0;
        border-radius: 7px;
        cursor: pointer;
    }
    .opponent-msg{
        
    }
    .opponent-msg span{
        color: rgb(70, 126, 13);
    }

    .server-msg{
        text-align: center;
        background-color: black;
        color: gray;
        padding: 2px;
    }

    .player-msg{
        text-align: end;
    }
    .player-msg span{
        color: rgb(204, 133, 0);
    }
    .message{
        margin: 7px 0px;
    }

    ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    }
    ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
    }
    ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
    }
    ::-webkit-scrollbar-thumb:active {
    background: #000000;
    }
    ::-webkit-scrollbar-track {
    background: #666666;
    border: 0px none #ffffff;
    border-radius: 50px;
    }
    ::-webkit-scrollbar-track:hover {
    background: #666666;
    }
    ::-webkit-scrollbar-track:active {
    background: #333333;
    }
    ::-webkit-scrollbar-corner {
    background: transparent;
    }
</style>