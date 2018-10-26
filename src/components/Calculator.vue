<template>
    <div id="calculator">
        <div id="io-display">
            <input type="text" v-model="result" @keypress="processKeyPress" />
        </div>
        <div id="buttons-panel">
            <div class="panel-row">
                <input type="button" value="1" @click="processNumber('1')" />
                <input type="button" value="2" @click="processNumber('2')" />
                <input type="button" value="3" @click="processNumber('3')" />
            </div>
            <div class="panel-row">
                <input type="button" value="4" @click="processNumber('4')" />
                <input type="button" value="5" @click="processNumber('5')" />
                <input type="button" value="6" @click="processNumber('6')" />
            </div>
            <div class="panel-row">
                <input type="button" value="7" @click="processNumber('7')" />
                <input type="button" value="8" @click="processNumber('8')" />
                <input type="button" value="9" @click="processNumber('9')" />
            </div>
            <div class="panel-row">
                <input type="button" value="0" @click="processNumber('0')" />
                <input type="button" value="+" @click="processPlus" />
                <input type="button" value="=" @click="processEqual" />
            </div>
            <div class="panel-row">
                <input type="button" value="C" v-on:click="clearInput" />
            </div>
        </div>
    </div>
</template>

<script>
const ZERO = 0;
const EMPTY = '';

export default {
    name: 'Calculator',
    data: function() {
        return {
            input: EMPTY,
            buffer: ZERO,
            result: EMPTY,
            performCalculation: false,
            lastInputIsNumber: false
        }
    },
    methods: {
        processKeyPress: function(event) {
            event.preventDefault();

            let character = event.key;
            if (isNaN(character)) {
                if (character === '+'){
                    this.processPlus();
                } else if (character === '=') {
                    this.processEqual();
                } else if(event.keyCode === 13) {
                    this.processEqual();
                }
            } else {
                this.processNumber(character);
            }
        },

        processPlus: function() {
            this.performCalculation = true;
            if (this.lastInputIsNumber) {
                this.buffer += parseFloat(this.result);
                this.result = this.buffer;
            }

            this.lastInputIsNumber = false;
        },

        processEqual: function() {
            this.result = this.buffer + parseFloat(this.result);
            this.buffer = ZERO;
            this.lastInputIsNumber = false;
        },

        processNumber: function(value) {
            if (this.performCalculation) {
                this.result = value;
                this.performCalculation = false;
                this.lastInputIsNumber = true;
                return;
            }

            if (value === EMPTY || parseFloat(this.result) === ZERO) {
                this.result = value;
            } else {
                this.result += value;
            }

            this.lastInputIsNumber = true;
        },

        clearInput: function() {
            this.result = EMPTY;
            this.buffer = ZERO;
            this.performCalculation = false;
        }
    }
}
</script>

<style scoped>
#io-display input {
    text-align: center;
    font-weight: bold;
}

.panel-row input {
    font-weight: bold;
}
</style>