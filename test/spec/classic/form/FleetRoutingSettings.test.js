Ext.Loader.syncRequire([
  'Ors.form.FleetRoutingSettings'
]);

describe('Ors.form.FleetRoutingSettings', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.form.FleetRoutingSettings).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.form.FleetRoutingSettings');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });
  });
});
