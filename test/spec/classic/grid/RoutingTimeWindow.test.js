Ext.Loader.syncRequire([
  'Ors.grid.RoutingTimeWindow'
]);

describe('Ors.grid.RoutingTimeWindow', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.grid.RoutingTimeWindow).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.grid.RoutingTimeWindow');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });

  });

});
