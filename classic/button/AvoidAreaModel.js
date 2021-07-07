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
 * @class Ors.button.AvoidAreaModel
 */
Ext.define('Ors.button.AvoidAreaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ors-button-avoidarea',

    data: {
        i18n: {
            addAvoidArea: 'Avoid Area',
            uploadGeoJson: 'Upload GeoJSON',
            deleteAvoidArea: 'Delete Area',
            drawAvoidArea: 'Draw Area',
            selectAvoidAreaFromLayer: 'Select Area from Layer',
            errorFileUpload: 'File Upload Error',
            errorUploadedGeometryType: 'Geometry Type Error',
            errorTooManyFeatures: 'Feature Count Error',
            errorUploadedFileExtension: 'File Extension Error',
            errorZeroFeatures: 'Zero Features Error',
            errorGetFeatureInfo: 'Feature Info Error',
            errorNoLayerFound: 'No Layer Error',
            errorNoPolygonChosen: 'No Polygon Error'
        },
        deleteAvoidAreaButtonVisible: false
    }
});
