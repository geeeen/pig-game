import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";

describe("Home.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store({
    state: {
      score: [0, 0]
    },
    getters: {
      score: state => state.score
    },
    mutations: {
      setScore: state => {
        state.score = [120, 0];
      }
    }
  });
  const wrapper = shallowMount(Home, {
    localVue,
    store
  });

  it("disable buttons", done => {
    expect(wrapper.find(".newGame").attributes("disabled")).toBe(undefined);
    expect(wrapper.find(".rollDice").attributes("disabled")).toBe(undefined);
    expect(wrapper.find(".hold").attributes("disabled")).toBe(undefined);

    wrapper.find(".rollDice").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".newGame").attributes("disabled")).toBe("disabled");
      expect(wrapper.find(".rollDice").attributes("disabled")).toBe("disabled");
      expect(wrapper.find(".hold").attributes("disabled")).toBe("disabled");
      done();
    });
  });

  it("show dice", done => {
    wrapper.vm.dice = 1;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("#dice").attributes("style")).toBe("");
      done();
    });
  });

  it("show final alert", done => {
    expect(wrapper.find(".alertWindow").exists()).toBe(false);
    store.commit("setScore");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".alertWindow").exists()).toBe(true);
      done();
    });
  });
});
