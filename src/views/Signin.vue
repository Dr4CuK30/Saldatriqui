<template>
    <head>
        <title>Ingresar</title>
    </head>
    <div class="credits">
        <h1 class="title">SaldaTriqui</h1>
        <h3 class="integrantes">by: Grupito de Modelos II</h3>
    </div>
    <form class="loginForm">
        <h2>Ingresar</h2>
        <input placeholder="Usuario" v-model="user" ><br>
        <input placeholder="Contraseña" type="password" v-model="password"><br>
        <button type="button" @click="login">Entrar</button>
    </form>
</template>

<script>
import authService from "../services/auth"
export default {
    data(){
        return {
            user: null,
            password: null,
        }
    },
    beforeCreate(){
        this.$store.commit('logout');
    },
    methods: {
        async login(){
            if(await authService.login(this, this.user, this.password)) this.$router.push('menu')
            else console.log("no entro")
        }
    }
}
</script>

<style scoped>
    .title{
        background: linear-gradient(to bottom, #eddb57, #efbd41, #ee9e35, #ea7f32, #e15f35);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Righteous;
        font-size: 60px;
        font-weight: bold;
    }
    .credits{
        padding-top: 10vh;
        width: 100%;
        text-align: center;
    }

    .integrantes{
        color: rgb(204, 133, 0);
        font-family: Righteous;
    }

    .loginForm{
        background: rgba(0, 0, 0, 0.342);
        margin-top: 15vh;
        text-align: center;
        margin-left: 35%;
        margin-right: 35%;
        border-radius: 5px;
        padding-top: 2px;
        padding-bottom: 30px;
    }

    .loginForm h2{
        font-family: Righteous;
        color: white;
        font-size: 35px;
    }

    .loginForm input{
        border: 0;
        font-size: 25px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 7px;
        border-radius: 5px;
        padding-top: 4px;
        padding-bottom: 4px;
        width: 60%;
    }

    .loginForm button{
        border: 0;
        color: white;
        font-family: Righteous;
        background-color: rgb(89, 161, 18);
        font-size: 20px;
        margin-top: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 15px;
        padding-right: 15px;
        cursor: pointer;
    }

    .loginForm button:focus{
        background-color: rgb(47, 93, 0);
    }
</style>