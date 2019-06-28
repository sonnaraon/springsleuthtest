var afsCctvLayer = (function(){
    // {
    //     key : "1395816212109",
    //     ReqType :  "2",
    //     type : "ex",
    //     MinX : "127.100000",
    //     MinY : "34.100000%20",
    //     MaxX : "128.890000",
    //     MaxY : "35.100000"

    // }

    function afsCctvLayer_(input) {
        this.key = 1395816212109; //open key
        this.zoom = 0;
        this.ReqType = 2;  
        this.type = "ex";  //ex : ��ӵ���
        // this.MinX = 123.2731068;
        // this.MinY = 31.63122246;
        // this.MaxX = 131.5915256;
        // this.MaxY = 43.39185594;
        
        this.MinX = 126.78615503557987;
        this.MinY = 37.38911967227641;
        this.MaxX = 127.22712658945356;
        this.MaxY = 37.81511217504307;
        this.data = {}
      }

      afsCctvLayer_.prototype.getCctvInArea = function(){
          var result = {};
          var self = this;


          return $.ajax({
            	// url : 'http://openapi.its.go.kr:8081/api/NCCTVInfo?key=' + this.key + '&ReqType='+ this.ReqType +'&MinX='+this.MinX+'&MaxX='+this.MaxX+'&MinY='+this.MinY+'&MaxY='+this.MaxY+'&type='+this.type,
                url : './lib/js/cctv/cctv.xml',
                async : true,
                dataType : "xml",
                success: function(_xml){
                    console.log("CCTV ��ġ ��ȯ ����")
                    var rtn = {};
                    var data = $(_xml).find("data")
                    var dataLen = data.length
                    for( var i=0;i<dataLen;i++){
                        var thisTag = $(data[i]);
                        rtn[thisTag.find("cctvname").text()] = {
                            url : thisTag.find("cctvurl").text(),
                            x : thisTag.find("coordx").text(),
                            y : thisTag.find("coordy").text()
                        }
                    }
                    self.data = rtn;
                },
                error : function(){
                    console.log("CCTV ��ġ ��ȯ ����")
                }
            })
     } 

     afsCctvLayer_.prototype.makeMarkers = function(cctvs){
        var makers = new Array();
        var cameraIcon = L.icon({
            iconUrl : './lib/css/images/marker-icon-cctv.png',
            iconSize: [40, 40],
            iconAnchor: [22, 60],
            popupAnchor: [-3, -76]
        })
        console.log( "icon" , cameraIcon )

        if(!$.isEmptyObject(cctvs)){
            $.each(cctvs,function(){
                makers.push(
                    L.marker([this.y, this.x],{icon : cameraIcon})
                    .bindPopup('<video autoplay width = "290px"><source src = "'+this.url+'" type = "video/mp4"></video>')
                )
            })
        }
         return makers;
        
     }

     afsCctvLayer_.prototype.getCctvLayer = function(makers){
        return L.layerGroup(makers);
     }
     afsCctvLayer_.prototype.initLayer = function(){
        var makers = this.makeMarkers(this.data);
        return this.getCctvLayer(makers);
     }

    return afsCctvLayer_;
})();