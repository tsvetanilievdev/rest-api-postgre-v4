import * as user from '../user'

describe('user handler', () => {
    it('should create a new user', async () => {
        //mocking data
        const req = {
            body: {
                username: 'tsvetan',
                password: '123456'
            }
        }
        const res = {
            json(obj){
                console.log(obj)
                expect(obj.token).toBeTruthy();
            }
        }

        await user.createNewUser(req, res, () => {})
    })
})