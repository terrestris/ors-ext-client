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
    controller: 'ors-form-modern-classic-routing-settings',

    requires: [
        'Ors.form.ModernClassicRoutingSettingsController'
    ],

    width: '100%',

    bodyPadding: 10,
    items: [],
    listeners: {
        painted: 'onBoxReady'
    }
});
