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
 * @class Ors.button.AvoidArea
 */
Ext.define('Ors.button.AvoidArea', {
    extend: 'Ext.button.Button',
    xtype: 'ors-button-avoidarea',
    iconCls: 'x-fa fa-ban',

    requires: [
        'Ors.button.AvoidAreaController',
        'Ors.button.AvoidAreaModel'
    ],

    controller: 'ors-button-avoidarea',

    viewModel: {
        type: 'ors-button-avoidarea'
    },

    avoidAreaLayerName: 'routing-avoid-area-layer',

    bind: {
        tooltip: '{i18n.addAvoidArea}'
    },
    menu: [
        {
            bind: {
                text: '{i18n.drawAvoidArea}'
            },
            handler: 'drawAvoidArea'
        },
        {
            bind: {
                text: '{i18n.selectAvoidAreaFromLayer}'
            },
            handler: 'selectAvoidAreaFromLayer'
        },
        {
            // intentionally hidden button
            xtype: 'filebutton',
            listeners: {
                afterrender: 'uploadButtonAfterRender'
            },
            accept: '.geojson,.json',
            hidden: true
        },
        {
            // triggers the hidden button
            bind: {
                text: '{i18n.uploadGeoJson}'
            },
            handler: function(item) {
                var bb = item.up().down('filebutton');
                bb.fileInputEl.dom.click();
            }
        },
        {
            bind: {
                text: '{i18n.deleteAvoidArea}',
                visible: '{deleteAvoidAreaButtonVisible}'
            },
            handler: 'clearAvoidAreaSource'
        }
    ]
});
