import axios from "axios";

const state = {
    todos: []
}

const getters = {
    allTodos: function(state) {
        return state.todos    
    }, 
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );
        commit('setTodos', response.data)
    },
    async addTodos({ commit }, title) {
        console.log(888)
        const response = await axios.post(
            'https://jsonplaceholder.typicode.com/todos', 
            { title, completed: false}
        )   
        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
        commit('removeTodo', id);
      },

    async filterTodos({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].value)

        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        
        commit('filterTodo', response.data)
    },
    
    async updateTodo({commit}, updatedTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo
        );
        console.log(response.data)
        commit('updateTodo', updatedTodo)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
    filterTodo: (state, todos) => state.todos = todos,
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id == updatedTodo.id)
        if(index !== -1) {
          state.todos.splice(index, 1, updatedTodo)
        }
    } 

}

export default {
    state,
    getters,
    actions,
    mutations,
}
