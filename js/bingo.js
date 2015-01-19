$(document).ready(function(){
	//some global variables
	initialRows = 5; //for the options menu
	initialColumns = 5; //for the options menu
	
	//setup the button action which will slide the panel up and down	
	$("#ok_btn,#optionsBtn,#cancel_btn").click(function(){
		$("#panel").slideToggle("slow");
	});
	
	$("#ok_btn, #refreshBtn").click(function()
	{
		generateCards();
	});
	
	$("#addRowBtn").click(function(){
		$('#TableDivOptions tr:last').after(addRow());
	});
	
	$("#closeBtn,#optionsBtn").click(function()
	{
		//hides the option menu. Will need to refresh to get it back
		$("#options_menu").hide();
	});
	
	$("#ok_btn,#cancel_btn").click(function()
	{
		//hides the option menu. Will need to refresh to get it back
		$("#options_menu").show();
	});
	
	//create the initial options in the panel
	populateOptions();
});

function addRow()
{
	var tableRow = "<tr>";
	for (var i = 0; i < initialColumns; i++)
	{
		tableRow += "<td><input class=\"optionsTD\" type=\"text\"></td>";
	}
	tableRow += "</tr>";	
	return tableRow;
}

function populateOptions()
{
	//define the original squares
	choices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

	//create the initial options table
	var currentChoice = 0; 
	var table = $('<table/>',{id: "tableOptions"});
	for (var i = 0; i < initialRows; i++) 
	{
		var tr = $('<tr/>');
		table.append(tr);
		for (var j = 0; j < initialColumns; j++)
		{	  
			tr.append("<td><input class=\"optionsTD\" type=\"text\" size=\"15\" value=\""+ choices[currentChoice] + "\"</td>");
			currentChoice++;
		}
	}
	$('#TableDivOptions').append(table);
}
function generateCards()
{
	//first clear the page
	$("#BingoFormsParentDiv").empty();
	
	//default values
	columns = 5;
	rows = 5;
	
	//get values from options or display error 
	numCards = $("#numCards").val();
	if (isNaN(numCards) || numCards.length <= 0)
	{
		$("#BingoFormsParentDiv").append("<spant font-color=\"red\">The number of cards must be a number</span>");
		return;
	} 
	
	cardWidth = $("#cardWidth").val();
	if (isNaN(cardWidth) || cardWidth.length <= 0)
	{
		$("#BingoFormsParentDiv").append("<spant font-color=\"red\">The number of card width must be a number</span>");
		return;
	} 
	
	cardMeasurement = $("#cardMeasurement").val();
		
	//define the squares
	choices = getChoices();
	if (choices.length < 25)
	{
		$("#BingoFormsParentDiv").append("<spant font-color=\"red\">You must specify at least 25 possible squares. You specified " + choices.length +"</span>");
		return;
	}
	
	for (var i = 0; i < numCards; i++)
	{
		createForm(i);
	}
	
	//change bg color of all bingo cards
	var bgColor = $("#bgColor").val();
	$(".BingoFormDiv").css("background-color", bgColor); 

}
function getChoices()
{
	var ret = [];
    $('.optionsTD').each(function () 
	{
        var d = $(this).val();
        //make sure the TD is not empty
		if(d.length > 0) 
		{
			ret.push(d);
		}
    });
    return ret;
}
function randomizeArray(choices)
{
	var arr = choices.slice(0); //make copy of array
	var n = arr.length;
	var tempArr = []; 
	for ( var i = 0; i < n-1; i++ ) 
	{ 
		// The following line removes one random element from arr // and pushes it onto tempArr 
		tempArr.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]); 
	} 
	// Push the remaining item onto tempArr 
	tempArr.push(arr[0]); 
	return tempArr;
}

function createForm(id)
{
	createDivElements(id);
	//randomize the above array
	var squares = randomizeArray(choices);	
	var table = $('<table/>',{id: "table"+id});
	var currentSquare = 0;
	for (var i = 0; i < rows; i++) 
	{
		var tr = $('<tr/>');
		table.append(tr);
		for (var j = 0; j < columns; j++)
		{	  
			tr.append('<td>' + squares[currentSquare] + '</td>');
			currentSquare++;
		}
	}
	$('#TableDiv'+id).append(table);
}

function createDivElements(id)
{
	//if we need the banner, include the image else just leave a blank header
	var banner = "<div class=\"BingoHeaderDiv\" id=\"HeaderDiv"+id+"\"></div>";
	var banner_location = $("#banner_location");
	var bgColor = $("#bgColor").val();
	if (banner_location.val().length > 0)
	{
		banner = "<div class=\"BingoHeaderDiv\" id=\"HeaderDiv"+id+"\"><img src=\""+banner_location.val()+"\" height=\"100\" width=\"400\"></div>";
	}

	$("#BingoFormsParentDiv").append("<div class=\"BingoFormDiv\" id=\"ParentDiv"+id+"\" STYLE=\"width: " + cardWidth + cardMeasurement + ";\">" +
		 banner +
		"<div class=\"BingoTableDiv\" id=\"TableDiv"+id+"\"></div>" +
		"</div>"
	);
}