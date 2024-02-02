const CONSTANTS = require('../../functional/utils/constants')
const moment = require('moment-timezone')
import filter from '../locator/filter.json'

/**
 * open or close filter navigation
 * @param {boolean}, openFilter, true to open filter, false to close
 * @param {boolean},
 */
Cypress.Commands.add('openFilter', (openFilter = true, checkMask = false) => {
  if (checkMask) {
    cy.get('.mask').should('have.css', 'display', 'none')
  }
  cy.get('.navigation--mini').then($el => {
    const isFilterClosed = $el.find('.filter .icon--filter').length > 0
    const isFilterOpened = $el.find('.filter .icon--filter--reverse').length > 0
    const hasBubble = $el.find('.navigationBubble__pop').length === 1
    if (openFilter) {
      if (isFilterClosed) {
        if (hasBubble) {
          cy.get(filter.filterToggleArea.locator).click()
        } else {
          cy.get(filter.filterToggleButton.locator).click()
        }
      }
      // close navigation if already opened
    } else {
      if (isFilterOpened) {
        if (hasBubble) {
          cy.get(filter.filterToggleArea.locator).click()
        } else {
          cy.get(filter.filterToggleButton.locator).click()
        }
      }
    }
  })
})

Cypress.Commands.add('applyFilter', () => {
  cy.get(filter.filterButtons.locator).eq(1).contains('Filter').trigger('click')
  cy.get('.mask--active', { timeout: 120000 }).should('length', 0)
})

/**
 * set global filters
 * @param {Array}, filters [{
 *    filter, filter Object, CLASSNAME, TYPE, DEFAULT_VALUE
 *    value, value of the filter
 *    option, position of option value in dropdown. only use in 'select' type
 *            both option and value, use value
 * }]
 */
Cypress.Commands.add('setGlobalFilter', (filters = []) => {
  if (Array.isArray(filters) && filters.length > 0) {
    // set each filter
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i].filter
      switch (filter.TYPE) {
        case 'select':
          cy.get(filter.CLASSNAME).click()
          if (Array.isArray(filters[i].value)) {
            // multi selection
            for (let j = 0; j < filters[i].value.length; j++) {
              cy.get('.ant-select-dropdown-menu li')
                .contains(filters[i].value[j])
                .click()
            }
          } else {
            cy.get('.ant-select-dropdown-menu li')
              .contains(filters[i].value)
              .click()
          }
          break
        case 'input':
          cy.get(filter.CLASSNAME).type(filters[i].value)
          break
        case 'switch':
          if (filter.value) {
            cy.get(filter.INPUT_LASSNAME).check({ force: true })
          }
          if (!filter.value) {
            cy.get(filter.INPUT_LASSNAME).uncheck({ force: true })
          }
          break
        case 'datepicker':
          break
        default:
      }
      //click filter header name to close option popup, cause option will cover the other selector
      // await nemo.view.filter.filterHeaderName().click()
    }
  }
})

/**
 * after click global filter reset button, check every filter to default
 * @returns {Boolean} true-isDefault,false-notDefault
 */
Cypress.Commands.add('isGlobalFilterReset', () => {
  let resetFlag = true
  for (key in CONSTANTS.FILTERS) {
    const CLASSNAME = CONSTANTS.FILTERS[key].CLASSNAME
    let defaultValue = CONSTANTS.FILTERS[key].DEFAULT_VALUE
    let elementValue = cy.find(CLASSNAME).text()
    if (CONSTANTS.FILTERS[key].TYPE === 'datepicker') {
      moment.tz.setDefault('America/Los_Angeles')
      if (key === 'TIME_RANGE_START') {
        defaultValue = `${moment().subtract(3, 'y').format('YYYY-MM-DD')}`
      }
      if (key === 'TIME_RANGE_END') {
        defaultValue = `${moment().format('YYYY-MM-DD')}`
      }
    }
    if (
      CONSTANTS.FILTERS[key].TYPE !== 'switch' &&
      elementValue !== defaultValue
    ) {
      resetFlag = false
      break
    }
  }
  return resetFlag
})
