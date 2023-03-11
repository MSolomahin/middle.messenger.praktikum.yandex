import Component from './component'
import { expect } from 'chai'
import { beforeEach } from 'mocha'
import { render } from '../../utils/renderDOM'

const sinon = require('sinon')

describe('Component', () => {
    const renderMock = sinon.fake.returns(document.createElement('div'))
    const componentDidMountMock = sinon.fake()

    class ComponentMock extends Component {
        render = renderMock
        componentDidMount = componentDidMountMock
    }

    beforeEach(() => {
        renderMock.callCount = 0
    })

    it('should call render after update props', () => {
        const ins = new ComponentMock({})

        ins.setProps({
            sr: 1
        })

        expect(renderMock.callCount).to.eq(1)
    })

    it('shouldn`t call render after update same props', () => {
        const ins = new ComponentMock({ sr: 1 })

        ins.setProps({
            sr: 1
        })

        expect(renderMock.callCount).to.eq(0)
    })

    it('should call componentDidMount method after mount to document', () => {
        const ins = new ComponentMock()

        render('#app', ins)

        expect(componentDidMountMock.callCount).to.eq(1)
    })
})
