import { describe, it, expect, test, beforeEach, afterEach } from 'vitest';
import RecipeDetailsModal from '../RecipeDetailsModal.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

describe("RecipeDetailsModal", () => {
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        wrapper = mount(RecipeDetailsModal, {
            global: {
                plugins: [BootstrapVue3],
            },
        });
    })

    it('no div', () => {
        expect(wrapper.find('div').exists()).toBe(false);
    });

    it('should be hidden by default', () => {
        expect(wrapper.isVisible()).toBe(false);
      });
      
});