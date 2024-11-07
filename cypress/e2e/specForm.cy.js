describe('Проверка формы страхования', () => {
  beforeEach(() => {
    cy.visit('https://widgets.inssmart.ru/contract/mortgage/?appId=79f46bfb-d4ba-50aa-8269-7289dd16700c&secret=6ca520c0-328b-5b65-ab5c-b41332a3e667')
  })

   Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Проверка полей ввода', () => {
    cy.get('input[name="bank"]').click()
    cy.contains('БАНК ВТБ (ПАО)').click()

    cy.get('input[name="creditValue"').click().type(560000);
    /* Проверка что значение это число и не меньше 20000 */
    cy.get('input[name="creditValue"]').invoke('val').then((value) => {
          const numericValue = Number(value.replace(/[₽\s]/g, ''));
      
          expect(numericValue).to.be.a('number'); 
          expect(numericValue).to.be.at.least(20000);
    });

    const dateInput = '22.01.2024'
    cy.get('input[name="creditDocumentDate"').type(dateInput)

    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
    expect(datePattern.test(dateInput)).to.be.true;

    cy.get('div[id="mui-component-select-previousCompany"]').click()
    cy.contains('Кардиф').click()

    cy.get('div[id="mui-component-select-insurantGender"]').click()
    cy.contains('Мужской').click()


    function getDate18YearsAgo() {
      const today = new Date();
      const birthDate = new Date(today.setFullYear(today.getFullYear() - 18));
      
      const day = String(birthDate.getDate()).padStart(2, '0');
      const month = String(birthDate.getMonth() + 1).padStart(2, '0');
      const year = birthDate.getFullYear();
      
      return `${day}.${month}.${year}`;
    }
    const date18YearsAgo = getDate18YearsAgo();

    cy.get('input[name="insurantBirthDate"]').type(date18YearsAgo)

    cy.get('div[id="mui-component-select-buildingType"').click()
    cy.contains('Дом').click()

    cy.get('input[name="propertyRegion"').type('Москва')
    cy.contains('Москва').click()

    cy.get('input[type="checkbox"').click()

    cy.get('button[data-test-name="calculate"').click()
  })
})