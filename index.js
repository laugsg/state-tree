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
    /** Data _entrypoint_ to State
     * implements a reducer to drive changes to state 
     * based in action events. 
     * fires subscriptions as notifying updates.
     */
    const dispatch = (action) => {
        /** Reducer
         * external exposure of state
         * to let users _handle_ which data
         * will be stored.
         */
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

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action Creators
function addTodoAction(todo){
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id
    }
}

// reducers _handler_ : drive changes to state based in actions
function todos (state = [], action){
    // actions : data event
    switch( action.type ){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter( todo => todo.id !== action.id )
        case TOGGLE_TODO:
            return state.map( todo => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state
    }
}

function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter( goal => goal.id !== action.id)
        default:
            return state
    }
}

function App (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


const store = createStore(App)
store.subscribe(() => {
    console.log(`The new state is: `, store.getState())
})

// const unsubscribe = store.subscribe(() => {
//     console.log(`The store changed.`)
// })
// unsubscribe()

// dispatch _entrypoint_
store.dispatch(addTodoAction({
    id: 0,
    name: "Learn React",
    complete: false
}))

store.dispatch(addTodoAction({
    id: 1,
    name: "Learn Redux",
    complete: false
}))

store.dispatch(removeTodoAction(0))

store.dispatch(toggleTodoAction(1))

store.dispatch(addGoalAction({
    id: 0,
    name: "React Dev"
}))

store.dispatch(addGoalAction({
    id: 1,
    name: "Redux Dev"
}))

store.dispatch(removeGoalAction(0))