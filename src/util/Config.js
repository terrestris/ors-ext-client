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
 * Util to get the routing configs from the available routing windows.
 *
 * @class Ors.util.Config
 */
Ext.define('Ors.util.Config', {

  statics: {

    getRoutingConfig: function () {
      var routingWindows = Ext.ComponentQuery.query('ors-window-classic-routing');
      if (routingWindows.length === 0) {
        routingWindows = Ext.ComponentQuery.query('ors-window-fleet-routing');
        if (routingWindows.length === 0) {
          routingWindows = Ext.ComponentQuery.query('ors-window-isochrone-routing');
        }
      }
      var routingWindow = routingWindows[0];
      if (!routingWindow) {
        return {};
      }

      return routingWindow.opts;
    }

  }
});
