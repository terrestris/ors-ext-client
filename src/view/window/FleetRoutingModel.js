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
 * @class Ors.window.FleetRoutingModel
 */
Ext.define('Ors.window.FleetRoutingModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.ors-window-fleet-routing',

  requires: [
    'Ors.store.WayPoints',
    'Ors.store.RoutingInstructions',
    'Ors.store.RoutingSummaries',
    'Ors.store.GeocodingSuggestions',
    'Ors.store.FleetRoutingSummary',
    'Ors.store.RoutingJobs',
    'Ors.store.RoutingVehicles'
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
    },
    fleetroutingsummary: {
      type: 'ors-fleetroutingsummary'
    },
    routingjobs: {
      type: 'ors-routingjobs'
    },
    routingvehicles: {
      type: 'ors-routingvehicles'
    }
  },

  data: {
    i18n: {
      fleetRoutingTitle: 'Fleet Routing',
      computeFleetRoutingButtonText: 'Compute',
      elevationBtnText: 'Elevation Profile',
      downloadButtonText: 'Download',
      errorGeoCoding: 'Geocoding Error',
      errorRoutingRequest: 'Routing Error',
      errorDownloadRoute: 'Download Error',
      routingSummaryDetailsButton: 'Details',
      addAvoidArea: 'Avoid Area',
      uploadGeoJson: 'Upload GeoJSON',
      deleteAvoidArea: 'Remove Area',
      drawAvoidArea: 'Draw Area',
      selectAvoidAreaFromLayer: 'Select Area from Layer',
      errorFileUpload: 'Upload Error',
      errorUploadedGeometryType: 'Geometry Type Error',
      errorTooManyFeatures: 'Feature Count Error',
      errorUploadedFileExtension: 'File Extension Error',
      errorZeroFeatures: 'Zero Features Error',
      errorGetFeatureInfo: 'Feature Info Error',
      errorNoLayerFound: 'No Layer Found Error',
      errorNoPolygonChosen: 'No Polygon Chosen Error',
      errorFleetRouting: 'Fleet Routing Error',
      errorInvalidJobsJson: 'Invalid Jobs JSON Error',
      errorInvalidVehiclesJson: 'Invalid Vehicles JSON Error',
      infoImportedJobs: 'Imported Jobs',
      infoInvalidJobs: 'Invalid Jobs',
      infoImportedVehicles: 'Imported Vehicles',
      infoInvalidVehicles: 'Invalid Vehicles',
      addJobContextText: 'Add job',
      addVehicleContextText: 'Add vehicle',
      setCurrentJobContextText: 'Set current job',
      setCurrentVehicleStartContextText: 'Set current vehicle start',
      setCurrentVehicleEndContextText: 'Set current vehicle end',
      totalDuration: 'Duration',
      totalDrivingDuration: 'Driving duration',
      totalServiceDuration: 'Service duration',
      totalWaitingDuration: 'Waiting duration',
      numberjobsMissing: 'Jobs Missing',
      fleetRoutingSummary: 'Routing Summary',
      routesHeading: 'Fleet Routing',
      vehicleText: 'Vehicle',
      startText: 'From',
      viaText: 'Via',
      duration: 'Duration',
      distance: 'Distance',
      startTime: 'Start Time',
      arrivalTime: 'Arrival Time',
      settingsTitle: 'Settings',
      routingAlgorithmClassicTooltip: 'Classic Algorithm',
      routingAlgorithmForceAllTooltip: 'Force All Algorithm'
    },
    routingProfile: 'driving-car',
    routeStyle: undefined,
    routeSegmentStyle: undefined,
    waypointStyle: undefined,
    jobMarkerStyle: undefined,
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
    deleteAvoidAreaButtonVisible: false,
    routingAlgorithm: 'classic',
    disableOptimizeRoute: true
  }
});
