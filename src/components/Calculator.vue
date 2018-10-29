<template>
    <div id="calculator">
        <div id="io-display" class="ui large input">
            <input type="text" v-model="result" @keypress="processKeyPress" />
        </div>
        <div id="buttons-panel">
            <div class="panel-row">
                <button data-input="0" class="circular ui medium button" @click="processNumber('0')">0</button>
                <button data-input="1" class="circular ui medium button" @click="processNumber('1')">1</button>
                <button data-input="2" class="circular ui medium button" @click="processNumber('2')">2</button>
                <button data-input="3" class="circular ui medium button" @click="processNumber('3')">3</button>
            </div>
            <div class="panel-row">
                <button data-input="4" class="circular ui medium button" @click="processNumber('4')">4</button>
                <button data-input="5" class="circular ui medium button" @click="processNumber('5')">5</button>
                <button data-input="6" class="circular ui medium button" @click="processNumber('6')">6</button>
                <button data-input="7" class="circular ui medium button" @click="processNumber('7')">7</button>
            </div>
            <div class="panel-row">
                <button data-input="8" class="circular ui medium button" @click="processNumber('8')">8</button>
                <button data-input="9" class="circular ui medium button" @click="processNumber('9')">9</button>
            </div>
            <div class="panel-row">
                <button data-input="+" class="circular ui medium button" @click="performArithmetic('+')">
                    +
                </button>
                <button data-input="-" class="circular ui medium button" @click="performArithmetic('-')">
                    -
                </button>
                <button data-input="=" class="circular ui medium button" @click="performArithmetic('=')">
                    =
                </button>
                <button data-input="reset" class="circular ui medium button" @click="reset">
                    C
                </button>
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
            } else {
                // Take the most recent operator in a chain of
                // operators as the last
                this.lastOperator = operator;
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
#io-display {
    margin-bottom: 4px;
}

#io-display input {
    text-align: center;
    font-weight: bold;
}

.panel-row {
    margin-bottom: 2px;
}

.panel-row input {
    font-weight: bold;
}
</style>