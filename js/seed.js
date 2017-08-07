// Basic variable declaration - keep track of how many of each
// item we currently own, and how much the new ones should cost.
var numWidgets = 0;
var numNoviceWidgeteers = 0;
var numMasterWidgeteers = 0;
var numEpicWidgeteers = 0;
var numLegendWidgeteers = 0;
var noviceWidgeteerCost = 30;
var masterWidgeteerCost = 200;
var epicWidgeteerCost = 1000;
var legendWidgeteerCost = 10000;
var widgetPerSecond = 0;
var numNoviceUpgrades = 0;
var numMasterUpgrades = 0;
var numEpicUpgrades = 0;
var numLegendUpgrades = 0;
var noviceUpgradeCost = 10000;
var masterUpgradeCost = 50000;
var epicUpgradeCost = 100000;
var legendUpgradeCost = 300000;
var numClickUpgrades = 1;
var clickUpgradeCost = 100;
$('#upgrades').hide();    
$('#about').hide(); 

// Increase numWidgets every time produce-widget is clicked
$('#produce-widget').on('click', function () {
    numWidgets += getIncrementClick();
});

// Same for novice-widgeteer
$('#novice-widgeteer').on('click', function () {
    numNoviceWidgeteers++;
    numWidgets -= noviceWidgeteerCost;    
    noviceWidgeteerCost = Math.ceil(noviceWidgeteerCost * 1.1);
});

// Ditto for master-widgeteer... you get the idea
$('#master-widgeteer').on('click', function () {
    numMasterWidgeteers++;
    numWidgets -= masterWidgeteerCost;
    masterWidgeteerCost = Math.ceil(masterWidgeteerCost * 1.5);
});

$('#epic-widgeteer').on('click', function () {
    numEpicWidgeteers++;
    numWidgets -= epicWidgeteerCost;
    epicWidgeteerCost = Math.ceil(epicWidgeteerCost * 2.1);
});
$('#legend-widgeteer').on('click', function () {
    numLegendWidgeteers++;
    numWidgets -= legendWidgeteerCost;
    legendWidgeteerCost = Math.ceil(legendWidgeteerCost * 3.4);
});

$('#novice-upgrade').on('click', function () {
    numNoviceUpgrades++;
    numWidgets -= noviceUpgradeCost;    
    noviceUpgradeCost = Math.ceil(noviceUpgradeCost * 15);
});

$('#master-upgrade').on('click', function () {
    numMasterUpgrades++;
    numWidgets -= masterUpgradeCost;    
    masterUpgradeCost = Math.ceil(masterUpgradeCost * 15);
});

$('#epic-upgrade').on('click', function () {
    numEpicUpgrades++;
    numWidgets -= epicUpgradeCost;    
    epicUpgradeCost = Math.ceil(epicUpgradeCost * 15);
});

$('#legend-upgrade').on('click', function () {
    numLegendUpgrades++;
    numWidgets -= legendUpgradeCost;    
    legendUpgradeCost = Math.ceil(legendUpgradeCost * 15);
});

$('#click-upgrade').on('click', function () {
    numClickUpgrades++;
    numWidgets -= clickUpgradeCost;    
    clickUpgradeCost = Math.ceil(clickUpgradeCost * 2);
});

$('#tabWidgets').on('click', function () {
    $('#upgrades').hide();    
    $('#tabUpgrades').removeClass("active");    
    $('#about').hide();    
    $('#tabAbout').removeClass("active");    
    $('#widgets').show();    
    $('#tabWidgets').addClass("active");  
});

$('#tabUpgrades').on('click', function () {
    $('#widgets').hide();    
    $('#tabWidgets').removeClass("active");  
    $('#about').hide(); 
    $('#tabAbout').removeClass("active");     
    $('#upgrades').show();    
    $('#tabUpgrades').addClass("active");
});

$('#tabAbout').on('click', function () {
    $('#upgrades').hide(); 
    $('#tabUpgrades').removeClass("active");       
    $('#widgets').hide();    
    $('#tabWidgets').removeClass("active");  
    $('#about').show(); 
    $('#tabAbout').addClass("active");     
});

function getIncrementNovice(divider){
    return ((numNoviceWidgeteers * 1  + (numNoviceUpgrades * 3))) / divider;
}

function getIncrementMaster(divider){
    return ((numMasterWidgeteers * 10 + (5 * numMasterUpgrades))) / divider;
}

function getIncrementEpic(divider){
    return ((numEpicWidgeteers * 30 + (10 * numEpicUpgrades))) / divider;
}

function getIncrementLegend(divider){
    return ((numLegendWidgeteers * 100 + (25 * numLegendUpgrades))) / divider;
}

function getIncrementClick(){
    return ((numClickUpgrades - 1) * 10) + 1;
}

function getUpgradeNumber(){
    var numberOfUpgrade = 0;
    $('#link-upgrade').removeClass("notification-icon");
    if(noviceUpgradeCost <= numWidgets)
        numberOfUpgrade++;
    if(masterUpgradeCost <= numWidgets)
        numberOfUpgrade++;
    if(epicUpgradeCost <= numWidgets)
        numberOfUpgrade++;
    if(legendUpgradeCost <= numWidgets)
        numberOfUpgrade++;
    if(clickUpgradeCost <= numWidgets)
        numberOfUpgrade++;
    if(numberOfUpgrade > 0){
        $('#link-upgrade').addClass("notification-icon");
        $('#link-upgrade').attr("data-count", numberOfUpgrade);
    }
}

// Run UI update code every 10ms
window.setInterval(function () {
    // Novices add 1 per second (1/100 every 10ms)
    numWidgets += getIncrementNovice(100);

    // Masters add 5 per second (5/100 every 10ms)
    numWidgets += getIncrementMaster(100);

    numWidgets += getIncrementEpic(100);

    numWidgets += getIncrementLegend(100);

    widgetPerSecond = getIncrementNovice(1) + getIncrementMaster(1) + getIncrementEpic(1) + getIncrementLegend(1);
    // Update the text showing how many widgets we have, using Math.floor() to round down
    $('#widget-count').text(Math.floor(numWidgets));
    $('#widget-per-second').text(widgetPerSecond);

    // Update the widgeteers with their current prices
    $('#novice-widgeteer').text('Hire Novice Widgeteer - ' + noviceWidgeteerCost);
    $('#master-widgeteer').text('Hire Master Widgeteer - ' + masterWidgeteerCost);
    $('#epic-widgeteer').text('Hire Epic Widgeteer - ' + epicWidgeteerCost);
    $('#legend-widgeteer').text('Hire Legend Widgeteer - ' + legendWidgeteerCost);    

    // Enable/disable the widgeteer buttons based on our numWidgets
    $('#novice-widgeteer').prop('disabled', noviceWidgeteerCost > numWidgets);
    $('#master-widgeteer').prop('disabled', masterWidgeteerCost > numWidgets);
    $('#epic-widgeteer').prop('disabled', epicWidgeteerCost > numWidgets);
    $('#legend-widgeteer').prop('disabled', legendWidgeteerCost > numWidgets);

    $('#novice-upgrade').prop('disabled', noviceUpgradeCost > numWidgets);
    $('#master-upgrade').prop('disabled', masterUpgradeCost > numWidgets);
    $('#epic-upgrade').prop('disabled', epicUpgradeCost > numWidgets);
    $('#legend-upgrade').prop('disabled', legendUpgradeCost > numWidgets);
    $('#click-upgrade').prop('disabled', clickUpgradeCost > numWidgets);

    $('#novice-number').text(numNoviceWidgeteers + ' (' + getIncrementNovice(1) + ' /s)');
    $('#master-number').text(numMasterWidgeteers  + ' (' + getIncrementMaster(1) + ' /s)');
    $('#epic-number').text(numEpicWidgeteers  + ' (' + getIncrementEpic(1) + ' /s)');
    $('#legend-number').text(numLegendWidgeteers  + ' (' + getIncrementLegend(1) + ' /s)');
    $('#click-number').text(getIncrementClick());

    $('#number-novice-upgrades').text(numNoviceUpgrades);
    $('#number-master-upgrades').text(numMasterUpgrades);
    $('#number-epic-upgrades').text(numEpicUpgrades);
    $('#number-legend-upgrades').text(numLegendUpgrades);
    $('#number-click-upgrades').text(numClickUpgrades);

    $('#novice-upgrade').text('Novice Upgrade - ' +  noviceUpgradeCost);
    $('#master-upgrade').text('Master Upgrade - ' +  masterUpgradeCost);
    $('#epic-upgrade').text('Epic Upgrade - ' +  epicUpgradeCost);
    $('#legend-upgrade').text('Legend Upgrade - ' +  legendUpgradeCost);
    $('#click-upgrade').text('Click Upgrade - ' +  clickUpgradeCost);

    getUpgradeNumber();
}, 10);