# ors-ext-client
OpenRouteService client for ExtJs

# Installation

Assuming you already have setup or freshly created an ExtJs 6 application, you need to:

Add all peerDependencies by installing them in the application via npm:

```
npm i @geoext/geoext
npm i @geoext/openlayers-legacy
npm i @terrestris/basigx
npm i @terrestris/d3-util
npm i @turf/turf
npm i moment
npm i openrouteservice-js
```

put them into your `resources/` directory and include them in your project's index.html, e.g.:

```
<script src="resources/lib/momentjs/moment-with-locales.js"></script>
<script src="resources/lib/turfjs-5.1.6/turf.min.js"></script>
<script src="resources/lib/d3-util/browser/main.js"></script>
<script src="resources/lib/openrouteservice-js/ors-js-client.js"></script>
```

Also install required ExtJs libraries via npm:

```
npm i @geoext/geoext
npm i @geoext/openlayers-legacy
npm i @terrestris/basigx
```

and include them in your `app.json`:

```
"builds": {
        "classic": {
            "toolkit": "classic",
            "theme": "theme-neptune",
            "classpath": [
                "app",
                "${toolkit.name}/src",
                "lib/GeoExt/src",
                "lib/BasiGX/src",
                "lib/ors-ext-client/src",
                "lib/ors-ext-client/${toolkit.name}"
            ]
        },

        "modern": {
            "toolkit": "modern",
            "theme": "theme-neptune",
            "classpath": [
                "app",
                "${toolkit.name}/src",
                "lib/GeoExt/src/component",
                "lib/GeoExt/src/data",
                "lib/GeoExt/src/mixin",
                "lib/GeoExt/src/util",
                "lib/BasiGX/src/util/Animate.js",
                "lib/BasiGX/src/util/Application.js",
                "lib/BasiGX/src/util/Color.js",
                "lib/BasiGX/src/util/ConfigParser.js",
                "lib/BasiGX/src/util/Controller.js",
                "lib/BasiGX/src/util/CopyClipboard.js",
                "lib/BasiGX/src/util/CSRF.js",
                "lib/BasiGX/src/util/Filter.js",
                "lib/BasiGX/src/util/Jsonix.js",
                "lib/BasiGX/src/util/Layer.js",
                "lib/BasiGX/src/util/Namespace.js",
                "lib/BasiGX/src/util/Geometry.js",
                "lib/BasiGX/src/util/Map.js",
                "lib/BasiGX/src/util/Object.js",
                "lib/BasiGX/src/util/Routing.js",
                "lib/BasiGX/src/util/SLD.js",
                "lib/BasiGX/src/util/Url.js",
                "lib/BasiGX/src/util/WFS.js",
                "lib/BasiGX/src/view/button/Base.js",
                "lib/BasiGX/src/view/button/ZoomIn.js",
                "lib/BasiGX/src/view/button/ZoomOut.js",
                "lib/BasiGX/src/view/button/ZoomToExtent.js",
                "lib/BasiGX/src/view/component/Map.js",
                "lib/BasiGX/src/view/panel/MobileWindow.js",
                "lib/ors-ext-client/src",
                "lib/ors-ext-client/${toolkit.name}"
            ]
        }
```

Include BasiGX styles in `app.json` under the `sass` block:

```
"src": [
            "sass/src",
            "${toolkit.name}/sass/src",
            "lib/BasiGX/sass/src"
        ]
```
