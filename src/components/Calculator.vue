<template>
    <div id="calculator">
        <div id="io-display">
            <input type="text" v-model="result" @keypress="processKeyPress" />
        </div>
        <div id="buttons-panel">
            <div class="panel-row">
                <input type="button" value="0" @click="processNumber('0')" />
                <input type="button" value="1" @click="processNumber('1')" />
                <input type="button" value="2" @click="processNumber('2')" />
                <input type="button" value="3" @click="processNumber('3')" />
            </div>
            <div class="panel-row">
                <input type="button" value="4" @click="processNumber('4')" />
                <input type="button" value="5" @click="processNumber('5')" />
                <input type="button" value="6" @click="processNumber('6')" />
                <input type="button" value="7" @click="processNumber('7')" />
            </div>
            <div class="panel-row">
                <input type="button" value="8" @click="processNumber('8')" />
                <input type="button" value="9" @click="processNumber('9')" />
                <input type="button" value="Reset" @click="reset" />
            </div>
            <div class="panel-row">
                <input type="button" value="+" @click="performArithmetic('+')" />
                <input type="button" value="-" @click="performArithmetic('-')" />
                <input type="button" value="=" @click="performArithmetic('=')" />
            </div>
        </div>
    </div>
</template>

<script>
const ZERO = 0;
const EMPTY = '';
const PLUS = '+';
const MINUS = '-';
const EQUAL = '=';

export default {
    name: 'Calculator',
    data: function() {
        return {
            buffer: ZERO,
            result: EMPTY,
            performCalculation: false,
            lastOperator: null,
            lastInputIsNumber: false
        }
    },
    methods: {
        processKeyPress: function(event) {
            event.preventDefault();

            let character = event.key;
            if (isNaN(character)) {
                if (character === PLUS || character === MINUS){
                    this.performArithmetic(character);
                } else if (character === EQUAL || event.keyCode === 13) {
                    this.performArithmetic(EQUAL);
                }
            } else {
                this.processNumber(character);
            }
        },

        performArithmetic: function(operator) {
            this.performCalculation = true;
            if (this.lastInputIsNumber || this.lastOperator === EQUAL) {
                this.performLastArithmetic(operator);
                this.result = this.buffer;
            }

            this.lastInputIsNumber = false;
        },

        performLastArithmetic: function(operator) {
            switch (this.lastOperator) {
                case PLUS:
                    this.buffer += parseFloat(this.result);
                    break;
                case MINUS:
                    this.buffer -= parseFloat(this.result);
                    break;
                case EQUAL:
                    // No operation
                    break;
                default:
                    this.buffer = this.result * 1;
            }

            this.lastOperator = operator;
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

        reset: function() {
            this.result = EMPTY;
            this.buffer = ZERO;
            this.performCalculation = false;
            this.lastInputIsNumber = false;
            this.lastOperator = null;
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