Ext.Loader.syncRequire([
  'Ors.button.AvoidAreaController'
]);

describe('Ors.button.AvoidAreaController', function () {
  describe('Basics', function () {
    it('is defined', function () {
      expect(Ors.button.AvoidAreaController).to.not.be(undefined);
    });
  });
});

// TODO: test crucial methods like `handleUploadedFile`
