import isEqual from '../../utils/isEqual'
import Component from '../component'
import store, { Indexed, StoreEvents } from './store'

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Block: typeof Component) {
    return class extends Block {
      constructor(props?: any) {
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState())

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}

export const withChats = connect((state) => ({ chats: state.chats }))
export const withUser = connect((state) => ({ user: state.user }))

export default connect
