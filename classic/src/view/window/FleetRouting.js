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
 * @class Ors.view.window.FleetRouting
 */
Ext.define('Ors.view.window.FleetRouting', {
  extend: 'Ext.window.Window',
  xtype: 'ors-window-fleet-routing',

  requires: [
    'Ext.container.Container',
    'Ext.form.field.ComboBox',
    'Ext.button.Button',
    'Ext.button.Segmented',
    'Ext.drag.Target',
    'Ext.drag.Source',
    'Ext.menu.Menu',
    'BasiGX.view.component.Map',
    'Ors.view.window.FleetRoutingModel',
    'Ors.view.window.FleetRoutingController',
    'Ors.view.container.FleetRoutingResult',
    'Ors.view.form.FleetRoutingSettings',
    'Ors.view.button.AvoidArea'
  ],

  controller: 'ors-window-fleet-routing',

  viewModel: {
    type: 'ors-window-fleet-routing'
  },

  waypointLayerName: 'routing-waypoint-layer',

  routeLayerName: 'routing-route-layer',

  routeSegmentLayerName: 'routing-route-segment-layer',

  avoidAreaLayerName: 'routing-avoid-area-layer',

  map: null,

  /** The interaction for drawing the avoid area */
  avoidAreaDrawInteraction: null,

  /** The name of the routingResultPanel */
  routingResultPanelName: 'fleetrouting-result-panel',

  /** The name of the elevationProfilePanel*/
  elevationProfilePanelName: 'routing-elevationprofile-panel',

  /** The name of the layer for elevation interaction */
  elevationLayerName: 'routing-elevation-layer',

  maxHeight: 900,
  width: 600,

  items: [{
    xtype: 'ors-form-fleet-routing-settings',
    flex: 1,
    collapsible: true,
    bind: {
      title: '{i18n.settingsTitle}'
    },
    fbar: [{
      xtype: 'segmentedbutton',
      name: 'routingAlgorithmButton',
      bind: {
        value: '{routingAlgorithm}'
      },
      defaults: {
        padding: '3 10'
      },
      items: [{
        iconCls: 'fa fa-angle-up',
        value: 'classic',
        bind: {
          tooltip: '{i18n.routingAlgorithmClassicTooltip}',
          pressed: '{routingAlgorithm === "classic"}'
        }
      }, {
        iconCls: 'fa fa-angle-double-up',
        value: 'forceAll',
        bind: {
          tooltip: '{i18n.routingAlgorithmForceAllTooltip}',
          pressed: '{routingAlgorithm === "forceAll"}'
        }
      }]
    }, {
      xtype: 'ors-button-avoidarea',
      listeners: {
        avoidAreaDrawEnd: 'onAvoidAreaDrawEnd'
      }
    }, {
      xtype: 'button',
      name: 'optimizeRouteButton',
      bind: {
        disabled: '{disableOptimizeRoute}',
        text: '{i18n.computeFleetRoutingButtonText}'
      },
      handler: 'optimizeRoute'
    }]
  }, {
    xtype: 'ors-container-fleetroutingresult',
    name: 'fleetrouting-result-panel',
    routeLayerName: 'routing-route-layer',
    routeSegmentLayerName: 'routing-route-segment-layer',
    elevationProfilePanelName: 'routing-elevationprofile-panel',
    elevationLayerName: 'routing-elevation-layer'
  }
  ],

  layout: 'vbox',

  bind: {
    title: '{i18n.fleetRoutingTitle}'
  },

  collapsible: true,
  resizable: true,
  constrainHeader: true,

  listeners: {
    expand: function () {
      // HBD: after collapse/expand extjs thinks the user manually
      // resized the window and stops automatic window resize if
      // child component sizes are updated. We can apparently
      // reset this by setting the sizes to null...
      this.setSize(null, null);
    },
    setContextMenuType: 'setContextMenuType',
    resetContextMenu: 'onResetContextMenu',
    boxready: 'onBoxReady',
    close: 'onWindowClose',
    updateWayPointLayer: 'updateWayPointLayer',
    updateOptimizeTrigger: 'onUpdateOptimizeTrigger',
    zoomToWayPointLayer: 'zoomToWayPointLayer'
  },

  initComponent: function () {
    var me = this;

    me.callParent(arguments);

    if (!me.map) {
      me.map = BasiGX.view.component.Map.guess().getMap();
    }
  }
});
