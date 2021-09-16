<template>
    <div id="game-screen" class="center">
        <table class="center">
            <tr v-for="(fila, f) in tableData" :key="fila">
                <td v-for="(casilla, c) in fila" :key="casilla">
                    <button @click="seleccionarCasilla(f,c)" :disabled="tableroBloqueado || casilla!=0" type="button" :class="provideClass(casilla)" :id="`cell${f}${c}`">
                        {{ provideSymbol(casilla) }}
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: [[0,0,0],
                      [0,0,0],
                      [0,0,0]]
        },
        playerNumber: {
            type: Number,
            default: 1
        },
        isFinish: {
            type: Boolean,
            default: false
        },
        tableroBloqueado: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            emptyClass: {
                cell: true,
                cannotuse: this.isFinish
            },
            player1Class: {
                cell: true,
                cannotuse: true
            },
            player2Class: {
                cell: true,
                cannotuse: true,
                'player-two': true
            },
        }
    },
    methods: {
        provideSymbol(num){
            switch(num){
                case 1:
                    return 'X'
                case 2:
                    return 'O'
                default:
                    return ''
            }  
        },
        provideClass(num){
            if (this.playerNumber == num) return this.player1Class
            else if (this.playerNumber != num && num != 0) return this.player2Class
            return this.emptyClass 
        },
        seleccionarCasilla(f,c){
            this.$emit('selecciono', {f,c}) 
        }
    }
}
</script>

<style scoped>
    table {
        max-width: 420px;
        max-height: 420px;
        width: 85vw;  /* 85% of the viewport (body) width */
        height: 85vw;
        border-spacing: 4px 2px;  /* Space between cells */
    }

    td {
        padding: 0;
        width: 33%;  /* Every cell should be 1/3 of table height (and width) */
        height: 33%;
    }

    .cell {
        font-size: 8vmin;  /* Responsive font size! Awesome! */
        height: 100%;  /* Fill the container (td) */
        width: 100%;
    }

    .wincell {
        background-color: #c88;  /* Red background to highlight the "winning" line */
    }

    .player-two {
        color: #933;
    }

    button {
    cursor: pointer;  /* Visually show that you can interact with the button */
    border: none;  /* Hides default border (and color, for some reason */
    color: #333;
    }

    .center {
        margin: 0 auto;
    }
    .hidden {
        display: none;
    }
    .cannotuse {
        cursor: not-allowed;
    }

</style>