const supertest = require('supertest')
const app = ('../controllers/pokeControllers')


describe('Test My app server', () => {
    it('should get main route', async () => {
        const res = await supertest(app).get('/pokemon')


        expect(res.body)
    })
})