class WaitHelper {
    constructor() {
        this.defaultTimeout = 30000;
        this.shortTimeout = 10000;
        this.longTimeout = 60000;
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - Element selector
     * @param {Object} options - Options for wait
     * @returns {Cypress.Chainable}
     */
    waitForElement(selector, options = {}) {
        const {
            timeout = this.defaultTimeout,
            isVisible = true,
            errorMessage = `Timeout waiting for element: ${selector}`
        } = options;

        return cy.get(selector, { timeout })
            .should(isVisible ? 'be.visible' : 'exist')
            .then($element => {
                if (!$element) {
                    throw new Error(errorMessage);
                }
                return $element;
            });
    }

    /**
     * Wait for text to be visible
     * @param {string} text - Text to wait for
     * @param {Object} options - Options for wait
     * @returns {Cypress.Chainable}
     */
    waitForText(text, options = {}) {
        const {
            timeout = this.defaultTimeout,
            errorMessage = `Timeout waiting for text: ${text}`
        } = options;

        return cy.contains(text, { timeout })
            .should('be.visible')
            .then($element => {
                if (!$element) {
                    throw new Error(errorMessage);
                }
                return $element;
            });
    }

    /**
     * Wait for element to be clickable
     * @param {string} selector - Element selector
     * @param {Object} options - Options for wait
     * @returns {Cypress.Chainable}
     */
    waitForClickable(selector, options = {}) {
        const {
            timeout = this.defaultTimeout,
            errorMessage = `Element not clickable: ${selector}`
        } = options;

        return cy.get(selector, { timeout })
            .should('be.visible')
            .and('not.be.disabled')
            .then($element => {
                if (!$element) {
                    throw new Error(errorMessage);
                }
                return $element;
            });
    }

    /**
     * Wait for loading state to complete
     * @param {Object} options - Options for wait
     * @returns {Cypress.Chainable}
     */
    waitForLoadingToComplete(options = {}) {
        const {
            timeout = this.defaultTimeout,
            loadingSelector = '.MuiBackdrop-root',
            errorMessage = 'Loading did not complete'
        } = options;

        return cy.get(loadingSelector, { timeout })
            .should('not.exist')
            .then(() => {
                cy.log('Loading completed');
            });
    }

    /**
     * Wait for multiple elements
     * @param {Array} selectors - Array of selectors to wait for
     * @param {Object} options - Options for wait
     * @returns {Cypress.Chainable}
     */
    waitForMultipleElements(selectors, options = {}) {
        const {
            timeout = this.defaultTimeout,
            isVisible = true
        } = options;

        const waitPromises = selectors.map(selector =>
            this.waitForElement(selector, { timeout, isVisible })
        );

        return cy.wrap(Promise.all(waitPromises));
    }
}

export default new WaitHelper();