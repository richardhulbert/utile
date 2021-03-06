/**
 * Created by richardhulbert on 31/07/2016.
 */
describe('A suite to test Utile', function() {
    var utile;
    beforeAll(function(){
        utile= Codevanilla_Utile();

    });

    it('converts line breaks in a string to br tag', function() {
        var str='line 1 '+"\n"+'line 2';
        expect(utile.nl2br(str)).toMatch('line 1 <br />line 2');
    });
    it('converts br tags into line breaks', function () {
        var str='line 1 <br />line 2';
        expect(utile.br2nl(str)).toMatch('line 1 '+"\n"+'line 2');
    });

});
