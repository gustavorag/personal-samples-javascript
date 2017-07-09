(function init(){
	/*Constants*/
	var CLASS_INPUT_LIST = "lnil";
	var CLASS_INPUT_LIST_INP_RDY = "lnil-input-ready";
	var CLASS_INPUT_LIST_INP_RDY_INPUT = "lnil-input-ready-input"
	var CLASS_INPUT_LIST_HANDLER = "lnil-click-handler";
	var CLASS_INPUT_LIST_ITEM="lnil-item"
	var CLASS_INPUT_LIST_REMOVE="lnil-item-remover"
	var CLASS_INPUT_NEW_ID="lnil-input-new-item";

	var ID_CLICK_HANDLER = "lnil-click_handler-id";
	var ID_INPUT = "lnil-input-new-item-id";
	var ID_INPUT_EDIT = "lnil-input-edit-item-id";
	var ID_INPUT_LIST_PREFIX = "lnil-item-id-";
	var ID_INPUT_LIST_REMOVE_PREFIX = "lnil-item-remove-id-";

	var inputListSize = 600; //Default value
	var paddingFix = 0;
	var inputReadyMinSize = 150;
	var itemsListElementId = undefined;
	var inputsList = [];
	var lnilConfig;

	var actualLineSize = 0;
	
	var eventHandlers = {
		additem:undefined,
		removeitem:undefined,
		listchange:undefined,
	}
	
	var getItems = function(){
		var itemsToReturn = [];
		inputsList.forEach(function(lnilItem,index){
			itemsToReturn.push(lnilItem.item);
		})
		return itemsToReturn;
	};
	var getKeys = function(){
		var itemsToReturn = [];
		inputsList.forEach(function(lnilItem,index){
			itemsToReturn.push(lnilItem.item.key);
		})
		return itemsToReturn;
	};
	var getValues = function(){
		var itemsToReturn = [];
		inputsList.forEach(function(lnilItem,index){
			itemsToReturn.push(lnilItem.item.value);
		})
		return itemsToReturn;
	};
	/*Config:
	{
		target: id of the div
		items:[previous inputs]
		options:{
			width: size in pixels of the input list
			editButton
			inputReady: true or false
		}
		keyGenerator: function to generate keys for the values
	}
	*/
	var newItemsList = function(config){

		lnilConfig = config;
		if(lnilConfig && lnilConfig.target){

			paddingFix = (lnilConfig.options.inputReady ? 10:30);

			var newItemsListApi ={
				on:function(event, callbackFunction){
					if(event == 'additem'){
						eventHandlers.additem = callbackFunction;
					}else if(event == 'removeitem'){
						eventHandlers.removeitem = callbackFunction;
					}else if(event == 'listchange'){
						eventHandlers.listchange = callbackFunction;
					}
				},
				getItems: getItems,
				getKeys: getKeys,
				getValues: getValues,
				edit:function(){

				}
			}
			
			itemsListElementId = lnilConfig.target;

			var itemsListElement = $('#'+itemsListElementId);
			if(lnilConfig.options && lnilConfig.options.width){
				inputListSize = lnilConfig.options.width;
			}

			itemsListElement.css('width', inputListSize);
			if(lnilConfig.options.inputReady){
				itemsListElement.addClass(CLASS_INPUT_LIST_INP_RDY);
			}else{
				itemsListElement.addClass(CLASS_INPUT_LIST);
			}
			
			if(lnilConfig.items){

				lnilConfig.items.forEach(function(item,index){
					if(item){
						setTimeout(function(){
							if(typeof item === "object"){
								addNewItem(item.key, item.value, true)
							}
							if(typeof item === "string"){
								addNewItem('', item, true)
							}
						}, 10);	
					}
				})
				if(lnilConfig.options.inputReady){
					setTimeout(addInputElement, 10);
				}else{
					setTimeout(addClickHandler, 10);
				}
				
			}else{
				addClickHandler();
			}
			
			return newItemsListApi;

		}else{
			//error: no valid configuration
			console.log('Error on lnil')
		}
	}


	var addClickHandler = function(){
		
		var itemsListElement = $('#'+itemsListElementId);
		
		itemsListElement.append('<div id="'+ID_CLICK_HANDLER
			+'" class="'+CLASS_INPUT_LIST_HANDLER
			+'"></div>');
		
		var clickHandlerElement = $('#'+ID_CLICK_HANDLER);
		var nextElementSize = (inputListSize - actualLineSize - paddingFix);
		if(nextElementSize < 60){
			clickHandlerElement.css('display','block');
			clickHandlerElement.css('position','relative');
		}else{
			clickHandlerElement.css('display','inline-block');
			clickHandlerElement.css('position','absolute');
		}
		
		clickHandlerElement.css('width',nextElementSize);
		clickHandlerElement.on('click',addInputElement);
	}

	var addInputElement = function(){
		
		if(!lnilConfig.options.inputReady){
			$('#'+ID_CLICK_HANDLER).remove();
		}

		var itemsListElement = $('#'+itemsListElementId);
		
		itemsListElement.append('<input id='+ID_INPUT
			+' class="'+(lnilConfig.options.inputReady ? CLASS_INPUT_LIST_INP_RDY_INPUT : CLASS_INPUT_NEW_ID)
			+'" type="text"></input>');

		var inputElement = $('#'+ID_INPUT);
		resizeInputReady();

		inputElement.focusout(function(){
			//alert($('#'+inputId).val());
			var value = inputElement.val();
			
			if(lnilConfig.options.inputReady){
				
				addNewItem('', value, false);
				//Resize input
				resizeInputReady();
				inputElement.val('');

			}else{
				inputElement.remove();

				addNewItem('', value, false);
				addClickHandler();
			}
			
		});
		inputElement.keypress(function (e) {
		  if (e.which == 13) {

		   	var value = inputElement.val();
			
			if(lnilConfig.options.inputReady){
				
				addNewItem('', value, false);
				resizeInputReady();
				inputElement.val('');

			}else{
				inputElement.remove();

				addNewItem('', value, false);
				addClickHandler();
			}

		    return false;
		  }
		});
		if(!lnilConfig.options.inputReady){
			inputElement.focus();	
		}
	}

	var addNewItem = function(key,value,previous){
		
		if(isStringEmpty(key) && lnilConfig.keyGenerator){
			key = lnilConfig.keyGenerator(value);
		}

		if(value){

			var newItemId = ID_INPUT_LIST_PREFIX+(inputsList.length+1);
			var buttonRemoveId = ID_INPUT_LIST_REMOVE_PREFIX+(inputsList.length+1);

			var itemsListElement = $('#'+itemsListElementId);
			var lnilItem = {
				htmlId:newItemId,
				item:{
					key:key,
					value:value
				},
			}

			inputsList.push(lnilItem);

			var stringNewItem = '<div id="'+lnilItem.htmlId
				+'" class="'+CLASS_INPUT_LIST_ITEM+'" value="'+lnilItem.item.value
				+'">'+lnilItem.item.value
				+'</div>';

			if(lnilConfig.options.inputReady && !previous){
				$(stringNewItem).insertBefore('#'+ID_INPUT)
			}else{
				itemsListElement.append(stringNewItem)
			}

			var newItemElement = $('#'+lnilItem.htmlId)
			newItemElement.on('click', function(){
				handleEditItemEvent(lnilItem.htmlId);
			})

			newItemElement.append('<button type="button" id="'+buttonRemoveId
			+'" class="'+CLASS_INPUT_LIST_REMOVE
			+'" aria-label="Close"><span aria-hidden="true">&times;</span></button>')

			var buttoRemoveElement = $('#'+buttonRemoveId);
			buttoRemoveElement.on('click', function(){
				removeItem(lnilItem.htmlId);
			})

			var totalUse = (actualLineSize + newItemElement.outerWidth())
			if(totalUse > (inputListSize - paddingFix)){
				actualLineSize = newItemElement.outerWidth();
			}else{
				actualLineSize = totalUse;
			}
			
			if(eventHandlers.additem && !previous){
				eventHandlers.additem(lnilItem.item)
			}
			if(eventHandlers.listchange && !previous){
				eventHandlers.listchange(getItems())
			}
		}
	}

	var handleEditItemEvent = function(htmlId){

		//Disable ClickHandler or ReadyInput
		if(!lnilConfig.options.inputReady){
			$('#'+ID_CLICK_HANDLER).remove();
		}else{
			$('#'+ID_INPUT).remove();
		}
		
		var itemToEditElement = $('#'+htmlId);

		var inputEditHtml = '<input id='+ID_INPUT_EDIT
			+' class="'+(lnilConfig.options.inputReady ? CLASS_INPUT_LIST_INP_RDY_INPUT : CLASS_INPUT_NEW_ID)
			+'" type="text"></input>';
		
		var oldValue = itemToEditElement.attr('value');

		$(inputEditHtml).insertBefore(itemToEditElement);
		itemToEditElement.remove();

		var inputEditElement = $('#'+ID_INPUT_EDIT);

		inputEditElement.val(oldValue);
		inputEditElement.focusout(function(){
			//alert($('#'+inputId).val());
			var newValue = inputEditElement.val();
			updateItem(htmlId,newValue);
			
		});
		inputEditElement.keypress(function (e) {
		  if (e.which == 13) {

		   	var newValue = inputEditElement.val();
			updateItem(htmlId,newValue);

		    return false;
		  }
		});
		inputEditElement.focus();
		
	}

	var updateItem = function(htmlId, newValue){

		console.log('New value: '+newValue+" for "+htmlId);

		if(lnilConfig.options.inputReady){
			addInputElement();
		}else{
			addClickHandler();
		}
	}

	var removeItem = function(itemId){
		
		var itemToRemove = $('#'+itemId);
		var clickHandlerElement = $('#'+ID_CLICK_HANDLER);

		actualLineSize = (actualLineSize - itemToRemove.outerWidth())

		itemToRemove.remove();
		clickHandlerElement.remove();

		if(actualLineSize == 0){
			var itemsListElement = $('#'+itemsListElementId);
			itemsListElement.find('.'+CLASS_INPUT_LIST_ITEM).each(function(){
				actualLineSize = actualLineSize+$(this).outerWidth();
			})
		}

		var indexToRemove = undefined;
		var lnilItemToRemove = undefined;

		for(var index = 0; index < inputsList.length; index++){
			if(inputsList[index].htmlId == itemId){
				indexToRemove = index;
				lnilItemToRemove = inputsList[index].item
				break;
			}
		}
		
		if(indexToRemove){
			inputsList.splice(indexToRemove, 1);
		}
		
		if(lnilConfig.options.inputReady){
			//Resize input
			resizeInputReady();

		}else{
			addClickHandler();
		}

		if(eventHandlers.removeitem){
			eventHandlers.removeitem(lnilItemToRemove)
		}
		if(eventHandlers.listchange){
			eventHandlers.listchange(getItems())
		}

	}

	var resizeInputReady = function(){
		var inputElement = $('#'+ID_INPUT);
		var inputSize = (inputListSize - actualLineSize - paddingFix);
		if(inputSize < inputReadyMinSize){
			inputSize = (inputListSize - paddingFix);
		}
		inputElement.css('width',inputSize);
	}

	var isStringEmpty = function(str){
		return (!str || 0 === str.length);
	}

	var lnItemsListApi = {
		"NLItemsList":{
			newItemsList:newItemsList	
		}
	}


	window.lnil = lnItemsListApi;
}
)();