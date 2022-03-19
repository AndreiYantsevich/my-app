import appReducer, {actions} from './authReducer';

let startState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

beforeEach(() => {
    startState = {
        userId: '1',
        email: 'test@test.com',
        login: 'username',
        isAuth: false,
        captchaUrl: ''
    }
})

test('User data should be set', () => {
    const action = actions.setAuthUserData('1', 'test@test.com', 'username', true)
    const endState = appReducer(startState, action)

    expect(endState.isAuth).toBeTruthy();
    expect(endState.login).toEqual('username');
})