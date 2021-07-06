Ext.Loader.syncRequire(['Ors.button.AvoidArea']);

describe('Ors.button.AvoidArea', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.button.AvoidArea).to.not.be(undefined);
    });
  });

  describe('#initComponent', function () {
    it('can be initialized', function () {
      var comp = Ext.create('Ors.button.AvoidArea');
      expect(comp).to.not.be(undefined);
    });
  });

  describe('References', function () {
    var comp = Ext.create('Ors.button.AvoidArea');
    it('names referenced layer correctly', function () {
      expect(comp.avoidAreaLayerName).to.be('routing-avoid-area-layer');
    });
  });

  // TODO: check if avoid area layer has been created
});
