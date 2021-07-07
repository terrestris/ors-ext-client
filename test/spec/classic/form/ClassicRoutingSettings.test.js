Ext.Loader.syncRequire([
  'Ors.form.ClassicRoutingSettings'
]);

describe('Ors.form.ClassicRoutingSettings', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.form.ClassicRoutingSettings).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.form.ClassicRoutingSettings');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });
  });
});
