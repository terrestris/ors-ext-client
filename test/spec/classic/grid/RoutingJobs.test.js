Ext.Loader.syncRequire([
  'Ors.grid.RoutingJobs'
]);

describe('Ors.grid.RoutingJobs', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.grid.RoutingJobs).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.grid.RoutingJobs');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });
  });
});
