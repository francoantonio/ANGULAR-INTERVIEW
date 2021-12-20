const testData = {
  name: 'Test First',
  email: 'testValid@gmail.com',
  emailInvalid: 'test@.com',
  lorem:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis assumenda distinctio aut quidem officia expedita consequatur nam omnis molestias perspiciatis beatae facilis, quibusdam blanditiis odio quod fugiat, tempora soluta debitis',
};

describe('test general', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('List Post');
  });
  it('visit home page, apretar un button y volver al home', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('button:first').click();
    cy.wait(500);
    cy.get('a').click();
    cy.wait(100);
  });
  it('visit home page, apretar un button y agregar un comentario', () => {
    cy.visit('/');
    cy.wait(1000);

    cy.get('button:first').click();
    cy.wait(200);
    cy.get('input:first').type(testData.name);

    cy.get('input:first').next().type(testData.emailInvalid);
    cy.get('textarea').type(testData.lorem.repeat(3));
    cy.wait(500);
    cy.get('button').contains('Limpiar').click();
    cy.get('button').contains('Limpiar').click();

    cy.wait(1500);

    cy.get('input:first').type(testData.name);

    cy.get('input:first').next().type(testData.email);
    cy.get('textarea').type(testData.lorem);
    cy.get('button').contains('Agregar').click();
    cy.wait(2000);

    cy.get('button').contains('Emitir').click();
    cy.scrollTo(200, 20);
    cy.wait(1500);
    cy.contains('Last Comment');
    cy.wait(3000);

    cy.get('button:first').click();
    cy.wait(4000);
    cy.get('input:first').type(testData.name);

    cy.get('input:first').next().type(testData.email);
    cy.get('textarea').type(testData.lorem);
    cy.get('button').contains('Agregar').click();
    cy.wait(2000);
    cy.get('input:first').type(testData.name);

    cy.get('input:first').next().type(testData.email);
    cy.get('textarea').type(testData.lorem);
    cy.get('button').contains('Agregar').click();
    cy.wait(2000);
    cy.get('a').click();
    cy.wait(1000);
    cy.get('button:first').click();
    cy.wait(1000);
  });
});

describe('Test 404', () => {
  it('enviar una url cualquiera', () => {
    cy.visit('/noExiste');
    cy.contains(
      'The page you are looking does not exist or other error occurred'
    );
  });
  it('enviar una url cualquiera y volver al home', () => {
    cy.visit('/noExiste');
    cy.contains(
      'The page you are looking does not exist or other error occurred'
    );
    cy.wait(2000);
    cy.get('button').click();
    cy.wait(2000);
  });
  it('enviar una url /post/id que no exista,y volver al home', () => {
    cy.visit('/post/200');
    cy.contains('There is no post with id 200');
    cy.wait(2000);
    cy.get('button').click();
    cy.wait(2000);
  });
});
describe('Test url /post/id', () => {
  it('post Valida', () => {
    cy.visit('/post/30');
    cy.contains('Detail post: 30');
    cy.wait(2000);
  });
});
