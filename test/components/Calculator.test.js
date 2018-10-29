import Calculator from '../../src/components/Calculator.vue'
import { mount } from '@vue/test-utils'

describe('Vue Calculator', () => {

    /**
     * @returns A button bearing some text on it.
     */
    const findButton = (wrapper, text) => wrapper.find('input[value="' + text + '"');

    /**
     * Simulate click on a button.
     */
    const clickButton = button => button.trigger('click');

    /**
     * Simulate click reset button
     */
    const reset = wrapper => clickButton(findButton(wrapper, 'Reset'));

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

});