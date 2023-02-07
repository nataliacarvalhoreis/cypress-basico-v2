Cypress._.times(3, function(){ // a funcao .times executa a função quantas vezes quisermos
    it('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})