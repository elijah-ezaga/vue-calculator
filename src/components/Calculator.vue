<template>
    <div id="calculator">
        <div id="io-display">
            <input type="text" v-model="result" />
        </div>
        <div id="buttons-panel">
            <div class="panel-row">
                <input type="button" value="1" @click="checkInput('1')" />
                <input type="button" value="2" @click="checkInput('2')" />
                <input type="button" value="3" @click="checkInput('3')" />
            </div>
            <div class="panel-row">
                <input type="button" value="4" @click="checkInput('4')" />
                <input type="button" value="5" @click="checkInput('5')" />
                <input type="button" value="6" @click="checkInput('6')" />
            </div>
            <div class="panel-row">
                <input type="button" value="7" @click="checkInput('7')" />
                <input type="button" value="8" @click="checkInput('8')" />
                <input type="button" value="9" @click="checkInput('9')" />
            </div>
            <div class="panel-row">
                <input type="button" value="0" @click="checkInput('0')" />
                <input type="button" value="+" @click="checkInput('+')" />
                <input type="button" value="=" @click="checkInput('=')" />
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
        checkInput: function(value) {
            if (value === '+') {
                this.performCalculation = true;
                if (this.lastInputIsNumber) {
                    this.buffer += parseFloat(this.result);
                    this.result = this.buffer;
                }

                this.lastInputIsNumber = false;
            } else if ( value >= 0 || value <= 9) {
                this.updateInput(value);
                this.lastInputIsNumber = true;
            } else if (value === '=') {
                this.result = this.buffer + parseFloat(this.result);
                this.buffer = ZERO;
                this.lastInputIsNumber = false;
            }
        },

        updateInput: function(value) {
            if (this.performCalculation) {
                this.result = value;
                this.performCalculation = false;
            }

            if (value === EMPTY || parseFloat(this.result) === ZERO) {
                this.result = value;
            } else {
                this.result += value;
            }
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