Ext.Loader.syncRequire(['Ors.container.RoutingResult']);

describe('Ors.container.RoutingResult', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.container.RoutingResult).to.not.be(undefined);
    });
  });

  describe('#initComponent', function () {
    it('can be initialized', function () {
      var comp = Ext.create('Ors.container.RoutingResult');
      expect(comp).to.not.be(undefined);
    });
  });

});
