(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                    <div class=\"col-sm\">\n\n                        <a href=\"/post/"
    + alias1(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "/vote/"
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                            "
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-sm-4\">\n    <div class=\"card\">\n        <div class=\"card-body\">\n            <a class=\"card-text\" href=\"/post/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n            <div class=\"row text-center\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true,"useDepths":true});
})();