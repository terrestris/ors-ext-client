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
 * @class Ors.form.IsochroneRoutingSettings
 */
Ext.define('Ors.form.IsochroneRoutingSettings', {
  extend: 'Ext.form.Panel',
  xtype: 'ors-form-isochrone-routing-settings',

  requires: [
    'Ors.form.field.GeocodingCombo',
    'Ors.button.RoutingProfile',
    'Ors.form.IsochroneRoutingSettingsController',
    'Ors.button.AvoidArea',
    'Ext.button.Segmented',
    'Ext.slider.Single'
  ],

  controller: 'ors-form-isochrone-routing-settings',

  width: '100%',

  bodyPadding: '10 5 0 5',

  defaults: {
    anchor: '100%'
  },

  fbar: [{
    xtype: 'ors-button-routing-profile',
    bind: {
      value: '{routingProfile}'
    }
  }, {
    xtype: 'segmentedbutton',
    defaults: {
      padding: '3 10'
    },
    bind: {
      value: '{rangeType}'
    },
    items: [{
      iconCls: 'x-fa fa-clock-o',
      value: 'time',
      bind: {
        tooltip: '{i18n.timeTooltip}'
      }
    }, {
      iconCls: 'x-fa fa-arrows-h',
      value: 'distance',
      bind: {
        tooltip: '{i18n.distanceTooltip}'
      }
    }],
    listeners: {
      toggle: 'activateSubmitButtonIfValid'
    }
  }, {
    xtype: 'ors-button-avoidarea',
    listeners: {
      avoidAreaDrawEnd: 'onAvoidAreaDrawEnd'
    }
  }, {
    xtype: 'tbspacer',
    flex: 1
  }, {
    xtype: 'button',
    bind: {
      text: '{i18n.submitButtonText}',
      disabled: '{disableSubmitButton}'
    },
    handler: 'onSubmit'
  }],

  items: [{
    xtype: 'ors-form-field-geocodingcombo',
    name: 'center',
    bind: {
      fieldLabel: '{i18n.addressLabel}',
      emptyText: '{i18n.addressPlaceholder}'
    },
    labelSeparator: ': *',
    flex: 1,
    listeners: {
      select: 'onCenterSelect',
      change: 'activateSubmitButtonIfValid'
    }
  },
  {
    xtype: 'numberfield',
    name: 'range',
    bind: {
      fieldLabel: '{i18n.rangeFieldText}',
      emptyText: '{rangeType === "time" ? i18n.placeHolderMinutes : i18n.placeHolderKilometer}',
      value: '{range}'
    },
    allowBlank: false,
    labelSeparator: ': *',
    hideTrigger: true,
    listeners: {
      change: 'activateSubmitButtonIfValid'
    }
  },
  {
    xtype: 'numberfield',
    name: 'interval',
    bind: {
      fieldLabel: '{i18n.intervalFieldText}',
      emptyText: '{rangeType === "time" ? i18n.placeHolderMinutes : i18n.placeHolderKilometer}',
      value: '{interval}'
    },
    hideTrigger: true,
    listeners: {
      change: 'activateSubmitButtonIfValid'
    },
    validator: function (interval) {
      var isochroneWindow = this.up('ors-window-isochrone-routing');
      var vm = isochroneWindow.getViewModel();

      var rangeTime = vm.get('range');

      // empty interval is allowed
      if (!interval) {
        return true;
      }

      // interval must not be bigger than range
      if (interval > rangeTime) {
        return vm.get('i18n.intervalTooBigErrorText');
      }

      // we ensure the number of intervals is not higher than allowed
      var smallestAllowedInterval = rangeTime / vm.get('maxNumberIntervals');
      if (interval < smallestAllowedInterval) {
        return vm.get('i18n.intervalTooSmallErrorText') + smallestAllowedInterval;
      }

      return true;
    }
  }
  ]
});
