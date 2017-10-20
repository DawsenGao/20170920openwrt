function initPage(t){if(null==t)return void $("thead").addClass("hidden");$("thead").removeClass("hidden"),$("#disk_container").empty(),disk_data=[];for(var a in t){var i=t[a].hwinfo;i.uuid=a;var e="usb"!=i.dev_type?'<span class="icon-disk"></span>':'<span class="icon-usb"></span>',s=e+" "+(i.part_size?"("+i.part_size+")":"")+" "+(i.vendor||"")+':<br><span style="color: #666;"> '+(i.model||"")+'</span><span style="color: #666;">'+(i.total_size?"("+i.total_size+")":"")+"</span>",d="UUID: "+i.uuid+"&#13;IdVendor: "+(i.idVendor||"")+"&#13;IdProduct: "+(i.idProduct||"")+"&#13;Serial: "+(i.serial||"")+"&#13;bInterfaceNumber: "+(i.bInterfaceNumber||"")+"&#13;class: "+(i["class"]||"")+"&#13;class_prog: "+(i.class_prog||"")+"&#13;subsystem_vendor: "+(i.subsystem_vendor||"")+"&#13;subsystem_device: "+(i.subsystem_device||"")+"&#13;bus_id: "+(i.bus_id||""),n={uuid:t[a].uuid,target:t[a].target,enabled:t[a].enabled,options:t[a].options,device:t[a].device};disk_data.push(n);var o=1==t[a].enabled?"checked":"",r=1==t[a].enabled?UI.Size+":"+t[a].size+"&nbsp;&nbsp;"+UI.Available+":"+t[a].ava+"<br>"+UI.Used+":"+t[a].used+"("+t[a].used_pct+")":"",c='<tr class="text-left"><td title="'+d+'" style="cursor: wait">'+s+"</td><td>"+t[a].device+"</td><td>"+t[a].type+'</td><td><input type="text" class="disk_target" data-id="target_'+a+'" value="'+t[a].target+'"></td><td><div class="switch-ctrl switch-sm"><input type="checkbox" id="device_enabled_'+a+'" '+o+'><label for="device_enabled_'+a+'"><span></span></label></div></td><td>'+r+"</td></tr>";$("#disk_container").append(c),Ha.setFooterPosition(),$(".disk_target").blur(function(){for(var t=$(this).attr("data-id").replace("target_",""),a=$(this).val(),i=0;i<disk_data.length;i++)disk_data[i].uuid==t&&(disk_data[i].target=a)}),$(".switch-sm").find("input").click(function(){for(var t=$(this).prop("id").replace("device_enabled_",""),a=$(this).prop("checked")?1:0,i=0;i<disk_data.length;i++)disk_data[i].uuid==t&&(disk_data[i].enabled=a)})}}function resetData(){$.post("/","app=disk&action=show_fstab",initPage,"json")}var disk_data=[];$.post("/","app=disk&action=show_fstab",initPage,"json"),$("#save_page_btn").click(function(){data={app:"disk",action:"disk_setting",data:disk_data},$.post("/",data,function(t){Ha.showNotify(t),setTimeout(resetData,8e3)},"json")}),$("#reset_page_btn").click(resetData),$(".confirm_trigger").click(Components.setConfirmModal);var confirmMethod={deleteDisk:function(t){var a=t.parent().parent().attr("data-part"),i="app=disk&action=remove_partition&part="+a;$.post("/",i,function(t){Ha.showNotify(t),t.status||setTimeout(function(){window.location.href=t.jump_url},t.seconds)},"json")}};$(".btn_formate").click(function(){$("#type").val($(this).attr("data-ptype")),$("#format_submit").attr("data-part",$(this).parent().parent().attr("data-part"))}),$("#format_submit").click(function(){var t=$(this).attr("data-part"),a="app=disk&action=format_partition&part="+t+"&type="+$("#format_partition_modal").find('[name="type"]').val();$.post("/",a,function(t){Ha.showNotify(t),t.status||setTimeout(function(){window.location.href=t.jump_url},t.seconds),$("#format_partition_modal").modal("hide")},"json")}),$(".btn_add").click(function(){$("#add_submit").attr("data-dev",$(this).attr("data-dev"))}),$("#add_submit").click(function(){var t="app=disk&action=add_new_partition&dev="+$(this).attr("data-dev");t+="&"+$("#add_new_partition_modal").find("form").serialize(),$.post("/",t,function(t){Ha.showNotify(t),t.status||setTimeout(function(){window.location.href=t.jump_url},t.seconds),$("#add_new_partition_modal").modal("hide")},"json")}),$(".btn_swap_mount").click(function(){var t=$(this).parent().parent().attr("data-part"),a=$(this).attr("data-action"),i="app=disk&action="+a+"&part="+t;$.post("/",i,function(t){Ha.showNotify(t),t.status||setTimeout(function(){window.location.href=t.jump_url},t.seconds)},"json")});