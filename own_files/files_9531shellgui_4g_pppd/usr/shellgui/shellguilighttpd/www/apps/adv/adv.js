!function(){function t(){$.get("/?app=adv&action=upnp_config",function(t){if(!t.code){if($("#upnp_switch").prop("disabled",!1),t.switch_status)if($("#disabled_upnp_text").addClass("hidden"),$("#upnp_switch").prop("checked",!0),s=!0,t.list.length<=0)$("#upnp_dev_list").addClass("hidden"),$("#none_upnp_text,#upnp_dev_list_header,#upnp_dev_list_title").removeClass("hidden");else{$("#upnp_dev_list,#upnp_dev_list_header,#upnp_dev_list_title").removeClass("hidden"),$("#none_upnp_text").addClass("hidden"),$("#upnp_dev_list").empty();for(var d=0;d<t.list.length;d++){var a=t.list[d],e="<tr><td>"+a.proto+"</td><td>"+a.applet+"</td><td>"+a.lan_ip+"</td><td>"+a.lan_port+"</td><td>"+a.wan_port+"</td></tr>";$("#upnp_dev_list").append(e)}}else s=!1,$("#upnp_switch").prop("checked",!1),$("#disabled_upnp_text").removeClass("hidden"),$("#upnp_dev_list,#upnp_dev_list_header,#upnp_dev_list_title,#none_upnp_text").addClass("hidden");$(".upnp_text").addClass("hidden")}},"json")}function d(){$.get("/?app=adv&action=get_ddns_list",function(t){if(!t.code)if(t.list.length<=0)$("#none_ddns_text").removeClass("hidden"),$("#ddns_rec_list").addClass("hidden");else{$("#none_ddns_text").addClass("hidden"),$("#ddns_rec_list").removeClass("hidden"),$("#ddns_rec_list").empty();for(var a=0;a<t.list.length;a++){var e;e=t.list[a].enabled?"checked":"";var n=formatTime(new Date(1e3*t.list[a].lastupdate),"yyyy-MM-dd hh:mm"),r='<tr id="ddns_rec_'+t.list[a].config+'"><td>'+t.list[a].domain+"</td><td>"+n+'<a href="" class="update_time" id="update_time_'+t.list[a].config+'">('+UI.Manual_update+')</a></td><td><div class="switch-ctrl switch-sm"><input type="checkbox" name="switch_ddns_status" id="switch_ddns_'+t.list[a].config+'" '+e+'><label for="switch_ddns_'+t.list[a].config+'"><span></span></label></div></td><td><button class="btn btn-xs btn-info edit_rec_btn" id="ddns_edit_btn_'+t.list[a].config+'"  data-toggle="modal" data-target="#ddnsModal">'+UI.Edit+'</button><button class="btn btn-xs btn-danger delete_rec_btn" id="ddns_delete_btn_'+t.list[a].config+'" data-toggle="modal" data-target="#confirmModal">'+UI.Delete+"</button></td></tr>";$("#ddns_rec_list").append(r)}$(".delete_rec_btn").click(function(){var t=$(this).prop("id").replace("ddns_delete_btn_","");$("#confirm_title").html(UI.delete_DDNS_record),$("#confirm_text").html(UI.Do_you_want_delete_this_DDNS_record),_="app=adv&action=del_a_ddns&config="+t,p="ddns"}),$(".edit_rec_btn").click(function(){$("#ddnsModal").find(".has-error").removeClass("has-error"),$("#ddnsModal").find(".help-block").addClass("hidden"),$("#submit_ddns_btn").prop("disabled",!1);var t,d=$(this).prop("id").replace("ddns_edit_btn_","");$("#submit_ddns_btn").attr("data-submit-target","edit"),$.get("/?app=adv&action=edit_ddns&config="+d,function(d){t=d,$("#ddnsModalLabel").html(UI.Edit_DDNS_record),$("#service_name").find('[value="'+t.servicename+'"]').prop("selected","selected"),$("#ddns-username").val(t.username),$("#ddns-pwd").val(t.password),$("#ddns-host").val(t.domain).prop("disabled",!0),$("#ddns-check-interval").val(t.check_interval),$("#ddns-force-update").val(t.force_interval),$("#ddns-wan-zone").val(t.ip_network?t.ip_network:""),$("#ddns-ip-source").prop("checked","web"==t.ip_source)},"json")}),$(".update_time").click(function(){var t=$(this).prop("id").replace("update_time_","");return $.post("/","app=adv&action=update_ddns&config="+t,function(t){Ha.showNotify(t),d()},"json"),!1}),$('[name="switch_ddns_status"]').click(function(){var t=$(this).prop("checked"),d=$(this).prop("id").replace("switch_ddns_","");t?$.get("/?app=adv&action=ddns_switch&enabled=1&config="+d,function(t){t.code||Ha.showNotify({status:0,msg:"已经开启了"})},"json"):$.get("/?app=adv&action=ddns_switch&enabled=0&config="+d,function(t){t.code||Ha.showNotify({status:0,msg:"已经关闭了"})},"json")})}},"json")}function a(){$.get("/?app=adv&action=dhcp_query",function(t){if(!t.code)if(t.list.length<=0)$("#none_dhcp_text").removeClass("hidden"),$("#dhcp_ip_list").addClass("hidden");else{$("#none_dhcp_text").addClass("hidden"),$("#dhcp_ip_list").removeClass("hidden"),$("#dhcp_ip_list").empty();for(var d=0;d<t.list.length;d++){var a='<tr id="dhcp_'+t.list[d].tag+'"><td>'+t.list[d].dname+"</td><td>"+t.list[d].ip+"</td><td>"+t.list[d].mac+'</td><td><button class="btn btn-danger btn-xs remove_dhcp_btn" id="confirm_'+t.list[d].tag+'" data-toggle="modal" data-target="#confirmModal">'+UI.Do_Uncombined+"</button></td></tr>";$("#dhcp_ip_list").append(a)}$(".remove_dhcp_btn").click(function(){var t=$(this).prop("id").split("_").pop();$("#confirm_title").html(UI.Do_Uncombined),$("#confirm_text").html(UI.Do_you_want_uncombined_this),_="app=adv&action=dhcp_uncombine&tag="+t,p="dhcp"})}},"json")}function e(){$.get("/?app=adv&action=get_portforward_list",function(t){if(!t.code)if(t.list.length<=0)$("#none_portfw_text").removeClass("hidden"),$("#port_forward_list").addClass("hidden");else{$("#none_portfw_text").addClass("hidden"),$("#port_forward_list").removeClass("hidden"),$("#port_forward_list").empty();for(var d=0;d<t.list.length;d++){var a='<tr id="port_forward_'+t.list[d].config+'"><td>'+t.list[d].name+"</td><td>"+t.list[d].proto+"</td><td>"+t.list[d].src_dport+"</td><td>"+t.list[d].dest_ip+"</td><td>"+t.list[d].dest_port+'</td><td><button class="btn btn-xs btn-info edit_portfw_btn" id="eidt_portfw_'+t.list[d].config+'" data-toggle="modal" data-target="#portForwardingModal">'+UI.Edit+'</button><button class="btn btn-xs btn-danger delete_portfw_btn" id="delete_portfw_'+t.list[d].config+'" data-toggle="modal" data-target="#confirmModal">'+UI.Delete+"</button></td></tr>";$("#port_forward_list").append(a)}$(".delete_portfw_btn").click(function(){var t=$(this).prop("id").split("_").pop();$("#confirm_title").html(UI.Delete_Port_forward_record),$("#confirm_text").html(UI.Do_you_want_delete_this_Port_forward_record),_="app=adv&action=del_a_portforward&config="+t,p="port"}),$(".edit_portfw_btn").click(function(){var t,d=$(this).prop("id").split("_").pop();$("#portForwardingModal").find(".has-error").removeClass("has-error"),$("#portForwardingModal").find(".help-block").addClass("hidden"),$("#submit_portfw_btn").prop("disabled",!1).attr("data-submit-target","edit"),$.get("/?app=adv&action=get_a_portforward&config="+d,function(d){t=d.item,$("#portfw_config").val(t.config),$("#portForwardingModalLabel").html(UI.Edit_Port_forward_record),$("#port-fwd-protocol").find('[value="'+t.proto+'"]').prop("selected","selected"),$("#port-fwd-name").val(t.name),$("#outer-port").val(t.src_dport),$("#inner-ip-addr").val(t.dest_ip),$("#inner-port").val(t.dest_port)},"json")})}},"json")}function n(){$.get("/?app=adv&action=get_rangeforward_list",function(t){if(!t.code)if(t.list.length<=0)$("#none_rangefw_text").removeClass("hidden"),$("#range_forward_list").addClass("hidden");else{$("#none_rangefw_text").addClass("hidden"),$("#range_forward_list").removeClass("hidden"),$("#range_forward_list").empty();for(var d=0;d<t.list.length;d++){var a='<tr id="range_forward_'+t.list[d].config+'"><td>'+t.list[d].name+"</td><td>"+t.list[d].proto+"</td><td>"+t.list[d].start_port+"</td><td>"+t.list[d].end_port+"</td><td>"+t.list[d].dest_ip+'</td><td><button class="btn btn-xs btn-info edit_rangefw_btn" id="edit_rangefw_btn_'+t.list[d].config+'" data-toggle="modal" data-target="#rangeForwardingModal">'+UI.Edit+'</button><button class="btn btn-xs btn-danger delete_rangefw_btn" id="delete_rangefw_btn_'+t.list[d].config+'" data-toggle="modal" data-target="#confirmModal">'+UI.Delete+"</button></td></tr>";$("#range_forward_list").append(a)}$(".delete_rangefw_btn").click(function(){var t=$(this).prop("id").split("_").pop();$("#confirm_title").html(UI.Delete_Range_forward_record),$("#confirm_text").html(UI.Do_you_want_delete_this_Range_forward_record),_="app=adv&action=del_a_rangeforward&config="+t,p="range"}),$(".edit_rangefw_btn").click(function(){var t,d=$(this).prop("id").split("_").pop();$("#rangeForwardingModal").find(".help-block").addClass("hidden"),$("#rangeForwardingModal").find(".has-error").removeClass("has-error"),$("#submit_rangefw_btn").prop("disabled",!1).attr("data-submit-target","edit"),$.get("/?app=adv&action=get_a_rangeforward&config="+d,function(d){t=d.item,$("#rangefw_config").val(t.config),$("#rangeForwardingModalLabel").html(UI.Edit_Range_forward_record),$("#range-fwd-protocol").find('[value="'+t.proto+'"]').prop("selected","selected"),$("#range-fwd-name").val(t.name),$("#start-port").val(t.start_port),$("#end-port").val(t.end_port),$("#range-fwd-inner-ip-addr").val(t.dest_ip)},"json")})}},"json")}function r(){$.get("/?app=adv&action=get_dmzStatus",function(t){t.code||($("#dmz_ip").val(t.ip),t.switch_status?(l=!0,$("#dmz_switch").prop("checked",!0),$("#dmz_help_text").addClass("hidden"),$("#dmz_form_container").removeClass("hidden")):(l=!1,$("#dmz_switch").prop("checked",!1),$("#dmz_help_text").removeClass("hidden"),$("#dmz_form_container").addClass("hidden")))},"json")}function i(){t(),d(),a(),e(),n(),r()}function o(t){$.get("/?app=adv&action=switch_status&switch="+t,function(t){Ha.showNotify(t)},"json")}i();var s;setInterval(function(){s&&t()},1e4),$("#upnp_switch").click(function(){s?($("#close_upnp_text").removeClass("hidden"),o(0),$(this).prop("disabled",!0),setTimeout(t,1e3)):($("#open_upnp_text").removeClass("hidden"),o(1),$(this).prop("disabled",!0),setTimeout(t,1e3))});var l;$("#dmz_switch").click(function(){l?($("#dmz_help_text").removeClass("hidden"),$("#dmz_form_container").addClass("hidden"),l=!l,$.post("/","app=adv&action=change_dmzStatus&switch_statusfalse=",Ha.showNotify,"json")):($("#dmz_help_text").addClass("hidden"),$("#dmz_form_container").removeClass("hidden"),l=!l,$("#dmz_status_text").html(UI.Uneffected))}),$("[data-validate]").bind("keyup blur",Validate.checkInput),$("form").submit(function(){return $(this).find("[data-validate]").trigger("keyup").trigger("blur"),!1}),$("#dmz_form").submit(function(){$("#dmz_ip").val();if($(this).find(".has-error").length)return!1;var t="app=adv&action=save_dmzStatus&"+$(this).serialize();$.post("/",t,function(t){Ha.showNotify(t),$("#dmz_status_text").html(UI.Effected)},"json")});var _,p;$("#confirm_submit").click(function(){$.post("/",_,function(t){switch(Ha.showNotify(t),p){case"ddns":d();break;case"dhcp":a();break;case"port":e();break;case"range":n()}},"json")}),$("#dhcp_btn").click(function(){$("#dev-name").val(""),$("#ip-addr").val(""),$("#mac-addr").val(""),$("#dhcpModal").find(".help-block").addClass("hidden"),$("#dhcpModal").find(".has-error").removeClass("has-error"),$("#add_dhcp_btn").prop("disabled",!1)}),$("#add_dhcp_form").submit(function(){var t=$("#add_dhcp_form").serialize(),d="app=adv&action=dhcp_combine&"+t;$.trim($("#dev-name").val()),$("#ip-addr").val(),$("#mac-addr").val();return!$(this).find(".has-error").length&&($("#dhcpModal").modal("hide"),$.post("/",d,function(t){Ha.showNotify(t),a()},"json"),$("#dev-name").val(""),$("#ip-addr").val(""),$("#mac-addr").val(""),!1)}),$("#add_ddns_rec_btn").click(function(){$("#ddns-username").val(""),$("#ddns-pwd").val(""),$("#ddns-host").val("").prop("disabled",!1),$("#ddns-check-interval").val(10),$("#ddns-force-update").val(0),$("#ddns-wan-zone").val(function(){return $(this).first("option").val()}),$("#ddns-ip-source").prop("checked",!1),$("#ddnsModalLabel").html(UI.Add_DDNS_record),$("#ddnsModal").find(".help-block").addClass("hidden"),$("#ddnsModal").find(".has-error").removeClass("has-error"),$("#submit_ddns_btn").prop("disabled",!1)}),$("#add_ddns_form").submit(function(){$("#ddns-host").prop("disabled",!1);var t,a=$("#add_ddns_form").serialize();t="add"==$("#submit_ddns_btn").attr("data-submit-target")?"app=adv&action=add_ddns&":"app=adv&action=edit_a_ddns&",data=t+a;$.trim($("#ddns-username").val()),$("#ddns-pwd").val(),$("#ddns-host").val(),$("#ddns-check-interval").val(),$("#ddns-force-update").val();if(!$(this).find(".has-error").length)return $("#ddnsModal").modal("hide"),$.post("/",data,function(t){Ha.showNotify(t),d(),$("#submit_ddns_btn").attr("data-submit-target","add"),$("#add_ddns_form").find("input").val("")},"json"),!1}),$("#add_portfw_btn").click(function(){$("#port-fwd-name").val(""),$("#outer-port").val(""),$("#inner-ip-addr").val(""),$("#inner-port").val(""),$("#portForwardingModalLabel").html(UI.Add_Port_forward_record),$("#portForwardingModal").find(".help-block").addClass("hidden"),$("#portForwardingModal").find(".has-error").removeClass("has-error"),$("#submit_portfw_btn").prop("disabled",!1)}),$("#add_portfw_form").submit(function(){var t,d=$("#add_portfw_form").serialize();t="add"==$("#submit_portfw_btn").attr("data-submit-target")?"app=adv&action=new_portforward&":"app=adv&action=edit_portforward&";var a=t+d;$.trim($("#port-fwd-name").val()),$("#outer-port").val(),$("#inner-ip-addr").val(),$("#inner-port").val();$(this).find(".has-error").length||$.post("/",a,function(t){$("#portForwardingModal").modal("hide"),Ha.showNotify(t),e(),$("#submit_portfw_btn").attr("data-submit-target","add"),$("#add_portfw_form").find("input").val("")},"json")}),$("#add_rangefw_btn").click(function(){$("#range-fwd-name").val(""),$("#start-port").val(""),$("#end-port").val(""),$("#range-fwd-inner-ip-addr").val(""),$("#rangeForwardingModalLabel").html(UI.Add_Range_forward_record),$("#rangeForwardingModal").find(".help-block").addClass("hidden"),$("#rangeForwardingModal").find(".has-error").removeClass("has-error"),$("#submit_rangefw_btn").prop("disabled",!1)}),$("#add_rangefw_form").submit(function(){var t,d=$("#add_rangefw_form").serialize();t="add"==$("#submit_rangefw_btn").attr("data-submit-target")?"app=adv&action=new_rangeforward&":"app=adv&action=edit_rangeforward&";var a=t+d;$.trim($("#range-fwd-name").val()),$("#start-port").val(),$("#end-port").val(),$("#range-fwd-inner-ip-addr").val();if(!$(this).find(".has-error").length)return $("#rangeForwardingModal").modal("hide"),$.post("/",a,function(t){Ha.showNotify(t),n(),$("#submit_rangefw_btn").attr("data-submit-target","add"),$("#add_rangefw_form").find("input").val("")},"json"),!1})}();