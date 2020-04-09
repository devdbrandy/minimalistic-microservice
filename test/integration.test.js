const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const app = require('../src/app');
const JWTService = require('../src/services/jwt.service');
const ThumbnailService = require('../src/services/thumbnail.service');
const Jimp = require('jimp');

let authToken;
before(() => {
  authToken = JWTService.sign({ username: 'john' });
});

describe('home', () => {
  it('should responds with welcome message', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Welcome to Node.js Microservice' }, done);
  });

  it('should responds with 404 - Not Found', done => {
    request(app)
      .get('/404')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('POST /login', () => {
  it('should successfully auhthenticate user and respond with token', done => {
    request(app)
      .post('/login')
      .send({ username: 'john', password: 'secret' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.own.property('token');
        done();
      });
  });

  it('should respond with 400 status for invalid request payload', done => {
    request(app)
      .post('/login')
      .send({ username: '', password: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});

describe('POST /thumbnail', () => {
  it('should respond with 400 status for unsupported image type', done => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: 'http://image.pdf' })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should successfully generate thumbnail from url', done => {
    const stub = sinon.stub(Jimp, 'read').returns({
      getExtension: () => 'jpg',
      resize: () => null,
      write: () => 'image.jpg'
    });

    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: 'https://i.picsum.photos/id/866/400/300.jpg' })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.own.property('message');
        expect(res.body).to.have.own.property('link');
        done();
      });

    stub.restore();
  });

  it('should respond with 400 status for invalid request payload', done => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: '' })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should respond with 400 status for invalid image url', done => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: 'image.jpg' })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should respond with 401 status for unthenticated user', done => {
    request(app)
      .post('/api/v1/thumbnail')
      .send({ imageUrl: 'https://i.picsum.photos/id/866/400/300.jpg' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('POST /jsonpatch', () => {
  const document = JSON.stringify({
    user: { firstName: 'Albert', lastName: 'Einstein' }
  });
  const patch = JSON.stringify([
    { op: 'replace', path: '/user/firstName', value: 'Leonardo' },
    { op: 'replace', path: '/user/lastName', value: 'da Vinci' }
  ]);

  it('should successfully generate json patch', done => {
    request(app)
      .post('/api/v1/jsonpatch')
      .send({ document, patch })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.own.property('user');
        done();
      });
  });

  it('should respond with 400 status for invalid request payload', done => {
    request(app)
      .post('/api/v1/jsonpatch')
      .send({ document: '', patch: '' })
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should respond with 401 status for unthenticated user', done => {
    request(app)
      .post('/api/v1/jsonpatch')
      .send({ document, patch })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with 401 status for invalid auth token format', done => {
    request(app)
      .post('/api/v1/jsonpatch')
      .send({ document, patch })
      .set('Authorization', authToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('should respond with 401 status for invalid auth token', done => {
    const invalidToken = 'invalid';
    request(app)
      .post('/api/v1/jsonpatch')
      .send({ document, patch })
      .set('Authorization', `Bearer ${invalidToken}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});
