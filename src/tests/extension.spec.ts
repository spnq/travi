import * as ext from '../extension';

describe('removeLastPunctuationMark', () => {
    test('should remove punctuation marks from given string', () => {
        expect(ext.removeLastPunctuationMark('Test,')).toEqual('Test');
        expect(ext.removeLastPunctuationMark('Test!')).toEqual('Test');
        expect(ext.removeLastPunctuationMark('Test?')).toEqual('Test');
        expect(ext.removeLastPunctuationMark('Test.')).toEqual('Test.');
    });
});
