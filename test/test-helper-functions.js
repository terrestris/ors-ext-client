// This file is taken from GeoExt3
(function (global) {
  /**
   * A helper method that'll return a HTML script tag for loading
   * an external JavaScript file.
   *
   * @param {string} src The `src` of the external JavaScript file.
   * @return {string} The script tag with given `src`
   */
  function getExternalScriptTag(src) {
    return '<scr' + 'ipt src="' + src + '"></scr' + 'ipt>';
  }

  /**
   * A helper method that'll return a HTML script tag for executing
   * some given JavaScript code.
   *
   * @param {string} code The code to execute.
   * @return {string} The script tag with given content.
   */
  function getInlineScriptTag(code) {
    return '<scr' + 'ipt>' + code + '</scr' + 'ipt>';
  }

  /**
   * A utility function that creates and adds a `<div>` to the `<body>` of the
   * document. The div is positioned absolutely off the screen and configured
   * with fixed dimensions to never be visible to the user (e.g. when the
   * test suite is viewed in a browser).
   *
   * Use this method in `beforeEach` if you need a `<div>` (e.g. to render
   * ExtJS components with their `renderTo` configuration).
   *
   * The created `<div>` is returned, so that it can easily be used in
   * `afterEach`-calls to cleanup. Most of the time you'll be using the helper
   * function #teardownTestDiv in such a case.
   *
   * @return {HTMLDivElement} The created `<div>`.
   */
  function setupTestDiv() {
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = -500;
    div.style.width = 256;
    div.style.height = 128;
    document.body.appendChild(div);
    return div;
  }

  /**
   * A utility function that removes the passed `div` from the document and
   * nullifies it.
   *
   * Use this method (e.g. in `afterEach`-calls) to cleanup any divs that you
   * have setup earlier (often by calling #setupTestDiv).
   *
   * @param {HTMLDivElement} div The `<div>` you want to remove.
   */
  function teardownTestDiv(div) {
    if (!div) {
      return;
    }
    var parent = div.parentNode;
    if (parent) {
      parent.removeChild(div);
    }
    div = null;
  }

  /**
   * Ensures that the `BasiGX.view.component.Map` is available for
   * instantiation by calling `Ext.Loader.syncRequire` if needed.
   *
   * @private
   */
  function ensureMapComponentAvailable() {
    if (!BasiGX || !BasiGX.view || !BasiGX.view.component ||
      !BasiGX.view.component.Map) {
      Ext.Loader.syncRequire(['BasiGX.view.component.Map']);
    }
  }

  /**
   * A utility function to create several objects that our tests need every
   * now and then. Will return an object that provides the created components
   * and HTML elements.
   *
   * Use this method (e.g. in `beforeEach` calls) to have easy access to an
   * `ol.Map` and a `BasiGX.view.component.Map`. In order to teardown all
   * created objects, use #teardownTestObjects.
   *
   * The created objects can be configured by passing in an `opts` object,
   * where the key `mapOpts` is an object with configs for the `ol.Map`, and
   * the key `mapComponentOpts` is an object with configs for the
   * `BasiGX.view.component.Map`.
   *
   * @param {Object} opts The options for the objects to create. Optional.
   * @param {Object} opts.mapOpts The options for the `ol.Map` constructor.
   *     Optional.
   * @param {Object} opts.mapComponentOpts The options for the map component
   *     constructor. Optional.
   * @return {Object} An object with the following keys: `map`, `mapDiv`,
   *     `mapComponent` and `mapComponentDiv`. `map` will hold the `ol.Map`
   *     instance, `mapDiv` will hold the `<div>` of the `map`, `mapComponent`
   *     will hold the `BasiGX.view.component.Map` that is configured with the
   *     `map` and `mapComponentDiv` will hold the `<div>` of the craeted
   *     `mapComponent`. Usually you'll only interact with the components, not
   *     with the `<div>`s.
   */
  function setupTestObjects(opts) {
    ensureMapComponentAvailable();

    var options = opts || {};
    var mapOpts = options.mapOpts || {};
    var mapComponentOpts = options.mapComponentOpts || {};

    var mapDiv = setupTestDiv();
    var mapComponentDiv = setupTestDiv();

    var view = new ol.View({
      center: [0, 0]
    });
    var map = new ol.Map(Ext.apply({ target: mapDiv, view: view }, mapOpts));
    var defaultProps = {
      renderTo: mapComponentDiv
    };

    if (!mapComponentOpts.appContextPath) {
      defaultProps.map = map;
    }

    var mapComponent = Ext.create('BasiGX.view.component.Map',
      Ext.apply(mapComponentOpts, defaultProps)
    );

    return {
      map: mapComponent.getMap() || map,
      mapComponent: mapComponent,
      mapDiv: mapDiv,
      mapComponentDiv: mapComponentDiv
    };
  }

  /**
   * A utility method to clean up test objects when they are no longer needed.
   * This is the companion method for #setupTestObjects; If you pass in the
   * object that was created using #setupTestObjects, all created elements
   * will properly be cleaned up.
   *
   * Usually you'll call this method inside of e.g. `afterEach`.
   *
   * @param {Object} createdObjs The object holding the objects created by
   *     the method #setupTestObjects.
   */
  function teardownTestObjects(createdObjs) {
    if (!createdObjs) {
      return;
    }
    if (createdObjs.mapComponent && createdObjs.mapComponent.destroy) {
      createdObjs.mapComponent.destroy();
    }
    if (createdObjs.map && createdObjs.map.setTarget) {
      createdObjs.map.setTarget(null);
    }
    teardownTestDiv(createdObjs.mapComponentDiv);
    teardownTestDiv(createdObjs.mapDiv);
  }

  /**
   * Returns a mock object that returns the defaultReturn upon get and also
   * has a set method stub. It also has a getProperties mock that returns
   * an empty object by default.
   * @param  {Any} defaultReturn will be returned by the get stub with any parameters
   * @return {Object}               the mocked object
   */
  function getMockedGetter(defaultReturn) {
    var mock = {};
    mock.get = sinon.stub().returns(defaultReturn);
    mock.set = sinon.stub();
    mock.getProperties = sinon.stub().returns({});
    return mock;
  }

  /**
   * Returns a mocked element. Current stubs:
   *
   * - dom.appendChild
   * - getSize
   * - down
   * - setStyle
   * - close
   * - up
   * - setDisabled
   * - showAt
   * - hide
   * - isVisible
   * - getWidth
   * - getLocalY
   * @return {Object} the mocked object
   */
  function getMockedElement() {
    var domMock = {};
    domMock.appendChild = sinon.stub();
    domMock.close = sinon.stub();
    var mock = { dom: domMock };
    mock.getSize = sinon.stub().returns({ width: 100, height: 100 });
    mock.down = sinon.stub().returns({});
    mock.setStyle = sinon.stub();
    mock.close = sinon.stub();
    mock.up = sinon.stub().returns(domMock);
    mock.setDisabled = sinon.stub();
    mock.showAt = sinon.stub();
    mock.hide = sinon.stub();
    mock.isVisible = sinon.stub();
    mock.getWidth = sinon.stub();
    mock.getLocalY = sinon.stub();
    return mock;
  }

  /**
   * Returns an array of names of `Ext.Logger` / `Ext.log` methods we'll be
   * able to turn on and off. See the methods #extLoggerBeQuiet
   * and #extLoggerBeLoud.
   *
   * @return {Array<String>} The names of methods which log.
   * @private
   */
  function getLogMethods() {
    var wrappedInUnderscores = /^__.+__$/;
    var loggerMethods = Ext.Object.getKeys(Ext.Logger);
    loggerMethods = Ext.Array.filter(loggerMethods, function (name) {
      return !wrappedInUnderscores.test(name);
    });
    var logMethods = Ext.Object.getKeys(Ext.log);
    logMethods = Ext.Array.filter(logMethods, function (name) {
      return !wrappedInUnderscores.test(name);
    });
    return Ext.Array.union(loggerMethods, logMethods);
  }
  /**
   * Turns of the noise from `Ext.Logger` / `Ext.log` by overwriting the
   * single log methods with a no-op-method. See also #extLoggerBeLoud to
   * restore the original Objects.
   */
  function extLoggerBeQuiet() {
    var logMethods = getLogMethods();
    var logObjs = [Ext.Logger, Ext.log];
    Ext.each(logObjs, function (logObj) {
      Ext.each(logMethods, function (logMethod) {
        var restoreName = '__' + logMethod + '__';
        if (logObj[logMethod] && !logObj[restoreName]) {
          logObj[restoreName] = logObj[logMethod];
          logObj[logMethod] = Ext.emptyFn;
        }
      });
    });
  }
  /**
   * Turns the noise from `Ext.Logger` / `Ext.log` on by overwriting the
   * single log methods with their stored original implementation. See also
   * the method #extLoggerBeQuiet.
   */
  function extLoggerBeLoud() {
    var logMethods = getLogMethods();
    var logObjs = [Ext.Logger, Ext.log];
    Ext.each(logObjs, function (logObj) {
      Ext.each(logMethods, function (logMethod) {
        var restoreName = '__' + logMethod + '__';
        if (logObj[restoreName] && logObj[logMethod] === Ext.emptyFn) {
          logObj[logMethod] = logObj[restoreName];
          delete logObj[restoreName];
        }
      });
    });
  }

  global.TestUtil = {
    getExternalScriptTag: getExternalScriptTag,
    getInlineScriptTag: getInlineScriptTag,
    setupTestDiv: setupTestDiv,
    setupTestObjects: setupTestObjects,
    teardownTestObjects: teardownTestObjects,
    getMockedGetter: getMockedGetter,
    getMockedElement: getMockedElement,
    extLogger: {
      off: extLoggerBeQuiet,
      on: extLoggerBeLoud
    }
  };
}(this));
