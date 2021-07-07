Ext.Loader.syncRequire([
  'Ors.window.ClassicRouting'
]);

describe('Ors.window.ClassicRouting', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.window.ClassicRouting).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.window.ClassicRouting');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });

  });
});
