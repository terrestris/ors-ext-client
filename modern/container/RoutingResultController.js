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
 * @class Ors.container.ModernRoutingResultController
 */
Ext.define('Ors.container.ModernRoutingResultController', {
    extend: 'Ors.container.RoutingResultController',
    alias: 'controller.ors-container-modernroutingresult',

    /**
     * Handler for the routingResultChanged event.
     *
     * @param {Object} newResult The new result as GeoJSON.
     */
    onRoutingResultChanged: function(newResult) {
        var me = this;
        var view = me.getView();

        if (newResult) {
            me.clearRoutes();
            me.addRouteToMap(newResult);
            me.zoomToRoute();
            me.clearRoutingSummaries();
            me.addRoutingSummary(newResult);
            me.useFirstRoutingSummary();
        } else {
            me.clearRoutingInstructions();
            me.clearRoutingSummaries();
            view.hide();
        }
    },

    /**
     * Use first routing summary for the
     * routing instructions and elevation panel.
     */
    useFirstRoutingSummary: function() {
        var me = this;
        var view = me.getView();
        var vm = view.lookupViewModel();

        var summaryStore = vm.get('routingsummaries');
        if (!summaryStore) {
            return;
        }

        var firstSummary = summaryStore.first();

        if (firstSummary) {
            me.updateRoutingInstructions(firstSummary);

            var elevationPanel = view.down('[name=' + view.elevationProfilePanelName + ']');
            if (elevationPanel) {
                elevationPanel.fireEvent('dataChanged', firstSummary.getData());
            }

            var summaryGrid = view.down('[name=routing-summary-grid]');
            if (summaryGrid) {
                summaryGrid.setSelection(firstSummary);
            }
        }
    },

    /**
     * Handle the settings button click.
     */
    onSettingsButtonClick: function() {
        var me = this;
        var view = me.getView();
        view.hide();
        var routingSettings = Ext.ComponentQuery.query('[name=routing-panel]')[0];
        if (routingSettings) {
            routingSettings.show();
        }
    },

    /**
     * Handle the painted event of the view.
     */
    onPainted: function() {
        var me = this;
        var view = me.getView();

        var map = view.map;

        if (!map) {
            return;
        }

        map.on('singleclick', me.hideViews.bind(me));
    },

    /**
     * Hide all views, i.e. routing setting and routing results,
     * incl. map cleanup.
     */
    hideViews: function() {
        var me = this;
        var view = me.getView();
        var map = view.map;

        map.un('singleclick', me.hideViews.bind(me));
        view.hide();

        var routingSettings = Ext.ComponentQuery.query('[name=routing-panel]')[0];
        if (routingSettings) {
            routingSettings.fireEvent('clearRouting');
        }
    },

    addElevationPanel: function() {
        // noop
        Ext.emptyFn();
    }
});
