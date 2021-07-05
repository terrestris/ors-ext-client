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
 * @class Ors.view.panel.ElevationProfileModel
 */
Ext.define('Ors.view.panel.ElevationProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ors-panel-elevationprofile',

    data: {
        title: '',
        xLabel: '',
        distanceLabel: '',
        distance: undefined,
        elevationLabel: '',
        profileSwitcherText: '',
        displayValue: undefined,
        showIndicatorBox: false,
        routingSummary: undefined,
        pointFeatures: undefined,
        displayAttribute: 'elevation',
        classifications: undefined
    }
});