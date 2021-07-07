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
 * @class Ors.window.ClassicRoutingModel
 */
Ext.define('Ors.window.ClassicRoutingModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ors-window-classic-routing',

    requires: [
        'Ors.store.WayPoints',
        'Ors.store.RoutingInstructions',
        'Ors.store.RoutingSummaries',
        'Ors.store.GeocodingSuggestions'
    ],

    stores: {
        waypoints: {
            type: 'ors-waypoints'
        },
        routinginstructions: {
            type: 'ors-routinginstructions'
        },
        routingsummaries: {
            type: 'ors-routingsummaries'
        },
        geocodingsuggestions: {
            type: 'ors-geocodingsuggestions'
        }
    },

    data: {
        i18n: {
            classicRoutingtitle: 'Routing',
            startFieldTitle: 'From',
            viaFieldTitle: 'Via',
            endFieldTitle: 'To',
            addEmptyPoint: 'Add waypoint',
            addStartPoint: 'Add startpoint',
            addViaPoint: 'Add viapoint',
            addEndPoint: 'Add endpoint',
            routingProfileFieldTitle: 'Profile',
            computeRouteButtonText: 'Compute',
            elevationBtnText: 'Elevation Profile',
            downloadButtonText: 'Download',
            errorGeoCoding: 'Geocoding Error',
            errorRoutingRequest: 'Routing Error',
            errorDownloadRoute: 'Download Error',
            routingSummaryDetailsButton: 'Details',
            profileCarText: 'By car',
            profileBycicleText: 'By bicycle',
            profileWalkingText: 'By foot',
            routesHeading: 'Routes'
        },
        routingProfile: 'driving-car',
        routingPreference: 'recommended',
        routeStyle: undefined,
        routeSegmentStyle: undefined,
        waypointStyle: undefined,
        avoidAreaStyle: undefined,
        avoidAreaOpacity: 0.5,
        waypointFontSize: undefined,
        rightClickCoordinate: undefined,
        mapContextMenu: null,
        waypointPopup: null,
        startValue: undefined,
        targetValue: undefined,
        elevationStyle: undefined,
        showRoutingResults: false,
        routingOpts: null,
        language: 'de',
        showRoutingInstructions: false,
        deleteAvoidAreaButtonVisible: false
    }
});
