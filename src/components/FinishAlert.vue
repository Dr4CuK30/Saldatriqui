<template>
    <div class="dialog">
        <h1>{{ganador ? 'Has ganado :)' : 'Has perdido :('}}</h1>
        <button class="volver" @click="volver">Menu</button>
        <button class="siguiente" @click="jugarAgain">Jugar</button>
    </div>
</template>

<script>
export default {
    props: {
        ganador: {
            required: true,
            type: Boolean,
        }
    },
    methods: {
        jugarAgain(){
            this.$emit('jugarAgain')
        },
        volver(){
            this.$emit('volver')
        }
    }
}
</script>

<style scoped>
    .dialog {
        position: relative;
        background: rgba(0, 0, 0, 0.459);
        width: 20vw;
        margin-left: -100px;
        padding: 10px;
        height: 50%;
        margin-top: -100px;
        text-align: center;
        font-family: Righteous;
        background-color: rgba(255, 255, 255, 0.699);
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        font-size: 17px;
    }
    .dialog button{
        margin: 10px 10px 5px 10px;
        color: white;
        font-size: 15px;
        border: 0;
        padding: 3px 10px 3px 10px;
        cursor: pointer;
    }
    .siguiente {
        background-color: rgb(67, 184, 0);
    }
    .volver {
        background-color: rgb(219, 7, 7);
    }
</style>