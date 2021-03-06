/* Copyright (c) 2021-present terrestris GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @class Ors.form.IsochroneRoutingSettingsController
 */
Ext.define('Ors.form.IsochroneRoutingSettingsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ors-form-isochrone-routing-settings',

  onSubmit: function () {
    var me = this;
    var view = me.getView();
    if (!view) {
      return;
    }

    var parentView = view.up('ors-window-isochrone-routing');
    if (!parentView) {
      return;
    }
    parentView.fireEvent('makeRoutingRequest', null, null);
  },

  /**
   * Add selected record to the waypoint store.
   *
   * @param {Ext.form.field.ComboBox} combo The combobox.
   * @param {Ext.data.Model} record The selected record.
   */
  onCenterSelect: function (combo, record) {
    var me = this;
    var view = me.getView();
    var vm = view.lookupViewModel();
    var wayPointStore = vm.get('waypoints');

    var waypoint = {
      address: record.get('address'),
      latitude: record.get('latitude'),
      longitude: record.get('longitude')
    };
    wayPointStore.loadRawData([waypoint]);
  },

  /**
   * Activate submit button if all required
   * input fields are valid.
   */
  activateSubmitButtonIfValid: function () {
    var me = this;
    var view = me.getView();
    if (!view) {
      return;
    }

    var vm = view.lookupViewModel();
    if (!vm) {
      return;
    }

    var centerField = view.down('[name="center"]');
    var rangeField = view.down('[name="range"]');
    var intervalField = view.down('[name="interval"]');

    var formIsValid = centerField.isValid() &&
      rangeField.isValid() &&
      intervalField.isValid();
    vm.set('disableSubmitButton', !formIsValid);
  },

  /**
   * Trigger routing request when an avoid area was drawn.
   */
  onAvoidAreaDrawEnd: function () {
    var me = this;
    var view = me.getView();
    if (!view) {
      return;
    }
    var routingWindow = view.up('ors-window-isochrone-routing');
    if (routingWindow) {
      routingWindow.fireEvent('makeRoutingRequest', undefined, undefined);
    }
  }
});
