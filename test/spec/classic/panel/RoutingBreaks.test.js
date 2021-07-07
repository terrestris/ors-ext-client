Ext.Loader.syncRequire([
  'Ors.panel.RoutingBreaks'
]);

describe('Ors.panel.RoutingBreaks', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.panel.RoutingBreaks).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.panel.RoutingBreaks');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });

  });
});
