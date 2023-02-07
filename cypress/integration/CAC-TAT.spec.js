/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Fazendo testes automatizados em aplicações web pela 1ª vez! =)'
        cy.get('#firstName').type('Natália')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('natalia@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Natália')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('natalia@exemplo,com')
        cy.get('#open-text-area').type('Test', {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    it('campo telefone fica vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone') //pega o campo telefone
            .type('abcdefga') //tenta digitar uma estring
            .should('have.value', '') //testa se a string fica vazia, pois não aceita texto
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Natália')
        cy.get('#lastName').type('Sousa')
        cy.get('#email').type('natalia@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Test', {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })   
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Natália').should('have.value','Natália').clear().should('have.value','')
        cy.get('#lastName').type('Sousa').should('have.value','Sousa').clear().should('have.value','')
        cy.get('#email').type('natalia@exemplo.com').should('have.value','natalia@exemplo.com').clear().should('have.value','')
        cy.get('#phone').type('11986578987').should('have.value', '11986578987').clear().should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','Enviar').click() // procura o Texto no elemento dado

        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() //cria uma 'funçao' para fazer algo
        cy.get('.success').should('be.visible')
    })

    //Inputs do tipo select
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value','blog')
    })

    //inputs do tipo radio
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3).each(function($radio){ //marca cada um dos elementos e verifica se ele foi marcado corretamente
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last() //pega o ultimo elemento
            .uncheck().should('not.be.checked')
    })
    
    //fazendo upload de um arquivo
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json') //faz o upload do arquivo
            .should(function($input){ //pega as propriedade do objeto input que ele pegou no get
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //fazendo upload de um arquivo simulando drag-drop
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'}) //faz o upload do arquivo
        .should(function($input){ //pega as propriedade do objeto input que ele pegou no get
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input){ //pega as propriedade do objeto input que ele pegou no get
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target').click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){

    })
   
  })
  