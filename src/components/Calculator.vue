<template>
    <div id="calculator">
        <div id="io-display">
            <input type="text" v-model="result" />
        </div>
        <div id="buttons-panel">
            <div class="panel-row">
                <input type="button" value="1" v-on:click="checkInput" />
                <input type="button" value="2" v-on:click="checkInput" />
                <input type="button" value="3" v-on:click="checkInput" />
            </div>
            <div class="panel-row">
                <input type="button" value="4" v-on:click="checkInput" />
                <input type="button" value="5" v-on:click="checkInput" />
                <input type="button" value="6" v-on:click="checkInput" />
            </div>
            <div class="panel-row">
                <input type="button" value="7" v-on:click="checkInput" />
                <input type="button" value="8" v-on:click="checkInput" />
                <input type="button" value="9" v-on:click="checkInput" />
            </div>
            <div class="panel-row">
                <input type="button" value="0" v-on:click="checkInput" />
                <input type="button" value="+" v-on:click="checkInput" />
                <input type="button" value="=" v-on:click="checkInput" />
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
        checkInput: function(event) {
            let value = event.srcElement.value;
            if (value === '+') {
                this.performCalculation = true;
                if (this.lastInputIsNumber) {
                    this.buffer += parseFloat(this.result);
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