//Guard Upgrade
//Version 1.00
//SumRndmDde

/*:
 * @plugindesc This Plugin gives more options for your Guard skill and
 * Guard command in battle! 
 *
 * @author SumRndmDde
 *
 * @param Default GDD (Actors)
 * @desc This is the default Guard Damage Divisor that Actors
 * use when they do not have a specific one.
 * @default 2
 *
 * @param Default GDD (Enemies)
 * @desc This is the default Guard Damage Divisor that Enemies
 * use when they do not have a specific one.
 * @default 2
 *
 * @param Default Guard Skill
 * @desc Input the Skill ID you wish for Actors to use when
 * one hasn't specifically been set.
 * @default 2
 *
 * @param Guard State ID
 * @desc Input the State ID for a "normal" guard State.
 * It is used in the <appliesGuardToUser> command.
 * @default 2
 *
 * @param [Status Menu]
 * @desc
 * @default --------------------
 *
 * @param Show GDD in Status?
 * @desc Set this to 'yes' if you wish for an Actor's Guard
 * Damage Divisor (GDD) on the Status Menu.
 * @default yes
 *
 * @param Status GDD Name
 * @desc This is what GDD is called on the Status Menu.
 * @default Guard Damage Divisor
 *
 * @param Status GDD Color
 * @desc This is what the word GDD is colored on the Status Menu.
 * @default 2
 *
 * @param Status GDD Width
 * @desc This is how wide the word GDD is on the Status Menu.
 * If it looks squished, then increase this number.
 * @default 240
 *
 * @help This Plugin gives more options for your Guard skill and
 * Guard command in battle! 
 *
 * This Plugin adds 4 new features to your game:
 *
 * #1
 * This Plugin adds a new "stat" to your game.
 * 
 * This stat is Guard Damage Divisor (GDD).
 * The Guard Damage Divisor is the number that damage is divided by when
 * the target is guarding.
 *
 * For example:
 * If an Actor is guarding, and they are attacked by an Enemy, 
 * then the damage the Enemy would normally infilict would be 1/4 the 
 * normal amount if the Actor has a Guard Damage Divisor of 4.
 *
 * By default, the value used is '2' in normal RPG Maker MV.
 * (Meaning all damage is reduced in half when it affects a guarding target.)
 *
 * However, using this Plugin, you can change this number for your
 * Actors based on Class/Equips/States and also set a specific number for
 * Enemies.
 *
 * #2
 * You can also allow the GDD (Guard Damage Divisor) to be visible
 * on the Status Menu.
 * 
 * #3
 * If you're not a big fan of the normal guarding,
 * then you can also use this Plugin to set an Actor's Guard command
 * to a different Skill ID.
 *
 * #4
 * You can use this Plugin to make certain Skills
 * give the "Guard" affect to the user even if the Skill's scope
 * is set to something else besides the user.
 *
 *
 * Let's start with the Notetags:
 *
 * ----Notetags----
 *
 * Actor/Class/Armor/Weapon/State Notetags:
 *
 * <setGuardDamageDivisor: x>
 * Set x to the GDD you wish for this Actor to have.
 * This will override all <addGuardDamageDivisor: x> commands.
 * Furthermore, this command takes the following priority:
 *  - State
 *  - Weapon
 *  - Armor
 *  - Class
 *  - Actor
 * If multiple of these have <setGuardDamageDivisor: x> in their Notetag,
 * then the one higher on the list will be the one used.
 *
 * <addGuardDamageDivisor: x>
 * Set x to the amount of GDD you wish this Actor/Class/Armor/Weapon/State
 * to add to their total GDD.
 * The total number is used as the Actor's GDD.
 *
 * <guardSkillID: x>
 * Set x to the Skill ID you wish this Actor to use when they
 * use the Guard command in battle.
 * Furthermore, this command takes the following priority:
 *  - State
 *  - Weapon
 *  - Armor
 *  - Class
 *  - Actor
 * If multiple of these have <guardSkillID: x> in their Notetag,
 * then the one higher on the list will be the one used.
 *
 *
 * Enemy Notetags:
 *
 * <guardDamageDivisor: x>
 * Set x to the GDD you wish this Enemy to have.
 *
 *
 *
 * Time for the Parameters:
 *
 * ----Parameters----
 *
 * Default GDD (Actors)
 *    This is the default Guard Damage Divisor that Actors
 *    use when they do not have a specific one.
 *    Default is 2
 *
 * Default GDD (Enemies)
 *    This is the default Guard Damage Divisor that Enemies
 *    use when they do not have a specific one.
 *    Default is 2
 *
 * Default Guard Skill
 *    Input the Skill ID you wish for Actors to use when
 *    one hasn't specifically been set.
 *    Default is 2
 *
 * Guard State ID
 *    Input the State ID for a "normal" guard State.
 *    It is used in the <appliesGuardToUser> command.
 *    Default is 2
 *
 * [Status Menu]
 *
 * Show GDD in Status?
 *    Set this to 'yes' if you wish for an Actor's Guard
 *    Damage Divisor (GDD) on the Status Menu.
 *    Default is yes
 *
 * Status GDD Name
 *    This is what GDD is called on the Status Menu.
 *    Default is Guard Damage Divisor
 *
 * Status GDD Color
 *    This is what the word GDD is colored on the Status Menu.
 *    Default is 2
 *
 * Status GDD Width
 *    This is how wide the word GDD is on the Status Menu.
 *    If it looks squished, then increase this number.
 *    Default is 240
 *
 *
 *
 * Finally, let's look at Damage Formula additions:
 *
 * Damage Formulas:
 *
 * a.gdd
 *    This returns Battler a's Guard Damage Divisor.
 *
 *
 *
 * That's all there is for this Plugin!
 * If you like me work, please support me by checking out my YouTube channel:
 * youtube.com/SumRndmDde
 */

var guardUpgradeParameters = PluginManager.parameters('SRD_GuardUpgrade');

var defaultDGG = Number(guardUpgradeParameters['Default GDD (Actors)']);
var defaultDGGEnemy = Number(guardUpgradeParameters['Default GDD (Enemies)']);
var defaultGuardSkill = Number(guardUpgradeParameters['Default Guard Skill']);
var guardStateID = Number(guardUpgradeParameters['Guard State ID']);

var showGDDinStatus
if(guardUpgradeParameters['Show GDD in Status?'] == 'yes' || guardUpgradeParameters['Show GDD in Status?'] == 'true')
{
	showGDDinStatus = true;
}
else
{
	showGDDinStatus = false;
}

var statusGDDName = String(guardUpgradeParameters['Status GDD Name']);
var statusGDDColor = Number(guardUpgradeParameters['Status GDD Color']);
var statusGDDWidth = Number(guardUpgradeParameters['Status GDD Width']);

//Game_BattlerBase

Object.defineProperties(Game_BattlerBase.prototype, {
    // Guard Damage Divisor
    gdd: { get: function() { return this.getGuardDamageDivisor(); }, configurable: true },
});

Game_BattlerBase.prototype.getGuardDamageDivisor = function()
{
	if(this.isEnemy())
	{
		if(this.enemy().meta.guardDamageDivisor)
 		{
 			return Number(this.enemy().meta.guardDamageDivisor);
 		}
 		else
 		{
 			return defaultDGGEnemy;
 		}
	}

	var totalDivisor = defaultDGG;

	for(var i = 0; i < this.states().length; i++)
	{
		if(this.states()[i].meta.setGuardDamageDivisor)
		{
			return Number(this.states()[i].meta.setGuardDamageDivisor);
		}
		if(this.states()[i].meta.addGuardDamageDivisor)
		{
			totalDivisor += this.states()[i].meta.addGuardDamageDivisor;
		}
	}

	for(var i = 0; i < this.equips().length; i++)
	{
		if(this.equips()[i])
		{
			if(this.equips()[i].meta.setGuardDamageDivisor)
			{
				return Number(this.equips()[i].meta.setGuardDamageDivisor);
			}
			if(this.equips()[i].meta.addGuardDamageDivisor)
			{
				totalDivisor += this.equips()[i].meta.addGuardDamageDivisor;
			}
		}
	}

	if(this.currentClass().meta.setGuardDamageDivisor)
	{
		return Number(this.currentClass().meta.setGuardDamageDivisor);
	}

	if(this.currentClass().meta.addGuardDamageDivisor)
	{
		totalDivisor += this.currentClass().meta.addGuardDamageDivisor;
	}

	if(this.actor().meta.setGuardDamageDivisor)
	{
		return Number(this.currentClass().meta.setGuardDamageDivisor);
	}

	if(this.actor().meta.addGuardDamageDivisor)
	{
		totalDivisor += this.currentClass().meta.addGuardDamageDivisor;
	}
	
	if(totalDivisor <= 0)
	{
		return 1;
	}
	return Number(totalDivisor);
}

//Game_Actor

Game_Actor.prototype.guardSkillId = function() {
	for(var i = 0; i < this.states().length; i++)
	{
		if(this.states()[i].meta.guardSkillID)
		{
			return Number(this.states()[i].meta.guardSkillID);
		}
	}

	for(var i = 0; i < this.equips().length; i++)
	{
		if(this.equips()[i])
		{
			if(this.equips()[i].meta.guardSkillID)
			{
				return Number(this.equips()[i].meta.guardSkillID);
			}
		}
	}

	if(this.currentClass())
	{
		if(this.currentClass().meta.guardSkillID)
		{
			return Number(this.currentClass().meta.guardSkillID);
		}
	}

	if(this.actor().meta.guardSkillID)
	{
		return Number(this.actor().meta.guardSkillID);
	}

    return defaultGuardSkill;
};

//Game_Action

Game_Action.prototype.applyGuard = function(damage, target) {
	if(target.isActor())
	{
		var divisor = target.getGuardDamageDivisor();
		if(divisor <= 0)
		{
			divisor = 1;
		}

		return damage / (damage > 0 && target.isGuard() ? divisor * target.grd : 1);
	}

	return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
};

//Scene_Battle

Scene_Battle.prototype.commandGuard = function() {
    BattleManager.inputtingAction().setGuard();

    var skillId = BattleManager.actor().guardSkillId();
    var skill = $dataSkills[skillId];
    if(skill.meta.appliesGuardToUser)
    {
    	BattleManager.actor().addState(guardStateID);
    }

    this.onSelectAction();
};

Scene_Battle.prototype.onSkillOk = function() {
    var skill = this._skillWindow.item();
    var action = BattleManager.inputtingAction();
    if(skill.meta.appliesGuardToUser)
    {
    	BattleManager.actor().addState(guardStateID);
    }
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
};

Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());

    this.changeTextColor(this.textColor(statusGDDColor));
    this.drawText(statusGDDName, x, y, statusGDDWidth);
    this.resetTextColor();
    this.drawText(this._actor.getGuardDamageDivisor(), x + statusGDDWidth, y, 60, 'right');

    for (var i = 1; i < count + 1; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};