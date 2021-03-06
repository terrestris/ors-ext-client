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
 * @class Ors.form.ClassicRoutingSettings
 */
Ext.define('Ors.form.ClassicRoutingSettings', {
  extend: 'Ext.form.Panel',
  xtype: 'ors-form-classic-routing-settings',
  controller: 'ors-form-classic-routing-settings',

  requires: [
    'Ext.button.Segmented',
    'Ext.toolbar.Spacer',
    'Ext.button.Button',
    'Ext.form.field.FileButton',
    'Ors.form.ClassicRoutingSettingsController',
    'Ors.button.AvoidArea',
    'Ors.button.RoutingPreference'
  ],

  width: '100%',

  fbar: [
    {
      xtype: 'segmentedbutton',
      defaults: {
        handler: 'onRoutingButtonPressed',
        padding: '3 10'
      },
      bind: {
        value: '{routingProfile}'
      },
      items: [{
        iconCls: 'x-fa fa-car',
        value: 'driving-car',
        bind: {
          pressed: '{routingProfile === "driving-car"}',
          tooltip: '{i18n.profileCarText}'
        }
      }, {
        iconCls: 'x-fa fa-bicycle',
        value: 'cycling-regular',
        bind: {
          pressed: '{routingProfile === "cycling-regular"}',
          tooltip: '{i18n.profileBycicleText}'
        }
      }, {
        iconCls: 'x-fa fa-male',
        value: 'foot-walking',
        bind: {
          pressed: '{routingProfile === "foot-walking"}',
          tooltip: '{i18n.profileWalkingText}'
        }
      }]
    }, {
      xtype: 'ors-button-routing-preference',
      defaults: {
        handler: 'onRoutingButtonPressed',
        padding: '3 10'
      },
      bind: {
        value: '{routingPreference}'
      }
    }, {
      xtype: 'tbspacer',
      flex: 1
    },
    {
      xtype: 'ors-button-avoidarea',
      listeners: {
        avoidAreaDrawEnd: 'onAvoidAreaDrawEnd'
      }
    },
    {
      type: 'button',
      iconCls: 'x-fa fa-plus-circle',
      bind: {
        tooltip: '{i18n.addEmptyPoint}'
      },
      handler: 'addEmptyViaPoint'
    }
  ],

  bodyPadding: 10,
  items: [],
  listeners: {
    boxReady: 'onBoxReady'
  }
});
