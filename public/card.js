(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <div class=\"col-sm\">\n                        <div class=\"btn btn-outline-primary btn-block\">\n                            "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"col-sm-4\">\n    <div class=\"card\">\n        <div class=\"card-body\">\n            <p class=\"card-text\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p>\n            <div class=\"row text-center\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();