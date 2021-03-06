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
 * @class Ors.form.FleetRoutingSettings
 */
Ext.define('Ors.form.FleetRoutingSettings', {
  extend: 'Ext.form.Panel',
  xtype: 'ors-form-fleet-routing-settings',

  requires: [
    'Ors.grid.RoutingJobs',
    'Ors.grid.RoutingVehicles'
  ],

  width: '100%',

  bodyPadding: '10 5 0 5',

  cls: 'fleet-routing-settings',

  defaults: {
    padding: '0 0 10 0',
    flex: 1,
    maxHeight: 200
  },

  items: [{
    xtype: 'ors-grid-routing-jobs',
    cls: 'routing-brighter-panel',
    bind: {
      store: '{routingjobs}'
    }
  }, {
    xtype: 'ors-grid-routing-vehicles',
    cls: 'routing-brighter-panel',
    bind: {
      store: '{routingvehicles}'
    }
  }]
});
