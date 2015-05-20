var xmlDoc;
loadxml();

    function loadxml()
    {	
	fs = require('fs');
	var DOMParser = require('xmldom').DOMParser;
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","http://127.0.0.1/test/BRAVO.xml",false);
	xmlhttp.send();
	xmlhttp.async = false;
	xmlDoc=xmlhttp.responseText;

	var doc = new DOMParser().parseFromString(xmlDoc,'text/xml');
	
      	
		trips= doc.getElementsByTagName('trip');
		outstop = doc.getElementsByTagName('outboundLeg');
		instop = doc.getElementsByTagName('inboundLeg');
		price = doc.getElementsByTagName('amount');
		
		var csvRows = [];
		var departuredatetime;
		var depdate;
		var newdeparturedatetime;
		var arrivaldatetime;
		var arrdate;
		var newarrivaldatetime;
		
		csvRows.push("stop ,direction ,transportCode ,depStationCode ,arrStationCode ,daparture date ,departure time ,arrival date ,arrival time ,duration ,currency ,priceAdults ,deeplink ,supplier\r\n");

		for (i=0;i<trips.length;i++)
		{
			for (j=0;j<=parseInt(outstop[i].childNodes[1].textContent);j++)
			{
				departuredatetime = outstop[i].childNodes[2].childNodes[j].childNodes[2].childNodes[1].textContent.split("T");
				depdate = departuredatetime[0].split("-");
				newdeparturedatetime = depdate[2] + "/" + depdate[1] + "/" + depdate[0] + "," + departuredatetime[1].substring(0,5);
				arrivaldatetime = outstop[i].childNodes[2].childNodes[j].childNodes[3].childNodes[1].textContent.split("T");
				arrdate = arrivaldatetime[0].split("-");
				newarrivaldatetime = arrdate[2] + "/" + arrdate[1] + "/" + arrdate[0] + "," + arrivaldatetime[1].substring(0,5);
				
				csvRows.push(j + ",OUT," + outstop[i].childNodes[2].childNodes[j].childNodes[1].textContent + outstop[i].childNodes[2].childNodes[j].childNodes[0].textContent + "," + outstop[i].childNodes[2].childNodes[j].childNodes[2].childNodes[0].textContent + "," + outstop[i].childNodes[2].childNodes[j].childNodes[3].childNodes[0].textContent + "," + newdeparturedatetime + "," + newarrivaldatetime + "," + outstop[i].childNodes[0].textContent + "," + price[i].childNodes[0].textContent + "," + price[i].childNodes[1].textContent + "," + trips[i].childNodes[1].textContent + "," + outstop[i].childNodes[2].childNodes[j].childNodes[1].textContent + "\r\n");
			}
	
			for (k=0;k<=parseInt(instop[i].childNodes[1].textContent);k++)
			{
				departuredatetime = instop[i].childNodes[2].childNodes[k].childNodes[2].childNodes[1].textContent.split("T");
				depdate = departuredatetime[0].split("-");
				newdeparturedatetime = depdate[2] + "/" + depdate[1] + "/" + depdate[0] + "," + departuredatetime[1].substring(0,5);
				arrivaldatetime = instop[i].childNodes[2].childNodes[k].childNodes[3].childNodes[1].textContent.split("T");
				arrdate = arrivaldatetime[0].split("-");
				newarrivaldatetime = arrdate[2] + "/" + arrdate[1] + "/" + arrdate[0] + "," + arrivaldatetime[1].substring(0,5);
				
				csvRows.push(k + ",RET," + instop[i].childNodes[2].childNodes[k].childNodes[1].textContent + instop[i].childNodes[2].childNodes[k].childNodes[0].textContent + "," + instop[i].childNodes[2].childNodes[k].childNodes[2].childNodes[0].textContent + "," + instop[i].childNodes[2].childNodes[k].childNodes[3].childNodes[0].textContent + "," + newdeparturedatetime + "," + newarrivaldatetime + "," + instop[i].childNodes[0].textContent + "," + price[i].childNodes[0].textContent + "," + price[i].childNodes[1].textContent + "," + trips[i].childNodes[1].textContent + "," + instop[i].childNodes[2].childNodes[k].childNodes[1].textContent + "\r\n");
			}
		
		 }

		var stream = fs.createWriteStream("BRAVO.csv");
		stream.once('open', function(fd) {
		for ( m = 0; m < csvRows.length; m++ )
		{
  		stream.write(csvRows[m]);
		}
  		stream.end();
		});
	
    }