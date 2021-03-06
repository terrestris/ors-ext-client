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
 * @class Ors.model.Isochrone
 */
Ext.define('Ors.model.Isochrone', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.Model'
  ],

  fields: [
    { name: 'value', type: 'int', convert: null },
    { name: 'center', convert: null },
    { name: 'area', type: 'number' },
    { name: 'reachfactor', type: 'number' },
    { name: 'group_index', type: 'number', convert: null },
    { name: 'geometry', convert: null },
    // value is either seconds or metres, depending on range_type
    { name: 'range_type', type: 'string', defaultValue: 'time' },
    { name: 'visible', type: 'boolean', defaultValue: true },
    { name: 'color', type: 'string', convert: null }
  ]
});
