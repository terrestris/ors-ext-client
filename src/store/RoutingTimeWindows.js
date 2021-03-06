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
 * @class Ors.store.RoutingTimeWindows
 */
Ext.define('Ors.store.RoutingTimeWindows', {
  extend: 'Ext.data.Store',

  requires: [
    'Ext.Array',
    'Ors.util.Date'
  ],

  alias: 'store.ors-routingtimewindows',

  fields: [
    { name: 'startDay', type: 'date', dateFormat: 'time' },
    { name: 'startTime', type: 'date', dateFormat: 'time' },
    { name: 'endDay', type: 'date', dateFormat: 'time' },
    { name: 'endTime', type: 'date', dateFormat: 'time' }
  ],

  /**
   * Get all time windows as array of UNIX timestamp tuples.
   * Each tuple consists of a starting and a ending timestamp.
   *
   * Note: The unit for the timestamps is seconds, not milliseconds.
   *
   * This is the format needed by vroom api.
   * See https://github.com/VROOM-Project/vroom/blob/master/docs/API.md#time-windows
   * We use `absolute values`.
   *
   * @returns {[Int, Int][]} Array of timestamp tuples.
   */
  getAllAsTimestamp: function () {
    var me = this;
    var timeWindows = Ext.Array.map(me.getData().items, function (d) {
      var startDay = moment(d.get('startDay'));
      var endDay = moment(d.get('endDay'));
      var startTime = moment(d.get('startTime'));
      var endTime = moment(d.get('endTime'));

      var start = startDay.clone()
        .hour(startTime.hour())
        .minute(startTime.minute());

      var end = endDay.clone()
        .hour(endTime.hour())
        .minute(endTime.minute());

      var startUtc = Ors.util.Date.getUtcMoment(start);
      var endUtc = Ors.util.Date.getUtcMoment(end);
      var startUtcSeconds = parseInt(startUtc.valueOf() / 1000, 10);
      var endUtcSeconds = parseInt(endUtc.valueOf() / 1000, 10);
      return [startUtcSeconds, endUtcSeconds];
    });
    return timeWindows;
  },

  /**
   * Overwrite the store with given timestamps.
   * This method converts the tuples of UNIX timestamps to
   * Date objects.
   *
   * Existing store records will be removed by this method.
   *
   * Note: The unit of each timestamp is seconds, not milliseconds.
   *
   * @param {[Int, Int][]} timestamps Array of timestamp tuples.
   */
  setAllFromTimestamp: function (timestamps) {
    var me = this;
    var dates = Ext.Array.map(timestamps, function (t) {
      return {
        startDay: t[0] * 1000,
        startTime: t[0] * 1000,
        endDay: t[1] * 1000,
        endTime: t[1] * 1000
      };
    });
    me.loadRawData(dates);
  },

  /**
   * Check if all entries are valid.
   * I.e. if the starting date is not later than the
   * ending date.
   *
   * @returns {Boolean} True, if all entries are valid. False otherwise.
   */
  isValid: function () {
    var me = this;
    var records = me.getData().items;
    var hasInvalid = Ext.Array.some(records, function (d) {
      var startDay = moment(d.get('startDay'));
      var endDay = moment(d.get('endDay'));
      var startTime = moment(d.get('startTime'));
      var endTime = moment(d.get('endTime'));

      if (startDay.isAfter(endDay, 'day')) {
        return true;
      }

      var comparableBase = moment();
      var comparableStartTime = comparableBase.clone()
        .hours(startTime.hours())
        .minutes(startTime.minutes());
      var comparableEndTime = comparableBase.clone()
        .hours(endTime.hours())
        .minutes(endTime.minutes());

      if (startDay.isSame(endDay, 'day') && comparableStartTime.isAfter(comparableEndTime)) {
        return true;
      }

      return false;

    });

    return !hasInvalid;
  }
});
