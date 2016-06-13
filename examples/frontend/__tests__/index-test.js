jest.unmock('../src/js');
import Hello from '../src/js';

describe('index.js', () => {
    it('should import Hello', () => {
        expect(Hello).toBeDefined();

        const hello = new Hello();
        expect(hello.speak).toBeDefined();
        expect(hello.speak()).toEqual("hello world");
    });
});
