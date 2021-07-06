Ext.Loader.syncRequire([
  'Ors.form.ClassicRoutingSettingsController'
]);

describe('Ors.form.ClassicRoutingSettingsController', function () {
  describe('Basics', function () {

    it('is defined', function () {
      expect(Ors.form.ClassicRoutingSettingsController).to.not.be(undefined);
    });

    it('can be created', function () {
      var ctrl = new Ors.form.ClassicRoutingSettingsController();
      expect(ctrl).to.not.be('undefined');
    });

  });
});
