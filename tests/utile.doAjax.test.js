/**
 * Created by richardhulbert on 31/07/2016.
 */

describe('A suite to test Utile doAjax function', function() {
    var tag, request;
    var onSuccess, onFailure;
    var REST ='/localhost';

    beforeAll(function(){
        this.utile= new Codevanilla_Utile();
    });
    beforeEach(function() {
        jasmine.Ajax.install();
        onSuccess = jasmine.createSpy('onSuccess');
        onFailure = jasmine.createSpy('onFailure');

    });


    afterEach(function() {
        jasmine.Ajax.uninstall();

    });

    it('Basic test to make sure doAjax is working', function() {
        spyOn(this.utile,'doAjax');
        var callback = function(result){};

        this.utile.doAjax(REST,'GET','test/',callback,{foo:'fooy',bar:'baary'},null,{'token':'a7610e84133c5713f89922dbca194377'},null,true);

        expect(callback).toHaveBeenCalled();



    });


});
