import React, { useCallback, useRef } from 'react'
import { combineReducers, createStore } from 'redux'
import {
  cleanup,
  fireEvent,
  renderWithRedux,
  act,
} from '../../../../../test/client-test-utils'
import { deepCopy } from '../../../../utils/utilizations'
import appReducer from '../../../../reducers/appReducer'
import CMMControlBar from '../CMMControlBar'
import advancedGraphReducer from '../../../../reducers/advancedGraphReducer'
import circularGraphReducer from '../../../../reducers/circularGraphReducer'
import { setMessage } from '../../../../actions/messageBoxAction'
import { circularMoneyMovement } from '../../../../api/translate'
import CIRCULAR_GRAPH from '../constants'
import { getCircularGraphRequest } from '../../../../api/graphApi'

const ContextWrap = () => {
  const ref = useRef()
  const cmmRef = useRef()
  const applyFn = useCallback(() => {
    if (cmmRef.current) {
      cmmRef.current.applyFunction()
    }
  }, [])
  return (
    <>
      <div ref={ref} className="narrative" />
      <CMMControlBar
        ref={cmmRef}
        circleNarrativeRef={ref}
        narrativeClassName="narrative"
      />
      <button id="apply" onClick={applyFn}>
        apply
      </button>
    </>
  )
}

jest.mock('../../../../hooks/bindDispatch', () => ({
  bindDispatch: jest.fn((creators, dispatch) => {
    const bindMaps = {}
    Object.keys(creators).forEach(key => {
      const creator = creators[key]
      if (typeof creator === 'function') {
        bindMaps[key] = (...args) => creator(...args)(dispatch)
      }
    })
    return bindMaps
  }),
}))
jest.mock('../../../../selectors/graphSelector', () => ({
  getNodes: jest.fn(() => []),
  getSeedAccounts: jest.fn(() => []),
  getResetGraphState: jest.fn(() => false),
  getIsLinkingReturn: jest.fn(() => true),
  getDispatchByGraphMode: jest.fn(() => ({
    updateTimebar: 'UPDATE_TIMEBAR_CMM',
  })),
  getTransactionGraphData: jest.fn(() => ({ accountCoordinates: [] })),
  getGraphData: jest.fn(() => ({
    appliedGlobalFilter: {},
    appliedGlobalFilterBackup: {},
  })),
}))
jest.mock('../../../../selectors/filterSelector', () => ({
  getGlobalFilter: jest.fn(() => ({
    nodeFilter: {},
    cryptoFilter: {},
    txnEdgeFilter: {
      startTime: '',
      endTime: '',
    },
    profileLinkingEdgeFilter: {},
    graphFilter: {},
    onGraphFilter: {},
    accountTaggingFilter: {},
  })),
  getRequestId: jest.fn(() => ''),
}))
jest.mock('../../../../actions/messageBoxAction', () => ({
  setMessage: jest.fn(() => () => ({ type: 'MOCK_setMessage' })),
}))
jest.mock('../../../../api/translate', () => ({
  circularMoneyMovement: {
    getValidNodesOnGraph: jest.fn(() => []),
    getGraphQuery: jest.fn(() => ({})),
    getGraphData: jest.fn(() => ({
      errorCode: 404,
      messsage: 'error message',
    })),
  },
}))
jest.mock('../../../../api/graphApi', () => ({
  getCircularGraphRequest: jest.fn(() => ({
    then: () => ({}),
  })),
}))

const waitTime = timeout => new Promise(resolve => setTimeout(resolve, timeout))

const reducers = combineReducers({
  appReducer,
  advancedGraphReducer,
  circularGraphReducer,
})

const _initState = {
  appReducer: {
    userRolesFilter: {},
  },
  advancedGraphReducer: {
    isAdvancedGraphOn: false,
  },
  circularGraphReducer: {
    isCircularGraphOn: true,
    selectedSubCircleIndex: -1,
    isShowNarrative: true,
    paymentInterval: 'all',
  },
}

let storeState = null
beforeEach(() => {
  storeState = deepCopy(_initState)
})

afterEach(() => {
  cleanup()
  jest.unmock()
  jest.clearAllMocks()
})

jest.useFakeTimers()

describe('test CMMControlBar', () => {
  it('1. should render cmm mini', () => {
    storeState.circularGraphReducer.isCircularGraphOn = false
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    const CMM = container.querySelector('.cmm-control-bar--mini')
    expect(CMM).toBeInTheDocument()
  })

  it('2. should render CircleNarrative', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    let narrative = container.querySelector('.narrative')
    expect(narrative).toBeInTheDocument()
    expect(narrative).toHaveClass('narrative')
  })

  it('3. CircleNarrative show/hide', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    const narrative = container.querySelector('.narrative .circle-narrative')
    expect(narrative).toBeInTheDocument()

    const narrativeToggleButton = container.querySelector(
      '.cmm-control-bar__narrative',
    )
    expect(narrativeToggleButton).toHaveClass(
      'cmm-control-bar__narrative--active',
    )

    act(() => {
      fireEvent.click(narrativeToggleButton)
      jest.advanceTimersByTime(1000)
    })
    expect(narrative).toHaveClass('circle-narrative--hidden')
    expect(narrativeToggleButton).not.toHaveClass(
      'cmm-control-bar__narrative--active',
    )

    act(() => {
      fireEvent.click(narrativeToggleButton)
      jest.advanceTimersByTime(1000)
    })
    expect(narrative).toHaveClass('circle-narrative')
    expect(narrativeToggleButton).toHaveClass(
      'cmm-control-bar__narrative--active',
    )
  })

  it('4. click CircleNarrative close icon should hide', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    const narrative = container.querySelector('.narrative .circle-narrative')
    expect(narrative).toBeInTheDocument()

    act(() => {
      fireEvent.click(
        container.querySelector(
          '.narrative .circle-narrative__title__close-icon',
        ),
      )
      jest.advanceTimersByTime(1000)
    })
    expect(narrative).toHaveClass('circle-narrative--hidden')
    expect(
      container.querySelector('.cmm-control-bar__narrative'),
    ).not.toHaveClass('cmm-control-bar__narrative--active')
  })

  it('5. should show payment interval menu', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    dom.baseElement.className = 'galaxi-app'
    const { container } = dom
    const num = container.querySelector('.cmm__daterange--num')
    expect(num).toHaveTextContent('All')
    act(() => {
      fireEvent.click(container.querySelector('.cmm-control-bar__daterange'))
      jest.advanceTimersByTime(1000)
    })
    const menuList = dom.baseElement.querySelectorAll(
      '.cmm-control-bar__daterange__popover--item',
    )
    expect(menuList).toHaveLength(3)
    act(() => {
      fireEvent.click(menuList[1])
      jest.advanceTimersByTime(100)
    })
    expect(num).toHaveTextContent('7')
  })

  it('6. change CircleNarrative selected', () => {
    storeState.circularGraphReducer.topNSubCircleGraphs = [
      { info: 'info1' },
      { info: 'info2' },
      { info: 'info3' },
    ]
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    const narrative = container.querySelector('.narrative .circle-narrative')
    expect(narrative).toBeInTheDocument()

    const list = container.querySelectorAll(
      '.narrative .circle-narrative .circle-narrative__list .circle-narrative__list__item',
    )
    expect(list).toHaveLength(3)

    act(() => {
      fireEvent.click(list[0])
      jest.advanceTimersByTime(100)
    })
    expect(list[0]).toHaveClass('circle-narrative__list__item--selected')

    const reset = container.querySelector(
      '.narrative .circle-narrative .circle-narrative__list-title__reset',
    )
    expect(reset).toBeInTheDocument()

    act(() => {
      fireEvent.click(reset)
    })
    expect(list[0]).not.toHaveClass('circle-narrative__list__item--selected')
  })

  it('7. close CMM', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('.pp-icon--add'))
      jest.advanceTimersByTime(100)
    })
    expect(
      container.querySelector('.cmm-control-bar--mini'),
    ).toBeInTheDocument()
  })

  it('8. should throw error when nodes length == 0', () => {
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
      jest.advanceTimersByTime(100)
    })
    expect(setMessage).lastCalledWith({
      message: CIRCULAR_GRAPH.ALERTS.CIRCULAR_ERROR.MESSAGES,
      type: 'warning',
    })
  })

  it('9. should throw error when nodes length == 1', () => {
    circularMoneyMovement.getValidNodesOnGraph.mockImplementation(() => [1])
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
      jest.advanceTimersByTime(100)
    })
    expect(setMessage).lastCalledWith({
      message: CIRCULAR_GRAPH.ALERTS.CIRCULAR_ERROR.MESSAGES,
      type: 'warning',
    })
  })

  it('10. getCircularGraphRequest should be called', () => {
    circularMoneyMovement.getValidNodesOnGraph.mockImplementation(() => [1, 2])
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
      jest.advanceTimersByTime(100)
    })
    expect(getCircularGraphRequest).toBeCalled()
  })

  it('11. catch error', async () => {
    jest.useRealTimers()
    circularMoneyMovement.getValidNodesOnGraph.mockImplementation(() => [1, 2])
    getCircularGraphRequest.mockImplementation(
      () =>
        new Promise(() => {
          throw new Error('err')
        }),
    )
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
    })
    expect(getCircularGraphRequest).toBeCalled()
    await waitTime(10)
    expect(setMessage).toBeCalledWith({ message: 'err', type: 'error' })
  })

  it('12. no data', async () => {
    jest.useRealTimers()
    circularMoneyMovement.getValidNodesOnGraph.mockImplementation(() => [1, 2])
    getCircularGraphRequest.mockImplementation(() => ({
      then: () => ({
        fullCircleGraph: {},
      }),
    }))
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
    })
    await waitTime(10)
    expect(setMessage).toBeCalledWith({
      type: 'warning',
      message: CIRCULAR_GRAPH.ALERTS.NO_DATA.MESSAGES,
    })
  })

  it('13. should restore paymentinterval', async () => {
    jest.useRealTimers()
    circularMoneyMovement.getValidNodesOnGraph.mockImplementation(() => [1, 2])
    getCircularGraphRequest.mockImplementationOnce(() => ({
      then: () => ({
        fullCircleGraph: { vertices: [1, 2] },
      }),
    }))
    const store = createStore(reducers, storeState)
    const dom = renderWithRedux(<ContextWrap />, { store })
    const { container } = dom
    act(() => {
      fireEvent.click(container.querySelector('#apply'))
    })
    await waitTime(10)
    act(() => {
      fireEvent.click(container.querySelector('.cmm-control-bar__daterange'))
    })
    const menuList = dom.baseElement.querySelectorAll(
      '.cmm-control-bar__daterange__popover--item',
    )
    act(() => {
      fireEvent.click(menuList[1])
    })
    await waitTime(10)
    expect(setMessage).toBeCalledWith({
      type: 'warning',
      message: CIRCULAR_GRAPH.ALERTS.NO_DATA_BUT_NO_EXIT.MESSAGES,
    })
    expect(store.getState().circularGraphReducer.paymentInterval).toBe('all')
  })
})
