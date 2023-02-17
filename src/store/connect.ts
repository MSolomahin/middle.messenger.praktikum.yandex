import store, { IStore, StoreEvents } from './index'
import isEqual from './helpers/isEqual'
import Component from '../core/component'
import cloneDeep from '../utils/cloneDeep'

type PlainObject<T = any> = {
  [k in string]: T
}

function connect<P extends PlainObject>(mapStateToProps: (state: IStore) => P) {
  return function (Block: typeof Component<any>) {
    return class extends Block {
      constructor(props?: any) {
        let state = mapStateToProps(store?.getState())

        super({ ...props, ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState())
          if (!isEqual<P>(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}

export const withUser = connect((state) => ({ user: cloneDeep(state?.user) }))

export default connect
