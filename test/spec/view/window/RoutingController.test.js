Ext.Loader.syncRequire([
  'Ors.window.RoutingController'
]);

describe('Ors.window.RoutingController', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.window.RoutingController).to.not.be(undefined);
    });
  });
});
