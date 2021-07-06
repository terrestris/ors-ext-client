Ext.Loader.syncRequire([
  'Ors.form.field.GeocodingCombo'
]);

describe('Ors.form.field.GeocodingCombo', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.form.field.GeocodingCombo).to.not.be(undefined);
    });

    it('can be created', function () {
      var cmp = Ext.create('Ors.form.field.GeocodingCombo');
      expect(cmp).to.not.be(undefined);
      expect(cmp.getController()).to.not.be(undefined);
    });
  });
});
