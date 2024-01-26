import navigationBubble from '../locator/navigationBubble.json'
import filter from '../locator/filter.json'

describe('NavigationBubble', () => {
  beforeEach(() => {
    cy.visitHome()
  })

  it('no graph no bubble', () => {
    cy.switchGraphType('seedProfile')
    cy.get(navigationBubble.bubblePopupHidden.locator).should(
      'have.css',
      'display',
      'none',
    )
  })

  it('auto popup shortcut menu when BRM', () => {
    cy.visitHome('?roles=BRM')
    cy.switchGraphType('seedProfile')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubblePopup.locator, { timeout: 120000 }).should(
      'have.css',
      'display',
      'block',
    )
  })

  it('no popup shortcut menu', () => {
    cy.switchGraphType('seedProfile')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubblePopup.locator, { timeout: 120000 }).should(
      'have.css',
      'display',
      'none',
    )
  })

  it('show/hide shortcut menu', () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubblePopupShow.locator).should(
      'have.css',
      'display',
      'block',
    )
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
  })

  it("click popup inner, don't hide shortcut menu when mouseout", () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubblePopup.locator).trigger('click')
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )
  })

  it('click "view all" switch to Filter', () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.selectedFilterWrap.locator)
      .contains('View All')
      .trigger('click')
    cy.get('.filterContainer').parent().should('have.css', 'display', 'block')
  })

  it('hide shortcut menu when click close icon', () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubblePopup.locator).trigger('click')
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )
    cy.get(navigationBubble.selectedFilterWrapCloseIcon.locator).trigger(
      'click',
    )
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
  })

  it('hide shortcut menu when click other place', () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubblePopup.locator).trigger('click')
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )
    cy.get('.header').trigger('click')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'none',
    )
  })

  it("click the parent is body component, don't hide shortcut menu when mouseout", () => {
    cy.searchSeed([{ id: '1844549535113223091', type: 'acc' }])

    // ant-calendar-picker
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubbleDateRange.locator).trigger('click')
    cy.get(navigationBubble.antCalendarSelect.locator).eq(1).trigger('click')
    cy.get(navigationBubble.selectedFilterWrapTitle.locator).trigger(
      'mousedown',
    )
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )

    // ant-select-dropdown
    cy.openFilter(true, true)
    cy.get(filter.filterPanelBody.locator)
      .eq(1)
      .contains('Min')
      .next()
      .type('10')
    cy.get(filter.filterButtons.locator)
      .eq(1)
      .contains('Filter')
      .trigger('click')
    cy.get(navigationBubble.bubbleArea.locator).trigger('mouseover')
    cy.get(navigationBubble.bubbleGroupSelect.locator)
      .contains('Min: 10')
      .trigger('click')
    cy.get(navigationBubble.dropdownButton.locator)
      .contains('Cancel')
      .trigger('click')
    cy.get(navigationBubble.bubblePopup.locator).trigger('mouseout')
    cy.get(navigationBubble.bubblePopup.locator).should(
      'have.css',
      'display',
      'block',
    )
  })
})
