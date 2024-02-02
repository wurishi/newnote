// because of the way jest is configured by paypal-scripts, this file is
// accessible as if it were a node module. So you can do:
// import { render } from 'client-test-utils'
// this file re-exports react-testing-library, so you have access to all the
// utilities available to you in that project. You should use this file rather
// than react-testing-library.
import React from 'react'
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'

/**
 * This is the custom render method for tests in our app (as recommended by
 * react-testing-library).
 */
function render(ui, options) {
  const {
    route = '/',
    history = createHistory(createMemorySource(route)),
    ...renderOptions
  } = options || {} // render with all the same providers that our app component uses.
  // if we add more providers to our app, we should add a test version of them
  // here. And if our tests need to configure an aspect of those things,
  // then we should add those to the available options

  const utils = rtlRender(
    <React.Suspense fallback="__test_fallback__">
      <LocationProvider history={history}>
        <ThemeProvider theme={_THEME}>{ui}</ThemeProvider>
      </LocationProvider>
    </React.Suspense>,
    renderOptions,
  )
  return {
    ...utils,

    // override rerender so the rerender will render with our customizations.
    rerender(newUi) {
      return render(newUi, {
        container: utils.container,
        baseElement: utils.baseElement,
        route,
        history,
        ...options,
      })
    },

    history,
  }
}

function renderWithRedux(ui, { store, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(<ThemeProvider theme={_THEME}>{ui}</ThemeProvider>, {
    wrapper: Wrapper,
    ...renderOptions,
  })
}

export * from '@testing-library/react'
// Not sure why, but it appears that eslint-plugin-import is unable to track
// export * exports properly, so we'll manually export a few here.
export {
  fireEvent,
  wait,
  waitForElement,
  cleanup,
  flushEffects,
  screen,
  act,
} from '@testing-library/react'

export { render, renderWithRedux }
