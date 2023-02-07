
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    
        cy.get('#firstName').type('Natália')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('natalia@exemplo.com')
        cy.get('#open-text-area').type('Teste', {delay:0})
        cy.contains('button','Enviar').click()
})