import { describe, it, expect, test, beforeEach } from 'vitest';
import CreateUser from '../CreateUser.vue';
import { mount } from '@vue/test-utils';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

describe("CreateUser", () => {
    let wrapper : any;

    beforeEach(() => {
        wrapper = mount(CreateUser, {
            global: {
                plugins: [BootstrapVue3],
            }
        });
    })

    it("renders correctly", () => {
        expect(wrapper.text()).toContain("Sign up");
    });

    test("validUsername returns false for 1 letter username", async () => {
        wrapper.vm.form.uname = "u";
        expect(wrapper.vm.validUsername).toBe(false);
    });

    test("validUsername returns true for valid username", async () => {
        wrapper.vm.form.uname = "username";
        expect(wrapper.vm.validUsername).toBe(true);
    });

    test("validUsername returns false for username with symbols", async () => {
        wrapper.vm.form.uname = "!#$<>";
        expect(wrapper.vm.validUsername).toBe(false);
    });

    test("Username input modifies equals uname", async () => {
        wrapper.get('input#usernameInput').setValue("TestUser");
        expect(wrapper.vm.form.uname).toMatch("TestUser");
    });

    test("Valid password input does not show error", async () => {
        wrapper.get('input#passwordInput').setValue("12345678");
        await wrapper.vm.$nextTick
        expect(wrapper.find('div#passInvalidFeedback').exists()).toBe(false);
    });

/*     test("Valid form calls api", async () => {
        wrapper.get('input#usernameInput').setValue("TestUser");
        wrapper.get('input#emailInput').setValue("test@email.com");
        wrapper.get('input#passwordInput').setValue("12345678");
        wrapper.get('input#repeatPassword').setValue("12345678");
    }); */
});