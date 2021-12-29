import ProfileStatus from './ProfileStatus';

const TestRenderer = require('react-test-renderer');

describe('ProfileStatus component', () => {

    test('status from props should be in the state', () => {
        const component = TestRenderer.create(<ProfileStatus status={'123'}
                                                             updateUserStatus={() => {
                                                             }}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('123');
    });

    test('after creation <span> should be displayed', () => {
        const component = TestRenderer.create(<ProfileStatus status={'123'}
                                                             updateUserStatus={() => {
                                                             }}/>);
        const instance = component.root;
        let span = instance.findByType('span')
        expect(span).not.toBeNull();
    });

    test('after creation <input> shouldn\'t be displayed', () => {
        const component = TestRenderer.create(<ProfileStatus status={'123'}
                                                             updateUserStatus={() => {
                                                             }}/>);
        const instance = component.root;
        expect(() => {
            instance.findByType('input')
        }).toThrow();
    });

    test('after creation <span> should contains correct status', () => {
        const component = TestRenderer.create(<ProfileStatus status={'123'}
                                                             updateUserStatus={() => {
                                                             }}/>);
        const instance = component.root;
        let span = instance.findByType('span')
        expect(span.children[0]).toBe('123');
    });

    test('input should be displayed in editMode instead of span', () => {
        const component = TestRenderer.create(<ProfileStatus status={'123'}
                                                             updateUserStatus={() => {
                                                             }}/>);
        const instance = component.root;
        let span = instance.findByType('span')
        span.props.onDoubleClick();
        let input = instance.findByType('input')
        expect(input.props.value).toBe('123');
    });
});