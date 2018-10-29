import Calculator from '../../src/components/Calculator.vue'
import { mount } from '@vue/test-utils'

describe('Vue Calculator', () => {

    /**
     * @returns A button bearing some text on it.
     */
    const findButton = (wrapper, text) => wrapper.find('button[data-input="' + text + '"');

    /**
     * Simulate click on a button.
     */
    const clickButton = button => button.trigger('click');

    /**
     * Simulate click reset button
     */
    const reset = wrapper => clickButton(findButton(wrapper, 'reset'));

    /**
     * Execute an arithmetic expression from inputs
     * @param {*} inputs Array of numeric and operator inputs in sequence
     *                   e.g. [1,+,2]
     */
    const executeExpression = (wrapper, inputs) => {
        for (let i = 0; i < inputs.length; ++i) {
            clickButton(findButton(wrapper, inputs[i]));
        }

        clickButton(findButton(wrapper, '='));
    }

    /**
     * Test that numeric inputs with length
     * at least 2 should not start with 0.
     */
    it('Numeric inputs should not start with zero', () => {
        const wrapper = mount(Calculator);

        // test that 000 -> 0
        const zeroButton = findButton(wrapper, '0');
        clickButton(zeroButton);
        clickButton(zeroButton);
        clickButton(zeroButton);
        // preferred to asserting the value on the text input UI
        expect(wrapper.vm.result).toBe('0');
        expect(wrapper.vm.result.length).toBe(1);

        // test that 001 -> 1
        reset(wrapper);
        clickButton(zeroButton);
        clickButton(zeroButton);
        clickButton(findButton(wrapper, '1'));
        expect(wrapper.vm.result).toBe('1');
        expect(wrapper.vm.result.length).toBe(1);
    });

    /**
     * Test that entering 1 + x 5 is interpreted as 1 x 5.
     * This could happen if user made mistake or changed his
     * mind.
     */
    it('Should honour last operator in chain', () => {
        const wrapper = mount(Calculator);

        // 4 + 5 - 2 = 1
        let inputs = ['4', '+', '-', '5', '-', '+', '2'];
        executeExpression(wrapper, inputs);
        expect(wrapper.vm.result).toBe(1);

        // 100 - 30 + 20 - 85 = 5
        reset(wrapper);
        inputs = ['1', '0', '0', '-', '3', '0', '+', '2', '0', '-', '+', '-', '8', '5'];
        executeExpression(wrapper, inputs);
        expect(wrapper.vm.result).toBe(5);
    })

});