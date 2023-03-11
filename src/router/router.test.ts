import Router from './index'
import { expect } from 'chai'
import Component from '../core/component'
import routes from '../assets/const/routing'
import { afterEach } from 'mocha'

const sinon = require('sinon')

describe('Router', () => {
    const origRoute = Router.route
    beforeEach(() => {
        Router.routes = []
        Router.currentRoute = null
        Router.route = sinon.fake()
        window.history.back = sinon.fake()
        window.history.forward = sinon.fake()
        window.history.pushState = sinon.fake()
    })

    afterEach(() => {
        Router.route = origRoute
    })
    const BlockMock = class extends Component {
    }

    it('Function navigate should call method route', () => {
        Router
            .addRoute(routes.auth, BlockMock)
            .addRoute(routes.registration, BlockMock)
            .addRoute(routes.messenger, BlockMock)
            .listen()

        Router.navigate(routes.messenger)

        expect((Router.route as any).callCount).to.eq(2)
    })

    it('Method addRoute should return Router instance', () => {
        const result = Router.addRoute(routes.auth, BlockMock)

        expect(result).to.eq(Router)
    })

    it('Router should have array of routes after initialise', () => {
        Router
            .addRoute(routes.auth, BlockMock)
            .addRoute(routes.messenger, BlockMock)

        expect(Router.routes.length).to.eq(2)
    })

    it('Method back should call window.history.back', () => {
        Router.back()

        expect((window.history.back as any).callCount).to.eq(1)
    })

    it('Method forward should call window.history.forward', () => {
        Router.forward()

        expect((window.history.forward as any).callCount).to.eq(1)
    })
})
