String.prototype.format = function (args) {
	var str = this;
	return str.replace(String.prototype.format.regex, function(item) {
		var intVal = parseInt(item.substring(1, item.length - 1));
		var replace;
		if (intVal >= 0) {
			replace = args[intVal];
		} else if (intVal === -1) {
			replace = "{";
		} else if (intVal === -2) {
			replace = "}";
		} else {
			replace = "";
		}
		return replace;
	});
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

function renderlist()
{
	$.getJSON("readings/readings.json", function(data){
		var listhtml = "<h2>我的阅读列表</h2>";
		for(var i=0; i< data.length; ++i)
		{
			if(data[i]["status"] == 0){
				console.log(data[i]);
				data[i]["end"] = "未读完";
				data[i]["progressP"] = Math.floor(data[i]["progress"] / data[i]["pages"] * 100);
				console.log()
				data[i]["time"] = Math.floor((new Date() - new Date(data[i]["start"]))/(24*3600*1000));
			}
			var itemhtml = genItemHtml(data[i]);
			listhtml　+= itemhtml;
		}
		document.getElementById("maincontainer").innerHTML = listhtml;
	});
}

function genItemHtml(item)
{
	var htmlstr =
		"<div class='row'> \
		     <div class='col-md-3'> \
			     <b>{0}<b/> \
			 </div> \
			 <div class='col-md-2'> \
			     <b>开始:{1}<b/> \
			 </div> \
			<div class='col-md-4'> \
			    <div class='progress'> ({5}/{6}) \
					<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='{2}' aria-valuemin='0' aria-valuemax='100' style='width:{2}%;'>{2}%</div> \
				</div> \
		    </div> \
			<div class='col-md-2'> \
			     <b>结束:{3}<b/> \
			</div> \
		    <div class='col-md-1'> \
			     <b>已用:{4}天<b/> \
			</div> \
		</div>　"
	return htmlstr.format([item["title"], item["start"],item["progressP"],item["end"],item["time"],item["progress"],item["pages"]]);
}
