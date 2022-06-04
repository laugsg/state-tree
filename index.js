// Library Code
function createStore(reducer){
    // The store should have 4 parts
    // 1. The state
    // 2. Get the state
    // 3. Listen for changes on the state
    // 4. Update the state

    // 1. The state
    let state
    let listeners = []

    // 2. Get the state
    const getState = () => state

    // 3. Listen for changes on the state
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter( l => l !== listener )
        }
    }

    // 4. Update the state
    /** dispatch
     * Entrypoint of the state,
     * implements a reducer for predictability.
     * Then fires all subscriptions to notify updates.
     */
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach( listener => listener())
    }

    /** return an object with properties 
     * Allow users to interact with the store.
     * 1. Give the user the ability to get the state
     */
    return {
        getState,
        subscribe,
        dispatch
    }
}



// App Code
// reducers : updates handler based in action events (user interface)
function todos (state = [], action){
    // actions event data driven
    switch( action.type ){
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter( todo => todo.id !== action.id )
        case 'TOGGLE_TODO':
            return state.map( todo => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state
    }
}

function goals (state = [], action){
    switch(action.type){
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter( goal => goal.id !== action.id)
        default:
            return state
    }
}


const store = createStore(todos)
store.subscribe(() => {
    console.log(`The new state is: `, store.getState())
})

const unsubscribe = store.subscribe(() => {
    console.log(`The store changed.`)
})
unsubscribe()

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 0,
        name: "Learn React"
    },
    complete: false
})