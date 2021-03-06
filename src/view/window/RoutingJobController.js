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
 * @class Ors.window.RoutingJobController
 */
Ext.define('Ors.window.RoutingJobController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ors-window-routing-job',
  requires: [
    'Ext.Object',
    'Ext.ComponentQuery'
  ],

  /**
   * Handle the submission of a single RoutingJob by
   * sending the RoutingJob to the parent grid and
   * closing the window.
   */
  onSubmit: function () {
    var me = this;
    var view = me.getView();
    if (!view) {
      return;
    }

    var form = view.down('[name=job-form]');
    var formData = {};
    if (form) {
      formData = form.getForm().getFieldValues();
    }

    var timeWindowGrid = form.down('[name=time_windows]');
    var timeWindowsValid = true;
    if (timeWindowGrid) {
      var timeWindowsStore = timeWindowGrid.getStore();
      formData.time_windows = timeWindowsStore.getAllAsTimestamp();
      if (!timeWindowsStore.isValid()) {
        timeWindowsValid = false;
      }
    }

    var addressCombo = form.down('[name=address]');
    if (addressCombo) {
      var selection = addressCombo.getSelection();
      if (selection) {
        var address = Ext.clone(selection.getData());
        if (!Ext.isObject(address)) {
          address = undefined;
        }
        formData.address = address;
      }
    }

    if (!form.isValid() || !timeWindowsValid) {
      view.down('[name=window-error-field]').setHidden(false);
      return;
    }

    view.down('[name=window-error-field]').setHidden(true);

    if (!me.isEmptyRecord(formData)) {
      view.fireEvent('updatedJob', formData, view.job);
    }

    view.close();
  },

  /**
   * Handler for the cancel event.
   */
  onCancel: function () {
    var me = this;
    var view = me.getView();
    if (view) {
      view.close();
    }
  },

  /**
   * Check if a RoutingJob record is empty.
   *
   * @param {Ext.data.Model} rec The RoutingJob record.
   */
  isEmptyRecord: function (rec) {
    var empty = true;
    Ext.Object.eachValue(rec, function (v) {
      if (!Ext.isEmpty(v)) {
        empty = false;
      }
    });
    return empty;
  }
});
