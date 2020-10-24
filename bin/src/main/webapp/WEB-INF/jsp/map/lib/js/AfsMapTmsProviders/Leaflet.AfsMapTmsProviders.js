(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['leaflet'], factory);
	} else if (typeof modules === 'object' && module.exports) {
		// define a Common JS module that relies on 'leaflet'
		module.exports = factory(require('leaflet'));
	} else {
		// Assume Leaflet is loaded into global object L already
		factory(L);
	}
}(this, function (L) {
  'use strict';
  var wgs84_grid = "+proj=lcc +lat_1=30 +lat_2=60 +lat_0=0 +lon_0=126 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs";
  var crsOption = {
    origin: [-35527048.949519001, 33688767.500765003],
    resolutions: [ 176389.241667372, 88194.6208336861, 44097.310416843, 22577.8229334236,
                      14675.5849067253, 11288.9114667118, 8466.68360003386, 5644.45573335591,
                      3386.67344001354, 2822.22786667795, 2257.78229334236, 2116.67090000846,
                      1411.11393333897, 705.556966669489, 352.778483334744, 176.389241667372,
                      88.1946208336861, 44.097310416843, 22.5778229334236, 11.2889114667118,
                      5.64445573335591, 2.82222786667795]
  };
  L.Proj.CRS.Afs = new L.Proj.CRS('u3:7001', wgs84_grid, crsOption);

  L.TileLayer.AfsMap = L.TileLayer.extend({
    options: {
      continuousWorld: true
    },
    
    initialize: function(urlTemplate, options) {
      L.TileLayer.prototype.initialize.call(this, urlTemplate, options);
    },

    getTileUrl: function(tilePoint) {
      var zoom = tilePoint.z;
      var layerName = this._getLayerVariant(zoom);
      
      if (layerName == undefined || layerName == '') return '/map/lib/images/blank.png';
      
      return L.Util.template(this._url, L.Util.extend({
        p: 'LCC',
        l: layerName,
        s: this._getSubdomain(tilePoint),
        z: this._getCurZoomLevelStr(tilePoint.z),
        x: this._getHexa8DigitStr(tilePoint.x),
        y: this._getHexa8Digit53DivideStr(tilePoint.y)
      }, this.options));
    },

    _projectedTileSize: function(zoom) {
      return (this.options.tileSize / this.crs.scale(zoom));
    },
    
    _getLayerVariant: function(zoom) {
      var layerName = '';
      var layer = this.options.variantName;
      var layerGroup = AFSMAP_CONFIG.TILE_MAP_DISPLAY_LEVEL;
      var layerSetGroup = AFSMAP_CONFIG.TILE_MAP_LAYER_SET;
      if (layerGroup[layer]) {
        layerName = layer;
      } else if (layerSetGroup[layer]) {
        layerSetGroup[layer].forEach(function (elem) {
          if (zoom >= elem.minZoomLevel && zoom <= elem.maxZoomLevel) {
            layerName = elem.layerName;
          }
        });
      } else {
        if (console) {
          console.error("Occured error at _getLayerVariant() : "+layer+"�� �ĺ����� �ʴ� Back map layer / Back map layer set �Դϴ�.");
        }
      }
      return layerName;
    },
    
    /**
     * ������ 8�ڸ� 0���� Padding�� 16���� ���ڿ� ��ȯ
     * @method afsmap.prototype.getHexa8DigitStr
     * @return {String} hexa8DigitString
     * @description
     */
    _getHexa8DigitStr: function(num) {
      return ("00000000"+num.toString(16)).slice(-8) ;
    },
    
    /**
     * ������ 8�ڸ� 0���� Padding�� 16���� ���ڿ��� ���� �� 5�ڸ�, 3�ڸ��� �и��� ���ڿ� ��ȯ
     * @method afsmap.prototype.getHexa8Digit53DivideStr
     * @return {String} hexa8Digit53DivideString
     * @description
     */
    _getHexa8Digit53DivideStr: function(num) {
      return ("00000000"+num.toString(16)).slice(-8,-3) + "/" + ("00000000"+num.toString(16)).slice(-3) ;
    },
    
    /**
     * 0�� Padding�� ���ڸ� ZoomLevel ���ڿ� ��ȯ
     * @method afsmap.prototype.getCurZoomLevelStr
     * @return {String} CurrentZoomLevelString
     * @description
     */
    _getCurZoomLevelStr: function(num) {
      return ("00"+num).slice(-2);
    }

  });

  L.TileLayer.AfsMapProvider = L.TileLayer.AfsMap.extend({
    initialize: function (arg, options) {
      var providers = L.TileLayer.AfsMapProvider.providers;
      var parts = arg.split('.');
      var providerName = parts[0];
      var variantName = parts[1];

      if (!providers[providerName]) {
        throw 'No such provider (' + providerName + ')';
      }

      var provider = {
        url: providers[providerName].url,
        crs: providers[providerName].crs,
        options: providers[providerName].options
      };

      // overwrite values in provider from variant.
      if (variantName && 'variants' in providers[providerName]) {
        if (!(variantName in providers[providerName].variants)) {
          throw 'No such variant of ' + providerName + ' (' + variantName + ')';
        }
        var variant = providers[providerName].variants[variantName];
				var variantOptions;
				if (typeof variant === 'string') {
					variantOptions = {
						variant: variant
					};
				} else {
					variantOptions = variant.options;
				}
        provider = {
          url: variant.url || provider.url,
          crs: variant.crs || provider.crs,
          options: L.Util.extend({}, provider.options, variantOptions)
        };
      } else if (typeof provider.url === 'function') {
        provider.url = provider.url(parts.splice(1).join('.'));
      }

			var forceHTTP = window.location.protocol === 'file:' || provider.options.forceHTTP;
			if (provider.url.indexOf('//') === 0 && forceHTTP) {
				provider.url = 'http:' + provider.url;
			}

			// If retina option is set
			if (provider.options.retina) {
				// Check retina screen
				if (options.detectRetina && L.Browser.retina) {
					// The retina option will be active now
					// But we need to prevent Leaflet retina mode
					options.detectRetina = false;
				} else {
					// No retina, remove option
					provider.options.retina = '';
				}
			}

      // replace attribution placeholders with their values from toplevel provider attribution,
      // recursively
      var attributionReplacer = function (attr) {
        if (attr.indexOf('{attribution.') === -1) {
          return attr;
        }
        return attr.replace(/\{attribution.(\w*)\}/,
          function (match, attributionName) {
            return attributionReplacer(providers[attributionName].options.attribution);
          }
        );
      };
      provider.options.attribution = attributionReplacer(provider.options.attribution);
      provider.options.variantName = variantName;

      // Compute final options combining provider options with any user overrides
      var layerOpts = L.Util.extend({}, provider.options, options);
      L.TileLayer.AfsMap.prototype.initialize.call(this, provider.url, layerOpts);

    }
  });
  

  /**
   * Definition of providers.
   * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
   */

  //jshint maxlen:220
  L.TileLayer.AfsMapProvider.providers = {
    AfsMap: {
      url: 'http://'+ AFSMAP_CONFIG.TileMapBaseDomain +'/' + AFSMAP_CONFIG.TileMapBaseURL + '/{p}_{l}/L{z}/R{y}/C{x}.png',
      crs: L.Proj.CRS.Afs,
      options: {
        maxZoom: 18,
        minZoom: 6,
        subdomains: AFSMAP_CONFIG.TileMapBaseURL,
        continuousWorld: true,        
        attribution: 'Map data &copy; <a href="http://afso.kma.go.kr">AfsMap</a>'
      }
    }
  };

  L.tileLayer.afsMapProvider = function (provider, options) {
    return new L.TileLayer.AfsMapProvider(provider, options);
  };

	return L;
}));

