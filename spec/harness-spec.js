'use strict';

describe('With no op config', function() {
    const harness = require('../index')(require('./processors/foo'));
    it('it runs successfully', function() {
        let results = harness.run([{}]);
        expect(results.length).toEqual(1);
        expect(results[0].foo).toEqual('foo');
    });
});


describe('With multiple jobs', function() {
    const harness = require('../index')(require('./processors/foo'));
    it('first job runs', function() {
        let results = harness.run([{}], {field: 'yeee'});
        expect(results.length).toEqual(1);
        expect(results[0].yeee).toEqual('foo');
    });
    it('second job config not influenced by the first', function() {
        let results = harness.run([{}], {});
        expect(results.length).toEqual(1);
        expect(results[0].foo).toEqual('foo');
        expect(results[0].yeee).toBeUndefined();
    });
});


describe('event emitter', function() {
    let baz
    const harness = require('../index')(require('./processors/bar'));
    const processor = harness.getProcessor({cb: (i) => baz = i });
    it('it runs successfully', function() {
        harness.context.foundation.getEventEmitter().emit('bar');
        expect(baz).toEqual('baz');
    });
});
