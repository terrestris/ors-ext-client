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
 * @class Ors.panel.RoutingBreak
 */
Ext.define('Ors.panel.RoutingBreak', {
  extend: 'Ext.panel.Panel',

  xtype: 'ors-panel-routing-break',

  requires: [
    'Ext.Object',
    'Ext.form.field.TextArea',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Display',
    'Ext.button.Button',
    'Ors.grid.RoutingTimeWindow'
  ],

  viewModel: {
    data: {
      i18n: {
        serviceLabel: 'Service',
        emptyServiceText: 'Service',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Description',
        removeBreakTooltip: 'Remove Break',
        timeWindowsLabel: 'Time Windows',
        breakErrorText: 'Break Error'
      }
    }
  },

  recId: null,
  break: null,

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  border: true,

  items: [{
    xtype: 'displayfield',
    name: 'break-error-field',
    hidden: true,
    bind: {
      value: '<i class="fa fa-exclamation-circle" style="color: #cf4c35"></i> {i18n.breakErrorText}'
    }
  }, {
    xtype: 'textarea',
    name: 'description',
    bind: {
      fieldLabel: '{i18n.descriptionLabel}',
      emptyText: '{i18n.descriptionPlaceholder}'
    }
  }, {
    xtype: 'combobox',
    name: 'service',
    forceSelection: true,
    queryMode: 'local',
    bind: {
      fieldLabel: '{i18n.serviceLabel}',
      emptyText: '{i18n.emptyServiceText}'
    },
    // we fill the store on initComponent
    store: {
      fields: [{
        name: 'duration', type: 'int'
      }, {
        name: 'title', type: 'string',
        convert: function (v, r) {
          var d = r.data.duration;
          var duration = moment.duration(d, 'seconds');
          return duration.as('hours').toFixed(1) + 'h';
        }
      }]
    },
    displayField: 'title',
    valueField: 'duration',
    editable: false
  }, {
    xtype: 'label',
    bind: {
      text: '{i18n.timeWindowsLabel}: *'
    }
  }, {
    xtype: 'ors-grid-routing-time-window',
    name: 'time_windows',
    header: false,
    flex: 1
  }, {
    xtype: 'button',
    iconCls: 'fa fa-trash-o',
    bind: {
      tooltip: '{i18n.removeBreakTooltip}'
    },
    handler: function (btn) {
      var breakPanel = btn.up('ors-panel-routing-break');
      var breaksPanel = btn.up('ors-panel-routing-breaks');
      if (breakPanel && breaksPanel) {
        breaksPanel.fireEvent('removeBreak', breakPanel.break);
      }
    }
  }],

  onDescriptionChanged: function (textarea, description) {
    var me = this;
    if (!me.break) {
      return;
    }
    me.break.set('description', description);
  },

  onServiceChanged: function (box, service) {
    var me = this;
    if (!me.break) {
      return;
    }
    me.break.set('service', service);
  },

  onTimeWindowChanged: function (store) {
    var me = this;
    if (!me.break) {
      return;
    }
    // we have to use the store here, as we want to make use
    // of its store methods later
    me.break.set('timeWindowsStore', store);
  },

  initComponent: function () {
    var me = this;
    me.callParent();

    var routingWindow = Ext.ComponentQuery.query('ors-window-fleet-routing')[0];
    var routingOpts = {};
    if (routingWindow && routingWindow.opts) {
      routingOpts = routingWindow.opts;
    }
    var fleetRoutingOpts = {};
    if (routingOpts && routingOpts.fleetRouting) {
      fleetRoutingOpts = routingOpts.fleetRouting;
    }
    var jobOpts = {};
    if (fleetRoutingOpts.job) {
      jobOpts = fleetRoutingOpts.job;
    }

    // 24 hours
    var maxBreakDuration = 60 * 60 * 24;
    if (Ext.isDefined(jobOpts.maxBreakDuration)) {
      maxBreakDuration = jobOpts.maxBreakDuration;
    }

    var service = me.down('[name=service]');
    if (service) {
      var serviceStore = service.getStore();
      if (serviceStore) {
        // fill options for service duration
        var durations = [{ duration: 0 }];
        do {
          var prevDuration = durations[durations.length - 1].duration;
          durations.push({ duration: prevDuration + (30 * 60) });
        } while (
          durations[durations.length - 1].duration < maxBreakDuration
        );

        serviceStore.loadRawData(durations);
      }
    }

    var timeWindows = me.down('[name=time_windows]');
    if (timeWindows) {
      var timeWindowsStore = timeWindows.getStore();
      if (timeWindowsStore) {
        timeWindowsStore.addListener('datachanged', me.onTimeWindowChanged, me);
        timeWindowsStore.addListener('update', me.onTimeWindowChanged, me);
      }
    }

    var description = me.down('[name=description]');
    if (description) {
      description.addListener('change', me.onDescriptionChanged, me);
    }

    if (service) {
      service.addListener('change', me.onServiceChanged, me);
    }

    if (me.break) {
      Ext.Object.each(me.break.getData(), function (k, v) {
        var field = me.down('[name=' + k + ']');
        if (!field) {
          return;
        }

        switch (k) {
          case 'time_windows':
            var store = field.getStore();
            if (store) {
              store.setAllFromTimestamp(v);
            }
            break;
          default:
            field.setValue(v);
            break;
        }
      });
    }
  }
});
