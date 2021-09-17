<template>
    <div class="dialog">
        <h1>{{mensaje}}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            mensaje: 'Buscando'
        }
    },
    created(){
        this.animar()
    },
    methods: {
        animar(){
            setInterval(()=>{
                this.mensaje+='.'
                if(this.mensaje.length == 12) this.mensaje = 'Buscando'
            },500)
        }
    }
}
</script>

<style scoped>
    .dialog{
        background: rgba(0, 0, 0, 0.459);
        color: white;
        font-family: Righteous;
        font-size: 20px;
        font-weight: bold;
        position: relative;
        width: 300px;
        margin-left: -225px;
        height: 100px;
        margin-top: -100px;
        padding: 20px;
        text-align: center;
    }
</style>