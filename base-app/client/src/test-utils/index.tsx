import { render as rtlRender, RenderResult, RenderOptions } from "@testing-library/react"
import { ReactElement } from "react"
import { Provider } from "react-redux"
import { createMemoryHistory, MemoryHistory } from "history"
import { Router } from "react-router"

import { configureStoreWithMiddlewares, RootState } from "../app/store"

type CustomRenderOptions = {
    preloadedState?: RootState
    routeHistory?: Array<string>
    initialRouteIndex?: number
    renderOtions?: Omit<RenderOptions, "wrapper">
}

type CustomRenderResults = RenderResult & { history: MemoryHistory }

function render(
    ui: ReactElement, 
    {preloadedState = {}, routeHistory, initialRouteIndex,  ...renderOptions} = {}): CustomRenderResults {
        const history = createMemoryHistory({
            initialEntries: routeHistory,
            initialIndex: initialRouteIndex,
        })
        const Wrapper: React.FC = ({children}) => {
            const store = configureStoreWithMiddlewares(preloadedState)
            return (<Provider store = {store}>
                <Router history={history}>{children}</Router>
                </Provider>)
        }
        const rtlRenderObject = rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
        return { ...rtlRenderObject, history }
    }

    export * from "@testing-library/react"
    export { render }