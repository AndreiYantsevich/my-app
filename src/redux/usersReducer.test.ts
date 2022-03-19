import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalCount,
    setUsers, toggleFollowingInProgress,
    toggleIsFetching,
    unFollowSuccess
} from './usersReducer';
import {UsersPageType, UserType} from '../types/types';


let users: Array<UserType> = []
let startState: UsersPageType;

beforeEach(() => {
    users = [
        {
            name: 'Katia',
            id: '1',
            photos: {
                small: 'small-pic.jpg',
                large: 'large-pic.jpg'
            },
            status: 'Hey, amigos!',
            followed: false
        },
        {
            name: 'John',
            id: '2',
            photos: {
                'small': 'small.jpg',
                'large': 'large.jpg'
            },
            status: 'Hey, hey',
            followed: false
        }
    ];

    startState = {
        users: users,
        pageSize: 1,
        totalUsersCount: 2,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [1, 2, 3, 4]
    }
})

test('User should be followed', () => {
    const action = followSuccess('1')
    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(true)
    expect(endState.users[1].followed).toBe(endState.users[1].followed)
})


test('User should be unfollowed', () => {
    const action = unFollowSuccess('1')
    const endState = usersReducer(startState, action)

    expect(endState.users[0].followed).toBe(false)
    expect(endState.users[1].followed).toEqual(startState.users[1].followed)
})


test('Users should be set', () => {
    const startState = {
        users: [],
        pageSize: 1,
        totalUsersCount: 2,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }

    const action = setUsers(users)
    const endState = usersReducer(startState, action)

    expect(endState.users.length).toBe(2)
    expect(endState.users[0].name).toEqual('Katia')
    expect(endState.users[1].photos.small).toEqual('small.jpg')
})


test('Current page should be set', () => {
    const action = setCurrentPage(3)
    const endState = usersReducer(startState, action)

    expect(endState.currentPage).toBe(3)
})


test('Total users count should be set', () => {
    const endState = usersReducer(startState, setTotalCount(200))

    expect(endState.totalUsersCount).toEqual(200)
})


test('isFetching works correctly', () => {
    const endState = usersReducer(startState, toggleIsFetching(true))

    expect(endState.isFetching).toEqual(true)
})


test('follow/unfollow button is disabled while waiting server response', () => {
    const endState = usersReducer(startState, toggleFollowingInProgress(true, 5))

    expect(endState.followingInProgress).toEqual([1, 2, 3, 4, 5])
})