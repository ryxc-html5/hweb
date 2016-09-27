import Vue from 'vue'
import Revue from 'revue'
import {createStore} from 'redux'

import seller from '../reducers/reducers'// create the logic how you would update the seller
import * as actions from '../actions/actions'// create some redux actions

const reduxStore = createStore(seller);// create a redux store
const store = new Revue(Vue, reduxStore, actions);// binding the store to Vue instance, actions are optional
export default store;
