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
 * @class Ors.container.IsochroneRoutingResult
 */
Ext.define('Ors.container.IsochroneRoutingResult', {
  extend: 'Ext.container.Container',

  xtype: 'ors-container-isochroneroutingresult',

  requires: [
    'Ext.form.field.Checkbox',
    'Ext.grid.Panel',
    'Ext.grid.column.Widget',
    'BasiGX.view.component.Map',
    'Ors.container.IsochroneRoutingResultController',
    'Ors.util.OpenRouteService'
  ],

  controller: 'ors-container-isochroneroutingresult',

  layout: 'vbox',

  width: '100%',

  defaults: {
    width: '100%'
  },

  map: null,

  waypointLayerName: 'routing-waypoint-layer',

  isochroneLayerName: 'routing-isochrone-layer',

  items: [{
    xtype: 'grid',
    name: 'isochrone-result-grid',
    bind: {
      store: '{isochrones}'
    },
    listeners: {
      itemmouseenter: 'onItemMouseEnter',
      itemmouseleave: 'onItemMouseLeave'
    },
    viewConfig: {
      markDirty: false
    },
    columns: [{
      dataIndex: 'color',
      width: 40,
      resizable: false,
      renderer: function (color, metaData) {
        metaData.tdStyle = 'background-color: ' + color + ';';
      }
    }, {
      dataIndex: 'value',
      flex: 1,
      align: 'end',
      bind: {
        text: '{i18n.valueColumn}'
      },
      renderer: function (value, metaData, rec) {
        var orsUtil = Ors.util.OpenRouteService;

        var range_type = rec.get('range_type');
        if (range_type === 'time') {
          return orsUtil.getFormattedDuration(value, true);
        } else if (range_type === 'distance') {
          return orsUtil.getFormattedDistance(value, true);
        }

        return;
      }
    }, {
      dataIndex: 'area',
      flex: 1,
      align: 'end',
      bind: {
        text: '{i18n.areaColumn}'
      },
      renderer: function (area) {
        var orsUtil = Ors.util.OpenRouteService;
        // we have to divide by 1000 as otherwise the
        // conversion to km?? is incorrect.
        return orsUtil.getFormattedArea(area / 1000, true, 1000);
      }
    }, {
      dataIndex: 'reachfactor',
      flex: 1,
      align: 'end',
      bind: {
        text: '{i18n.reachfactorColumn}'
      },
      renderer: function (reachfactor) {
        if (reachfactor) {
          return reachfactor.toFixed(2);
        }
        return reachfactor;
      }
    }, {
      xtype: 'widgetcolumn',
      bind: {
        text: '{i18n.visibilityColumn}'
      },
      widget: {
        xtype: 'checkbox',
        handler: 'onCheckboxChange',
        bind: {
          value: '{record.visible}'
        }
      }
    }]
  }],

  listeners: {
    resultChanged: 'onRoutingResultChanged'
  },

  initComponent: function () {
    var me = this;
    me.callParent(arguments);

    if (!me.map) {
      me.map = BasiGX.view.component.Map.guess().getMap();
    }
  }

});
