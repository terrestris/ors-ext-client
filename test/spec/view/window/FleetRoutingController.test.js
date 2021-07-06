Ext.Loader.syncRequire([
  'Ors.window.FleetRoutingController'
]);

describe('Ors.window.FleetRoutingController', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.window.FleetRoutingController).to.not.be(undefined);
    });
  });
});
