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
 * @class Ors.grid.RoutingJobs
 */
Ext.define('Ors.grid.RoutingJobs', {
  extend: 'Ext.grid.Panel',
  xtype: 'ors-grid-routing-jobs',

  requires: [
    'Ext.grid.column.Action',
    'Ext.form.field.FileButton',
    'Ext.button.Button',
    'Ext.button.Segmented',
    'Ext.Array',
    'BasiGX.util.Animate',
    'Ors.window.RoutingJob',
    'Ors.store.RoutingJobs'
  ],

  viewModel: {
    data: {
      i18n: {
        title: 'Jobs',
        emptyJobText: 'No Jobs',
        priorityColumnText: 'Priority',
        addressColumnText: 'Address',
        descriptionColumnText: 'Description',
        editJobTooltip: 'Edit Job',
        addJobTooltip: 'Add Job',
        removeJobTooltip: 'Remove Job',
        uploadTooltip: 'Upload Jobs',
        downloadTooltip: 'Download Jobs'
      }
    }
  },

  enableColumnHide: false,
  enableColumnMove: false,

  bind: {
    title: '{i18n.title}',
    emptyText: '{i18n.emptyJobText}'
  },

  store: {
    type: 'ors-routingjobs'
  },

  columns: {
    items: [{
      dataIndex: 'priority',
      bind: {
        text: '{i18n.priorityColumnText}'
      }
    }, {
      dataIndex: 'address',
      sortable: false,
      bind: {
        text: '{i18n.addressColumnText}'
      },
      flex: 1,
      renderer: function (address) {
        if (address) {
          return '<span data-qtip="' + address.address + '">' + address.address + '</span>';
        }
      }
    }, {
      dataIndex: 'description',
      sortable: false,
      bind: {
        text: '{i18n.descriptionColumnText}'
      },
      flex: 1,
      renderer: function (description) {
        return '<span data-qtip="' + description + '">' + description + '</span>';
      }
    }, {
      xtype: 'actioncolumn',
      width: 50,
      items: [{
        iconCls: 'x-fa fa-cog',
        // TODO tooltips are not bindable here, so we have to find a simple
        //      way of adding them here. i18n.editJobTooltip
        name: 'edit-job-action',
        handler: function (grid, rowIndex) {
          var rec = grid.getStore().getAt(rowIndex);
          // make sure there is always only a single window opened
          var win = Ext.ComponentQuery.query('ors-window-routing-job')[0];

          if (!win) {
            var job = Ext.clone(rec.getData());
            Ext.create({
              xtype: 'ors-window-routing-job',
              job: job,
              listeners: {
                updatedJob: {
                  fn: function (data, updatedJob) {
                    var me = this;
                    var jobsGrid = me.up('ors-grid-routing-jobs');
                    jobsGrid.onUpdatedJob(data, updatedJob);
                  },
                  scope: this
                }
              }
            }).show();
          } else {
            BasiGX.util.Animate.shake(win);
          }

        }
      }, {
        iconCls: 'x-fa fa-trash-o',
        // TODO tooltips are not bindable here, so we have to find a simple
        //      way of adding them here. i18n.removeJobTooltip
        name: 'remove-job-action',
        handler: function (grid, rowIndex) {
          var win = Ext.ComponentQuery.query('ors-window-routing-job')[0];

          if (!win) {
            grid.getStore().removeAt(rowIndex);
          } else {
            BasiGX.util.Animate.shake(win);
          }

        }
      }]
    }]
  },

  buttons: [{
    xtype: 'segmentedbutton',
    allowToggle: false,
    defaults: {
      padding: '3 10'
    },
    items: [{
      xtype: 'filebutton',
      iconCls: 'fa fa-upload',
      bind: {
        tooltip: '{i18n.uploadTooltip}'
      },
      listeners: {
        afterrender: 'afterJobUploadRender'
      }
    }, {
      xtype: 'button',
      iconCls: 'fa fa-download',
      bind: {
        tooltip: '{i18n.downloadTooltip}'
      },
      handler: 'exportJobs'
    }]
  }, {
    iconCls: 'fa fa-plus',
    bind: {
      tooltip: '{i18n.addJobTooltip}'
    },
    handler: function (btn) {
      var view = btn.up('ors-grid-routing-jobs');
      if (!view) {
        return;
      }

      var win = Ext.ComponentQuery.query('ors-window-routing-job')[0];

      if (!win) {
        Ext.create({
          xtype: 'ors-window-routing-job',
          listeners: {
            updatedJob: {
              fn: function (data, updatedJob) {
                var me = this;
                var grid = me.up('ors-grid-routing-jobs');
                grid.onUpdatedJob(data, updatedJob);
              },
              scope: this
            }
          }
        }).show();
      } else {
        BasiGX.util.Animate.shake(win);
      }
    }
  }],

  listeners: {
    beforedestroy: function () {
      var win = Ext.ComponentQuery.query('ors-window-routing-job')[0];
      if (win) {
        win.close();
      }
    },
    addJob: function (data) {
      var me = this;
      var store = me.getStore();
      if (store) {
        if (data) {
          store.add(data);
        } else {
          store.add({});
        }
      }
    }
  },

  onUpdatedJob: function (data, job) {
    var me = this;
    var store = me.getStore();
    if (store) {
      if (job) {
        var rec = store.getById(job.id);
        rec.set(data);
      } else {
        store.add(data);
      }
    }
  }

});
