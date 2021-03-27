export default {
  state: {
    cityList: [],
  },
  getters: {
    cities(state) {
      return state.cityList;
    },
    statusLoadCities(state) {
      return state.loading;
    },
  },
  mutations: {
    updateCityList(state, cities) {
      state.cityList = cities;
    },
  },
  actions: {
    async fetchСityList({ commit }) {
      fetch("https://60254fac36244d001797bfe8.mockapi.io/api/v1/city")
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `При загрузке данных возникли проблемы. Status: ${res.status}`
            );
          }

          return res.json();
        })
        .then((data) => {
          commit("updateCityList", data);
        });
    },
  },
};
