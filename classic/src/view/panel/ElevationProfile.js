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
 * @class Ors.view.panel.ElevationProfile
 */
Ext.define('Ors.view.panel.ElevationProfile', {
    extend: 'Ext.panel.Panel',

    xtype: 'ors-panel-elevationprofile',

    requires: [
        'Ext.Component',
        'Ext.container.Container',
        'Ors.view.panel.ElevationProfileController',
        'Ors.view.panel.ElevationProfileModel',
        'Ors.view.button.ElevationProfileSwitcher'
    ],

    controller: 'ors-panel-elevationprofile',

    viewModel: {
        type: 'ors-panel-elevationprofile'
    },

    listeners: {
        mouseout: {
            element: 'el',
            fn: 'clearElevationProfile'
        },
        rerender: 'createChart',
        dataChanged: 'onDataChanged',
        changeGraph: 'changeGraph',
        resize: 'handleResize'
    },

    bind: {
        title: '{title}'
    },

    height: 230,
    width: 900,

    elevationContainerName: 'elevationprofile-container',

    indicatorBoxName: 'elevationprofile-indicator-box',

    elevationLayerName: null,

    routeLayerName: 'routing-route-layer',

    layout: 'vbox',

    defaults: {
        width: '100%'
    },

    items: [{
        xtype: 'container',
        name: 'chartSwitcher',
        items: [{
            xtype: 'ors-button-elevationprofileswitcher',
            blacklist: ['id', 'zIndex', 'opacity']
        }]
    }, {
        xtype: 'component',
        name: 'elevationprofile-container',
        flex: 1
    }, {
        xtype: 'container',
        name: 'elevationprofile-indicator-box',
        height: 20,
        padding: '0 0 0 5',
        defaults: {
            padding: '0 10 0 0'
        },
        layout: 'hbox',
        bind: {
            hidden: '{!showIndicatorBox}'
        },
        items: [{
            xtype: 'container',
            bind: {
                html: '<b>{distanceLabel}:</b>{distance}km'
            }
        }, {
            xtype: 'container',
            bind: {
                html: '<b>{displayAttribute}:</b>{displayValue}'
            }
        }]
    }, {
        // Empty dummy container so the flexbox will
        // initially set the right size for the
        // elevationprofile-container.
        xtype: 'container',
        height: 20,
        bind: {
            hidden: '{showIndicatorBox}'
        }
    }]
});
