var plugins;
(function (plugins) {
    //MULTI SELECTION AND SEARCHABLE DROPDOWN
    //COMPULSORY REQUIREMENTS - 
    var MultiSelectionDropDown = (function () {
        function MultiSelectionDropDown(userObject) {
            this.selected_items = [];
            this.options = {
                "el": "",
                "tag_bg": "#000",
                "items": [],
                "placeholder": "please enter text",
                "getItemsRemotly": ""
            };
            if (userObject && typeof userObject === "object") {
                var generic = new Generic();
                this.options = generic.ExtendDefaultsObjectProperties(this.options, arguments[0]);
                this.buildDropDownLayout();
            }
        }
        //CREATE MULTISELECT DROPDOWN LAYOUT
        MultiSelectionDropDown.prototype.buildDropDownLayout = function () {
            this.options.el = document.getElementById(this.options.el);
            if (this.options.el !== null && typeof this.options.el === "object") {
                //MULTISELECT MASTER
                this.multiselect_master = document.createElement("div");
                this.multiselect_master.className = "plugin_multiselect";
                //INPUT FIELD TO Search and show options of DROPDOWN
                this.input_field = document.createElement("input");
                this.input_field.setAttribute("type", "text");
                this.input_field.className = "input_field";
                this.input_field.setAttribute("placeholder", this.options.placeholder);
                //SELECTED ITEMS PANEL
                this.selected_items_panel = document.createElement("div");
                this.selected_items_panel.className = "selected_items";
                this.selected_items_panel.innerHTML = "";
                //ITEMS LIST PANEL
                this.items_list_panel = document.createElement("ul");
                this.items_list_panel.className = "item_list_panel";
                //APPEND ALL ARRAY ITEMS TO PANELS
                this.filterItems("");
                this.InitializeMuliselectEvents(); //INITIALIZE EVENTS
                this.multiselect_master.appendChild(this.input_field); //APPEND INPUT FIELD
                this.multiselect_master.appendChild(this.selected_items_panel); //APPEND SELECTED ITEMS PANEL
                this.multiselect_master.appendChild(this.items_list_panel);
                this.options.el.appendChild(this.multiselect_master); //APPEND ITEMS TO DOM
            }
            else {
                console.log("You have not passed any id for making dropdown");
            }
        };
        //FILTER DROPDOWN ITEMS
        MultiSelectionDropDown.prototype.filterItems = function (term) {
            var _ = this;
            if (typeof _.options.getItemsRemotly == "function") {
            }
            this.items_list_panel.innerHTML = "";
            var _loop_1 = function(item) {
                if (item.indexOf(term) !== -1) {
                    var itemEle = document.createElement("li");
                    itemEle.innerHTML = item;
                    this_1.items_list_panel.appendChild(itemEle);
                    itemEle.addEventListener('click', function () {
                        if (this.className === "selected") {
                            this.className = "";
                            _.removeSelection(item, this);
                        }
                        else {
                            this.className = "selected";
                            _.selected_items.push(item);
                        }
                        _.items_list_panel.className = "item_list_panel";
                        _.appendSelectedTags(this);
                    });
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.options.items; _i < _a.length; _i++) {
                var item = _a[_i];
                _loop_1(item);
            }
        };
        MultiSelectionDropDown.prototype.appendSelectedTags = function (itemEle) {
            var _ = this;
            this.selected_items_panel.innerHTML = "";
            for (var _i = 0, _a = this.selected_items; _i < _a.length; _i++) {
                var item = _a[_i];
                var selected_tag = document.createElement("span");
                selected_tag.className = "selected_tag";
                selected_tag.innerHTML = item;
                // let remove_tag = document.createElement("i");
                // remove_tag.className = "remove_tag";
                // remove_tag.innerHTML = "X";
                // remove_tag.addEventListener("click", function() {
                //     debugger;
                //     console.log(itemEle.innerHTML);                    
                //     var arr_index = _.selected_items.indexOf(item);
                //     if(arr_index > -1)
                //         _.selected_items.splice(arr_index, 1);
                //     itemEle.className = "";
                //     this.parentElement.remove();
                // });
                //selected_tag.appendChild(remove_tag);
                this.selected_items_panel.appendChild(selected_tag);
            }
        };
        MultiSelectionDropDown.prototype.removeSelection = function (item, itemEle) {
            var _ = this;
            var arr_index = _.selected_items.indexOf(item);
            if (arr_index > -1)
                _.selected_items.splice(arr_index, 1);
            itemEle.className = "";
            this.appendSelectedTags(itemEle);
        };
        MultiSelectionDropDown.prototype.InitializeMuliselectEvents = function () {
            var _ = this;
            document.addEventListener("click", function () {
                _.items_list_panel.className = "item_list_panel";
            });
            this.input_field.addEventListener('keyup', function (event) {
                event.stopPropagation();
                var term_val = _.input_field.value.trim();
                _.items_list_panel.className = "item_list_panel visible";
                _.filterItems(term_val);
            });
            this.input_field.addEventListener('click', function (event) {
                event.stopPropagation();
                _.items_list_panel.className = "item_list_panel visible";
            });
        };
        return MultiSelectionDropDown;
    }());
    plugins.MultiSelectionDropDown = MultiSelectionDropDown;
    //=================================GENERIC FUNCTIONS========================================
    var Generic = (function () {
        function Generic() {
        }
        Generic.prototype.ExtendDefaultsObjectProperties = function (source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        };
        return Generic;
    }());
})(plugins || (plugins = {}));
