Ext.Loader.syncRequire([
  'Ors.grid.RoutingVehicles'
]);

describe('Ors.grid.RoutingVehicles', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.grid.RoutingVehicles).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.grid.RoutingVehicles');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });
  });
});
