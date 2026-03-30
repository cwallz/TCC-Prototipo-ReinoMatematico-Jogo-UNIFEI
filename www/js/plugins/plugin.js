var Imported = Imported || {};
Imported.gold = true;

var YourFace = YourFace || {};
YourFace.gold = YourFace.gold || {};
 
    //=============================================================================
/*:
* @plugindesc v1.0 Divides gold by a certain number to make it a decimal.
* @param Dividend
* @desc What number to divide gold by.
* @default 100
*/
    //=============================================================================

(function() {
    var parameters = PluginManager.parameters('gold');
    var dividend = Number(parameters['Dividend']);
    Game_Party.prototype.gold = function() {
        var goldDec = this._gold / dividend;
        return goldDec;
    };
}) ();