

const chai = require("chai");
let chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


 //assuming you're using port 3013 according to the env file. Please change to whichever port you're using
 //Also, please make sure your server is running on another terminal
 let url = "http://localhost:3013";

  //Generate another token from postman incase this one expires
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoid2FsZSIsImlhdCI6MTU4OTU3MjEyMywiZXhwIjoxNTg5NzQ0OTIzfQ.-H-quPqoZ9YM8a2mFRvvv5Ut4P9bh2vMRefJVyQjvK0";

describe('Get all orders', () => {
  it('it should be successful', (done) => {
    
  
    chai.request(url)
        .post('/orders')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {

           expect(err).to.be.null;
           expect(res).to.be.json;
           expect(res).to.have.status(200);
             
          done();
        });
  }).timeout(11000);
});



describe('/Place an order', () => {
    it('it should be successful', (done) => {
      
      let name = "demo order";
       let price = "2000";
       let address = "Costa Rica"
  
      chai.request(url)
          .post('/place')
          .set('Authorization', 'Bearer ' + token)
          .send({ name: name, price: price, address: address })
          .end((err, res) => {
  
             expect(err).to.be.null;
             expect(res).to.be.json;
             expect(res).to.have.status(200);
               
            done();
          });
    }).timeout(11000);
  });
  

