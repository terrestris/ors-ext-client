Ext.Loader.syncRequire([
  'Ors.window.ClassicRoutingController'
]);

describe('Ors.window.ClassicRoutingController', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.window.ClassicRoutingController).to.not.be(undefined);
    });
  });
});
