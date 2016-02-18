var app={markdowns:[{name:"Getting Started",file:"getting-started.md"},{name:"Workflows",file:"workflows.md"},{name:"Quote Process",file:"quote-process.md"},{name:"Invoice process",file:"invoice-process.md"},{name:"QA",file:"qa.md"},{name:"Project List",file:"project-list.md"},{name:"Rate Card",file:"ratecard.md"}],savedData:[],template:{},checkList:[],init:function($){app.detectHashChange(),app.dataLoadingAnimation(),app.animateCheckIconOnHover(),app.initTemplate(),app.changeTopic(),app.parseMarkDown(),app.readMoreDescription(),app.searchHandler(),app.showHideSubmenu(),app.updateMenuOnChecklistEvent(),app.menuScrollBarInit(),app.mobileHamburgerInit()},onResize:function(){},animateCheckIconOnHover:function(){$(document).on("svgsLoaded",function(){$(".check").each(function(e,t){$(t).find("svg path").each(function(e,t){var a=t.getTotalLength();$(t).attr("stroke-dasharray",a+" "+a),$(t).attr("stroke-dashoffset",0),$(t).attr("class","path-"+e),$(t).attr("data-total",a)})})}),$(document).on("mouseenter",".check",function(){var e=$(this);e.hasClass("checked")||(e.hasClass("checked")?(e.removeClass("animate-checking"),e.addClass("animate-unchecking")):(e.removeClass("animate-unchecking"),e.addClass("animate-checking")),setTimeout(function(){e.addClass("first-animation-done")},0))}),$(document).on("mouseleave",".check",function(){$(this).removeClass("animate-checking"),$(this).removeClass("animate-unchecking"),$(this).removeClass("first-animation-done")}),$(document).on("click touchstart",".check",function(){var e=$(this).attr("data-id");return $(this).hasClass("checked")?($(this).removeClass("checked"),$(this).addClass("unchecked"),app.updateChecklist(e,!1)):($(this).removeClass("unchecked"),$(this).addClass("checked"),app.updateChecklist(e,!0)),!1})},updateChecklist:function(e,t){t?$.each(app.checkList,function(){$.each(this,function(){this.ID==e&&(this.checked=!0,$(document).trigger("checkListUpdated"))})}):$.each(app.checkList,function(){$.each(this,function(){this.ID==e&&(this.checked=!1,$(document).trigger("checkListUpdated"))})})},updateMenuOnChecklistEvent:function(){$(document).on("checkListUpdated",function(){$(".side-menu li").removeClass("checked"),$.each(app.checkList,function(e,t){var a=0;$.each(this,function(){this.checked&&($(".side-menu li[data-id="+this.ID+"]").addClass("checked"),a++)});var n=this.length,i=a/n*100;$('.main-category[data-id="'+e+'"]').find(".progress span").css({width:i+"%"})})})},initTemplate:function(){var e={content:$("[data-template=content]"),sideMenuTitle:$("[data-template=side-menu-title]"),sideMenu:$("[data-template=side-menu]"),sideMenuChildren:$("[data-template=side-menu-children]"),searchResult:$("[data-template=search-result]")};app.template.mainContentTemplate=e.content.html(),e.content.html(""),app.template.sideMenuChildrenTemplate=e.sideMenuChildren.html(),e.sideMenuChildren.html("{{ children }}"),app.template.sideMenuTitleTemplate=e.sideMenuTitle.html(),e.sideMenuTitle.html("{{ titles }}"),app.template.sideMenuTemplate=e.sideMenu.html(),e.sideMenu.html(""),app.template.searchResultTemplate=e.searchResult.html(),e.searchResult.html("")},dataLoadingAnimation:function(){var e=new SVGLoader(document.getElementById("loader"),{speedIn:600,easingIn:mina.easeinout});e.show(),$(document).on("contentInitiated",function(){$("#loader").removeClass("opening"),e.hide(),setTimeout(function(){$(document).trigger("pageAnimationDone")},600)})},initContentHandler:function(e){jQuery.each(e,function(e){if(void 0!==this.link){var t='<div class="main-category"><h3 class="category-title"><a href="'+this.link+'" target="_blank">'+this.title+"</a></h3></div>";$(t).appendTo("[data-template=side-menu]")}else{var a=this.title,n=this.categories[0].name,i=this.categories[0].description,s=this.categories[0].items;jQuery("body").addClass("on-first-page");var c=app.contentLinkInit("desc",0,e);if(void 0!==i){var r=app.template.mainContentTemplate,o=i;r=r.replace("{{ title }}",n),r=r.replace("{{ content }}",o+c),r=r.replace("{{ id }}","desc-0"),r=r.replace("{{ class }}","no-check"),r='<div class="content-desc-0-'+e+'" data-id="desc-0-'+e+'">'+r+"</div>",$(r).appendTo("[data-template=content]")}else if(s.length>0){var r=app.template.mainContentTemplate,n=$(s[0].title).text(),o=s[0].content;r=r.replace("{{ title }}",n),r=r.replace("{{ content }}",o+c),r=r.replace("{{ id }}","0-0"),r=r.replace("{{ class }}",""),r='<div class="content-0-0'+e+'" data-id="0-0'+e+'">'+r+"</div>",$(r).appendTo("[data-template=content]")}var d=[];$.each(this.categories,function(t,a){var n=app.template.sideMenuTitleTemplate,i=a.name,s=[];$.each(a.items,function(a,n){var i=app.template.sideMenuChildrenTemplate;i=i.replace("{{ title }}",n.title),i=i.replace(/{{ id }}/g,a+"-"+t+"-"+e),s.push(i)}),n=n.replace("{{ id }}","desc-"+t+"-"+e),n=n.replace("{{ title }}",i),n=n.replace("{{ children }}",s.join("\n\r")),d.push(n)});var t='<div class="main-category" data-id="'+e+'"><span class="progress"><span></span></span><h3 class="category-title">'+a+"</h3><ul>"+d.join("\n\r")+"</ul></div>";$(t).appendTo("[data-template=side-menu]"),app.initSVG()}}),jQuery(document).trigger("contentInitiated")},showHideSubmenu:function(){jQuery(document).on("click",".main-category > h3",function(){jQuery(".main-category").not(jQuery(this).parent()).removeClass("opened"),jQuery(".main-category > ul").slideUp(),jQuery(this).parent().hasClass("opened")?(jQuery(this).parent().removeClass("opened"),jQuery(this).parent().find("> ul").slideUp()):(jQuery(this).parent().addClass("opened"),jQuery(this).parent().find("> ul").slideDown())}),jQuery(document).on("click",".main-category > ul > li span",function(){var e=jQuery(this).data("id");window.location.hash="#"+e,jQuery(".main-category > ul > li").not(jQuery(this).parent()).removeClass("opened"),jQuery(".main-category > ul > li ul").slideUp();var t=jQuery(this).parent().find("ul");jQuery(this).parent().hasClass("opened")?t.find("li").length&&(jQuery(this).parent().removeClass("opened"),jQuery(this).parent().find("ul").slideUp()):t.find("li").length&&(jQuery(this).parent().addClass("opened"),jQuery(this).parent().find("ul").slideDown())})},detectHashChange:function(){function e(){var e=location.hash.substring(1);return $(document).trigger("changeTopic",[e]),""===e?!1:void(jQuery("[data-id="+e+"]").length&&(jQuery("[data-id="+e+"]").parents("li").addClass("opened").find("> ul").slideDown(),jQuery("[data-id="+e+"]").parents(".main-category").addClass("opened").find("> ul").slideDown()))}$(document).on("click","[data-item-select]",function(e){var t=$(this).attr("data-id");$(document).trigger("changeTopic",[t])}),$(document).on("contentInitiated",function(){e()})},changeTopic:function(){function e(e){"desc-0-0"==e?jQuery("body").addClass("on-first-page"):jQuery("body").removeClass("on-first-page"),$("[data-search-wrapper]").is(":visible")&&($("[data-content-wrapper]").show(),$("[data-search-wrapper]").hide()),$(".desc > div").not(".content-"+e).hide(),$(".desc .content-"+e).show(),$(".side-menu li").not("li[data-id="+e+"]").removeClass("selected"),$(".side-menu li[data-id="+e+"]").addClass("selected")}jQuery(document).on("changeTopic",function(t,a){function n(e){return e.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")}if(void 0===a||""===a)return!1;if(!jQuery("[data-id="+a+"]").length)return!1;var i=a,s=i.split("-")[0],c=i.split("-")[1],r=i.split("-")[2];if($(".desc .content-"+i).length)e(i);else{var o=app.template.mainContentTemplate;if("desc"==s)var d=app.savedData[r].categories[c].name,l=app.savedData[r].categories[c].description,p="no-check";else var d=app.savedData[r].categories[c].items[s].title,l=app.savedData[r].categories[c].items[s].content,p="";var u=app.contentLinkInit(s,c,r);o=o.replace("{{ title }}",d),o=o.replace("{{ content }}",l+u),o=o.replace("{{ id }}",i),o=o.replace("{{ class }}",p),$('<div class="content-'+i+'" data-id="'+i+'">'+o+"</div>").appendTo("[data-template=content]"),window.location.hash="#"+a,e(i),app.initSVG()}})},contentLinkInit:function(e,t,a){var n="";if(jQuery.isArray(app.savedData[a].categories[t].items)&&app.savedData[a].categories[t].items.length>0&&"desc"==e){var i=[];jQuery.each(app.savedData[a].categories[t].items,function(e){var n='<li><span data-id="'+e+"-"+t+"-"+a+'" data-item-select>'+this.title+"</span></li>";i.push(n)}),i.length>0&&(n="<ul class='bottom-links'>"+i.join("")+"</ul>")}return n},parseMarkDown:function(){jQuery.ajaxSetup({async:!1,cache:!0});var e=app.markdowns.length;jQuery.each(app.markdowns,function(t,a){var n=[],i="",s="";app.savedData[t]={categories:null,description:null,title:null},app.checkList[t]=[],void 0===a.file?app.savedData[t]={title:a.name,link:a.link}:$.get("./markdowns/"+a.file).done(function(e){var c=$('<div class="html"></div>').append(marked(e)),r=c.find("> h1").eq(0);i=r.length?a.name:"Untitled Documentation",c.find("> h1").eq(0).nextUntil(".html > h2").wrapAll('<div class="main-description"></div>');var o=c.find(".main-description");s=o.length?o[0].innerText||o[0].textContent:"Just another awesome documentation";var d=c.find("> h2"),l=d.length-1;d.each(function(e,a){$(a).nextUntil(".html > h2").wrapAll('<div class="category"></div>'),$(a).next(".category").prepend('<div class="desc-node"></div>'),$(a).next(".category").find(".desc-node").nextUntil(".category > h3").wrapAll('<div class="description"></div>');var i=$(a).next(".category").find(".description"),s;s=i.length?i[0].innerHTML:"",$titles=$(a).next(".category").find("> h3");var c=[];$titles.length>0&&$titles.each(function(a,n){if($(n).nextUntil(".category > h3").wrapAll('<div class="item"></div>'),$(n).next(".item").length)var i=$(n).next(".item")[0].outerHTML;else var i="";var s={title:$(n)[0].innerText||$(n)[0].textContent,content:app.syntaxHighlightingFixes(i)};c.push(s),app.checkList[t].push({ID:a+"-"+e+"-"+t,checked:!1})});var r={items:c,name:$(a)[0].innerText||$(a)[0].textContent,description:s};n.push(r)}),app.savedData[t].categories=n,app.savedData[t].description=s,app.savedData[t].title=i}),t==e-1&&app.initContentHandler(app.savedData)})},syntaxHighlightingFixes:function(e){var t=$(e).wrapAll("<div></div>").parent().find("code");return t.each(function(t,a){var n=$(a)[0].innerHTML;$(a).hasClass("lang-javascript")&&Rainbow.color(n,"javascript",function(t){e=e.replace(n,t)}),$(a).hasClass("lang-php")&&Rainbow.color(n,"php",function(t){e=e.replace(n,t)}),$(a).hasClass("lang-html")&&Rainbow.color(n,"html",function(t){e=e.replace(n,t)}),$(a).hasClass("lang-css")&&Rainbow.color(n,"css",function(t){e=e.replace(n,t)})}),e},readMoreDescription:function(){$(document).on("click","[data-read-more]",function(){var e=app.baseData.description;e+=" <span data-read-less>Show less description</span>",$("[data-description]").html(e)}),$(document).on("click","[data-read-less]",function(){var e=app.trimWord(app.baseData.description,200);e+=" <span data-read-more>Show more description</span>",$("[data-description]").html(e)})},searchHandler:function(){function e(){var e=$("[data-search-input]").val().toLowerCase(),t=$("[data-template=search-result]"),a=[];t.html(""),$.each(app.savedData,function(t,n){void 0===n.link&&$.each(n.categories,function(n,i){i.items.length>0&&$.each(i.items,function(i,s){var c=s.content.replace(/(<([^>]+)>)/gi,"").replace(/(&lt;([^>]+)&gt;)/gi,""),r=c.toLowerCase();lowerCaseTitle=s.title.toLowerCase(),pos=r.search(e),-1==pos&&-1==lowerCaseTitle.search(e)||""==e||a.push({pos:pos,content:{title:s.title,content:c,ID:i+"-"+n+"-"+t}})})})}),a.length>0?$.each(a,function(a,n){if(10>a){var i=app.template.searchResultTemplate,s=n.content.content;n.pos-50>0&&(s="..."+s.substr(n.pos-50,300)),s=app.trimWord(s,200),s=s.replace(e,'<span class="bold">'+e+"</span>"),i=i.replace("{{ id }}",n.content.ID),i=i.replace("{{ title }}",n.content.title),i=i.replace("{{ description }}",s),$(i).appendTo(t)}}):$('<div class="no-result">No result found.</div>').appendTo(t)}$(document).on("propertychange change click keyup input paste","[data-search-input]",function(){var t=$(this).val();t.length>0?($("[data-content-wrapper]").hide(),$("[data-search-wrapper]").show(),$("[data-search-value]").html(t)):($("[data-content-wrapper]").show(),$("[data-search-wrapper]").hide(),$("[data-search-value]").html("")),e()})},trimWord:function(e,t){var a=" ",n="...";if(e.length<=t)return e;var i=e.substr(0,t+a.length),s=i.lastIndexOf(a);return s>=0&&(i=i.substr(0,s)),i&&(i+=n),i},menuScrollBarInit:function(){jQuery(".nano").nanoScroller()},mobileHamburgerInit:function(){function e(){jQuery("body").removeClass("hamburger-open").addClass("hamburger-close"),jQuery(".move-left").eq(0).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){jQuery("body").removeClass("hamburger-close")})}jQuery(document).on("touchstart","#hamburger",function(){jQuery("body").hasClass("hamburger-open")?e():jQuery("body").addClass("hamburger-open")}),jQuery(".main-category > ul > li span").click(function(){jQuery(this).parent().find("ul li").length||e()}),jQuery(".main-category > ul > li > ul > li").click(function(){e()})},initSVG:function(){var e=$("img.svg"),t=e.length,a=0;t===a&&$(document).trigger("svgsLoaded",[a]),e.each(function(){var e=$(this),n=e.attr("id"),i=e.attr("class"),s=e.attr("src");$.get(s,function(s){a++;var c=$(s).find("svg");"undefined"!=typeof n&&(c=c.attr("id",n)),"undefined"!=typeof i&&(c=c.attr("class",i+" replaced-svg")),c=c.removeAttr("xmlns:a"),e.replaceWith(c),t===a&&$(document).trigger("svgsLoaded",[a])})})}};jQuery(document).ready(function($){app.init($),$(window).resize(function(){app.onResize()})});