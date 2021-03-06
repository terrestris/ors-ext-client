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
 * @class Ors.store.WayPoints
 */
Ext.define('Ors.store.WayPoints', {
    extend: 'Ext.data.Store',
    requires: [
        'Ors.model.WayPoint'
    ],

    alias: 'store.ors-waypoints',

    model: 'Ors.model.WayPoint',

    /**
     * It is necessary to have different dummy points,
     * because identical records are only stored once
     * in the wayPointStore.
     */
    dummyStartPoint: {
        address: '',
        latitude: undefined,
        longitude: null
    },

    dummyEndPoint: {
        address: '',
        latitude: null,
        longitude: undefined
    },

    dummyViaPoint: {
        address: '',
        latitude: null,
        longitude: null
    },

    /**
     * Get the coordinates of all waypoints as array.
     *
     * @returns {[Number, Number][]} Array of [long, lat] coordinates.
     */
    getCoordinatesArray: function() {
        var me = this;
        var coordinates = [];
        me.each(function(rec) {
            coordinates.push(rec.get('coordinate'));
        });
        return coordinates;
    },

    /**
     * Check if all records are valid.
     *
     * Records are invalid if either latitude or longitude
     * are null or undefined.
     */
    isValid: function() {
        var me = this;
        var idx = me.findBy(function(rec) {
            return !rec.get('hasLongitude') || !rec.get('hasLatitude');
        });
        return idx === -1;
    },

    /**
     * Replace a waypoint.
     *
     * @param {Object} point Waypoint.
     * @returns {Ext.data.Model} The record of the added waypoint.
     */
    replacePoint: function(index, point) {
        var me = this;
        me.removeAt(index);
        return me.insert(index, point)[0];
    },

    /**
     * Set the start point.
     *
     * @param {Object} point Waypoint.
     * @returns {Ext.data.Model} The record of the added waypoint.
     */
    setStartPoint: function(point) {
        var me = this;
        return me.replacePoint(0, point);
    },

    /**
     * Add a via point.
     *
     * @param {Object} point Waypoint.
     * @returns {Ext.data.Model} The record of the added waypoint.
     */
    addViaPoint: function(point) {
        var me = this;
        return me.insert(me.count() - 1, point)[0];
    },

    /**
     * Set the end point.
     *
     * @param {Object} point Waypoint.
     * @returns {Ext.data.Model} The record of the added waypoint.
     */
    setEndPoint: function(point) {
        var me = this;
        return me.replacePoint(me.count() - 1, point);
    }
});
