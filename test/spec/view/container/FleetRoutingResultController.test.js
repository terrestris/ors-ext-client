Ext.Loader.syncRequire([
  'Ors.container.FleetRoutingResultController'
]);

describe('Ors.container.FleetRoutingResultController', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.container.FleetRoutingResultController).to.not.be(undefined);
    });

    it('can be created', function () {
      var ctrl = new Ors.container.FleetRoutingResultController();
      expect(ctrl).to.not.be(undefined);
    });
  });
});
