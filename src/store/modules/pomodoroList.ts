import moment from 'moment';
import fs from 'fs';
import Vue from 'vue';
import {Module} from 'vuex';


const state =  {
  all: [{
    timestamp: 0,
    message: '',
    color: 'white',
    blank: true,
  }],
};

const actions = {
  push({ commit }, pomodoro) {
    commit('pushPomodoro', pomodoro);
    commit('dump');
  },
  dump({ commit }) {
    commit('dump');
  },
  pop({ commit }, pomodoro) {
    commit('popPomodoro', pomodoro);
  },
};

const mutations = {
  pushPomodoro(_state, pomodoro) {
    pomodoro.color! = pomodoro.color;
    if (pomodoro.color === 'white' && _state.all.length) {
      const popPomodoro = _state.all.pop();
      if ( popPomodoro.color !== 'white') {
        _state.all.push(popPomodoro);
      }
    }
    pomodoro.timestamp = pomodoro.timestamp ? pomodoro.timestamp : moment().format();
    pomodoro.message = pomodoro.message ? pomodoro.message : '';
    pomodoro.blank = pomodoro.blank ? pomodoro.blank : false;
    _state.all.push(pomodoro);
  },
  popPomodoro(_state, pomodoro) {
    if (_state.all.length) {
      _state.all.pop();
    }
  },
  dump(_state) {
    const json = JSON.stringify({
      table: _state.all,
    }, null, 4);
    fs.writeFile('./record.json', json, 'utf8', (error) => {});
  },
};

export default  {
  namespaced: true,
  state,
  actions,
  mutations,
};
