import Vue from 'vue'
import Revue from 'revue'
import {createStore} from 'redux'

import data from '../reducers/reducers'// create the logic how you would update the seller
import * as actions from '../actions/actions'// create some redux actions

const reduxStore = createStore(data);// create a redux store
const store = new Revue(Vue, reduxStore, actions);// binding the store to Vue instance, actions are optional
export default store;// expose the store for your component to use;
