namespace plugins{
     //MULTI SELECTION AND SEARCHABLE DROPDOWN
    //COMPULSORY REQUIREMENTS - 
    export class MultiSelectionDropDown {
        multiselect_master: any;
        input_field:any;
        item_list_field: any;
        selected_items_panel: any;
        items_list_panel: any;
        selected_items: any = [];
        options: any = {
            "el": "",
            "tag_bg": "#000",
            "items": [],
            "placeholder": "please enter text",
            "getItemsRemotly": ""
        };
        

        constructor(userObject:any) {
            if(userObject && typeof userObject === "object") {
                let generic = new Generic();
                this.options = generic.ExtendDefaultsObjectProperties<any>( this.options, arguments[0] );
                this.buildDropDownLayout();
            }
        }

        //CREATE MULTISELECT DROPDOWN LAYOUT
        public buildDropDownLayout() {
            this.options.el = document.getElementById(this.options.el);
            if(this.options.el !== null && typeof this.options.el === "object") {
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
                this.InitializeMuliselectEvents();//INITIALIZE EVENTS

                this.multiselect_master.appendChild(this.input_field);//APPEND INPUT FIELD
                this.multiselect_master.appendChild(this.selected_items_panel); //APPEND SELECTED ITEMS PANEL
                this.multiselect_master.appendChild(this.items_list_panel);
                this.options.el.appendChild(this.multiselect_master); //APPEND ITEMS TO DOM
            } else{
                console.log("You have not passed any id for making dropdown");
            }
        }

        //FILTER DROPDOWN ITEMS
        public filterItems(term: string) {            
            let _ = this;

            if( typeof _.options.getItemsRemotly == "function" ) {

            }

            this.items_list_panel.innerHTML = "";
            for(let item of this.options.items) {
                if( item.indexOf(term) !== -1 ) {
                    let itemEle =  document.createElement("li");
                    itemEle.innerHTML = item;
                    this.items_list_panel.appendChild(itemEle);
                    itemEle.addEventListener('click', function() {
                        if( this.className === "selected") {
                            this.className = "";       
                            _.removeSelection(item, this);                
                        } else {
                            this.className = "selected";
                            _.selected_items.push(item);
                        }
                        _.items_list_panel.className = "item_list_panel";
                        _.appendSelectedTags(this);
                    });
                }
            }
        }

        appendSelectedTags(itemEle:any) {
            let _ = this;
            this.selected_items_panel.innerHTML = "";
            for( let item of this.selected_items ) {
                let selected_tag = document.createElement("span");
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
        }

        removeSelection(item, itemEle){
            let _ = this;
            var arr_index = _.selected_items.indexOf(item);
            if(arr_index > -1)
                _.selected_items.splice(arr_index, 1);
                itemEle.className = "";
                this.appendSelectedTags(itemEle);
        }

        public InitializeMuliselectEvents() {
            let _ = this;
            document.addEventListener("click", function() { 
               _.items_list_panel.className = "item_list_panel";
             });
            this.input_field.addEventListener('keyup', function(event) {
                event.stopPropagation();
                let term_val = _.input_field.value.trim();
                _.items_list_panel.className = "item_list_panel visible";
                _.filterItems(term_val);
            });
            this.input_field.addEventListener('click', function(event) {
                event.stopPropagation();
                _.items_list_panel.className = "item_list_panel visible";                
            });
        }
    }

    //=================================GENERIC FUNCTIONS========================================
    class Generic {
        constructor() {

        }
        ExtendDefaultsObjectProperties<T>(source: T, properties: T): T {
            var property;
            for(property in properties) {
                if(properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
    }
}

   