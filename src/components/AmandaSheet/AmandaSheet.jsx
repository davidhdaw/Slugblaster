import React, { useState } from 'react';
import {
  ResourceTracker, 
  ComponentTracker, 
  Tooltip, 
  ChecklistItem, 
  ChecklistSection, 
  TabSystem, 
  createCharacterStorage,
  clearSheetData
} from '../SheetUtilities/SheetUtilities';

// Create sheet-specific storage
const SHEET_ID = 'amanda';
const characterStorage = createCharacterStorage(SHEET_ID);

// ChillCharacterSheet component
const AmandaSheet = () => {
  // Use character storage for text fields
  const [name, setName] = characterStorage.useCharacterField('name');
  const [look, setLook] = characterStorage.useCharacterField('look');
  const [family, setFamily] = characterStorage.useCharacterField('family');
  const [bond, setBond] = characterStorage.useCharacterField('bond');
  const [vibes, setVibes] = characterStorage.useCharacterField('vibes');
  const [stickers, setStickers] = characterStorage.useCharacterField('stickers');
  const [legacy, setLegacy] = characterStorage.useCharacterField('legacy');
  const [doom, setDoom] = characterStorage.useCharacterField('doom');
  const [slam1, setSlam1] = characterStorage.useCharacterField('slam1');
  const [slam2, setSlam2] = characterStorage.useCharacterField('slam2');
  const [backpackLook, setBackpackLook] = characterStorage.useCharacterField('backpackLook');
  
  // Function to reset character sheet
  const resetSheet = () => {
    if (window.confirm('Reset all character data? This cannot be undone.')) {
      clearSheetData(SHEET_ID);
      window.location.reload();
    }
  };
  
  // Define CHILL's traits
  const traits = [
    {
      id: 'quirk',
      label: 'Quirk',
      tooltip: "For some weird reason, you are good at... If this would help you with an action, you can mark 1 trouble to upgrade a 1-3 result into a 4/5 result.",
      hasTextInput: true,
      placeholder: "For some weird reason, you are good at..."
    },
    {
      id: 'steezey',
      label: 'Steezey',
      tooltip: "Mark 1 style anytime you roll doubles. You look cool without even knowing it."
    },
    {
      id: 'umm-guys',
      label: 'Umm... Guys?',
      tooltip: "You accidentally notice the stuff everyone else didn't, like hidden panels, perfect skate spots, looming monsters, etc."
    },
    {
      id: 'button-masher',
      label: 'Button Masher',
      tooltip: "Mark 1 turbo to use a locked mod for the length of one action—or 2 turbo if the mod is from another device. Potential problems are worse."
    },
    {
      id: 'lucky',
      label: 'Lucky',
      tooltip: "Once per run, dumb luck helps you. A tree falls on a monster, lasers miss as you tie your shoes, you unknowingly give someone a perfect gift, etc."
    },
    {
      id: 'personal-growth',
      label: 'Personal Growth',
      tooltip: "A trait from another personality. How are you changing? Who are you learning from?",
      hasTextInput: true,
      placeholder: "How are you changing?"
    }
  ];

  // Define gear data
  const gear = [
    { id: 'board', label: 'your board' },
    { id: 'raygun', label: 'your raygun' },
    { id: 'phone', label: 'your phone' },
    { id: 'found-something', label: "something you found on your way here" },
    { id: 'pet', label: 'a pet' },
    { id: 'hook', label: 'grappling hook' },
    { id: 'spacetime', label: 'spacetime amp.' },
    { id: 'maps', label: 'multiversal maps' },
    { id: 'drone', label: 'a small drone' },
    { id: 'hacking', label: 'hacking tools' },
    { id: 'repair', label: 'repair tools' },
    { id: 'camera', label: 'pro camera gear' }
  ];

  // Define beats data
  const beats = {
    traitBeats: [
      { id: 'just-vibin', label: 'Just Vibin\' (2s)' },
      { id: 'origin', label: 'Origin Story (3s)' },
      { id: 'sharpened', label: 'Sharpened (4s)' }
    ],
    chillArc: [
      { id: 'caught-in-plot', label: 'Caught in a Plot (2s)' },
      { id: 'serendipity', label: 'Serendipity (1s)' },
      { id: 'in-too-deep', label: 'In Too Deep (4t)' },
      { id: 'somehow-works-out', label: 'Somehow Works Out (3s)' }
    ],
    familyArc: [
      { id: 'trouble-home', label: 'Trouble at Home (2t)' },
      { id: 'final-warning', label: 'Final Warning (3s)' },
      { id: 'last-straw', label: 'Last Straw (4t)' },
      { id: 'redemption', label: 'Redemption (4s)' }
    ],
    angstArc: [
      { id: 'angst', label: 'Angst (2t)' },
      { id: 'struggling', label: 'Struggling (3t)' },
      { id: 'darkness', label: 'Darkness (4t)' },
      { id: 'catharsis', label: 'Catharsis (4s)' }
    ],
    crewBeats: [
      { id: 'opportunity', label: 'Opportunity (2s)' },
      { id: 'challenge', label: 'Challenge (5t)' },
      { id: 'fight', label: 'Fight (5t)' },
      { id: 'make-up', label: 'Make Up (5s)' }
    ],
    otherBeats: [
      { id: 'being-good', label: 'Being good (1s)' },
      { id: 'earned-it', label: 'You Earned It (5s)' },
      { id: 'take-l', label: 'Take an L (5t)' },
      { id: 'in-lab', label: 'In the Lab (1s)' },
      { id: 'portal', label: 'Portal Discovery (2s)' }
    ]
  };

  // Define Voidwear Backpack mods
  const voidwearMods = [
    {
      id: 'astral-intake',
      label: 'Astral Intake (1 Coil, 1 Disc)',
      tooltip: 'Mark 1 turbo and roll to pull a unique, specialized, or implausible item from the multiverse, like antitoxin, an alien lifeform, or almost the exact keycard you need.'
    },
    {
      id: 'omni-siphon',
      label: 'Omni-Siphon (1 Coil, 1 Gem)',
      tooltip: 'Roll to vent a cocktail of energy from the multiverse. Use it as a makeshift weapon, jump pack, or charging station.'
    },
    {
      id: 'chaos-vent',
      label: 'Chaos Vent (1 Coil, 1 Disc)',
      tooltip: 'Mark 1 turbo. Turn your bag into a one-way portal to a randomly selected world. The bag goes with you.'
    },
    {
      id: 'collapsible-panels',
      label: 'Collapsible Panels (1 Coil)',
      tooltip: 'You can fold your bag into itself, leaving only a single zipper tab in your hand, which can be used to reopen the bag.'
    },
    {
      id: 'reversible-zipper',
      label: 'Reversible Zipper (2 Coils, 1 Gem, 1 Disc)',
      tooltip: 'Roll to turn your bag inside out. You and everyone and everything in a room-sized area are now floating inside your bag, surrounded by all your junk. Outside observers simply see a bag lying on the ground.'
    },
    {
      id: 'kitbashed',
      label: 'Kitbashed',
      tooltip: 'Buy a mod from another device.',
      hasTextInput: true,
      placeholder: 'Describe mod here...'
    }
  ];

  // Define special components
  const specialComponents = [
    {
      id: 'power-cell',
      label: 'Power Cell (2 gems)',
      tooltip: 'Turbo gains 1 kick.'
    },
    {
      id: 'stabilizer',
      label: 'Stabilizer (1 coil, 1 disc)',
      tooltip: 'Turbo gains 1 boost.'
    }
  ];

  // Split gear for two columns
  const gearColumnOne = gear.slice(0, 6);
  const gearColumnTwo = gear.slice(6);

  // Rules content for the tabs
  const rulesContent = (
    <div className="rules-content">
      <div className="rule-section">
        <h3>ACTION ROLLS</h3>
        <ul>
          <li>Say what you're trying to do and then roll a six-sided die (1d6).</li>
          <li>If you get a 6, you succeed. If you get a 4 or 5, you succeed but there's a problem. If you get a 1–3, you fail, and there's a problem.</li>
          <li>Describe your success (or failure). The GM describes the impact, as well as any problems.</li>
          <li>Some abilities add more dice to your roll. In this case, take the highest result.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>BOOST & KICK</h3>
        <p>
          Mark a <Tooltip content="Mark a boost for +1d6 to an action roll. No stacking limit.">boost</Tooltip> for +1d6 to an action roll. 
          Mark a <Tooltip content="Mark a kick to increase the potential impact of an action roll (the kick is still spent even if you fail). No stacking limit.">kick</Tooltip> to 
          increase the potential impact of an action roll (the kick is still spent even if you fail.) No stacking limit.
        </p>
      </div>

      <div className="rule-section">
        <h3>DARES</h3>
        <p>If you...</p>
        <ul>
          <li>let GM gain 1 bite,</li>
          <li>let GM introduce an extra problem, suggested by you, or</li>
          <li>mark 1 trouble.</li>
        </ul>
        <p>You can...</p>
        <ul>
          <li>get +1d6 to an action roll,</li>
          <li>get +1 <Tooltip content="Mark a kick to increase the potential impact of an action roll.">kick</Tooltip> to an action roll, or</li>
          <li>clear 1 trouble</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>DO A TRICK</h3>
        <p>Add a trick, a flourish, or some extra show to any action by saying "check it" before your roll. Any problems rolled are worse, but if you succeed you also mark 1 style.</p>
      </div>
      
      <div className="rule-section">
        <h3>SLAMS</h3>
        <ul>
          <li>If you take a slam and don't have room for it then disaster strikes!</li>
          <li>Slams during clean-up at the end of the run.</li>
          <li>Situational slams may clear sooner if it makes sense.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>TROUBLE</h3>
        <ul>
          <li>If you mark your eighth trouble box, disaster strikes!</li>
          <li>Trouble is cleared by buying beats during downtime or by taking dares.</li>
        </ul>
      </div>
    </div>
  );
  
  // Define tabs
  const tabs = [
    {
      title: 'Character',
      content: <p>Character sheet is displayed above. Click the "Rules Reference" tab to see game mechanics and terminology.</p>
    },
    {
      title: 'Rules Reference',
      content: rulesContent
    }
  ];

  return (
    <div className="container">
      <h1>CHILL</h1>
      
      {/* Character Info Section */}
      <div className="character-info">
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="look">Look</label>
          <input 
            type="text" 
            id="look" 
            value={look}
            onChange={(e) => setLook(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="family">Family</label>
          <input 
            type="text" 
            id="family" 
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bond">Bond</label>
          <input 
            type="text" 
            id="bond" 
            value={bond}
            onChange={(e) => setBond(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="vibes">Vibes</label>
          <input 
            type="text" 
            id="vibes" 
            value={vibes}
            onChange={(e) => setVibes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stickers">Stickers, etc.</label>
          <input 
            type="text" 
            id="stickers" 
            value={stickers}
            onChange={(e) => setStickers(e.target.value)}
          />
        </div>
      </div>
      
      {/* Attitude and Legacy Section */}
      <div className="flex-row">
        <div className="section" style={{ flex: 1 }}>
          <h2>Attitude</h2>
          <p>
            Sit back, relax, and get +1d6 to all your actions. Things 
            just tend to work out. (This puppy can't be shared with 
            teammates. They're too busy to enjoy it, anyways.)
          </p>
          
          <div className="resource-tracker">
            <div>Dice:</div>
            <ResourceTracker type="dice" count={1} />
            <div className="infinity-symbol">∞</div>
          </div>
        </div>
        
        <div className="section" style={{ flex: 1 }}>
          <h2>Legacy</h2>
          <p>Trophies, stories, scholarships, good memories, etc.</p>
          <textarea 
            rows="4"
            value={legacy}
            onChange={(e) => setLegacy(e.target.value)}
          />
        </div>
      </div>
      
      {/* Trouble and Style Trackers */}
      <div className="flex-row">
        <div className="section" style={{ flex: 1 }}>
          <h2>Trouble</h2>
          <ResourceTracker type="square" id="trouble" sheetId={SHEET_ID} />
        </div>
        
        <div className="section" style={{ flex: 1 }}>
          <h2>Style</h2>
          <p>+1 after runs where you show ease or flow</p>
          <ResourceTracker type="square" id="style" sheetId={SHEET_ID} />
        </div>
      </div>
      
      {/* Doom and Slams Section */}
      <div className="flex-row">
        <div className="section" style={{ flex: 1 }}>
          <h2>Doom</h2>
          <p>Scars, debts, burnt bridges, trauma, etc.</p>
          <textarea 
            rows="4"
            value={doom}
            onChange={(e) => setDoom(e.target.value)}
          />
        </div>
        
        <div className="section" style={{ flex: 1 }}>
          <h2>Slams</h2>
          <div className="flex-column">
            <textarea 
              rows="3"
              value={slam1}
              onChange={(e) => setSlam1(e.target.value)}
            />
            <textarea 
              rows="3"
              value={slam2}
              onChange={(e) => setSlam2(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Traits and Gear Section */}
      <div className="flex-row">
        <div className="section" style={{ flex: 3 }}>
          <h2>Traits</h2>
          <div className="trait-list">
            {traits.map((trait) => (
              <ChecklistItem 
                key={trait.id} 
                id={trait.id} 
                label={trait.label} 
                tooltip={trait.tooltip}
                placeholder={trait.placeholder}
                hasTextInput={trait.hasTextInput}
                sheetId={SHEET_ID}
              />
            ))}
          </div>
        </div>
        
        <div className="section" style={{ flex: 2 }}>
          <h2>Gear</h2>
          <div className="flex-row">
            <div className="flex-column" style={{ flex: 1 }}>
              {gearColumnOne.map((item) => (
                <ChecklistItem 
                  key={item.id} 
                  id={item.id} 
                  label={item.label}
                  sheetId={SHEET_ID}
                />
              ))}
            </div>
            <div className="flex-column" style={{ flex: 1 }}>
              {gearColumnTwo.map((item) => (
                <ChecklistItem 
                  key={item.id} 
                  id={item.id} 
                  label={item.label}
                  sheetId={SHEET_ID}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Beats Section */}
      <div className="section">
        <h2>Beats</h2>
        <div className="flex-row">
          <div className="flex-column" style={{ flex: 1 }}>
            <ChecklistSection title="Trait Beats" items={beats.traitBeats} sheetId={SHEET_ID} />
            <ChecklistSection title="Chill Arc" items={beats.chillArc} sheetId={SHEET_ID} />
          </div>
          
          <div className="flex-column" style={{ flex: 1 }}>
            <ChecklistSection title="Family Arc" items={beats.familyArc} sheetId={SHEET_ID} />
            <ChecklistSection title="Angst Arc" items={beats.angstArc} sheetId={SHEET_ID} />
          </div>
          
          <div className="flex-column" style={{ flex: 1 }}>
            <ChecklistSection title="Crew Beats" items={beats.crewBeats} sheetId={SHEET_ID} />
            <ChecklistSection title="Other Beats" items={beats.otherBeats} sheetId={SHEET_ID} />
          </div>
        </div>
      </div>
      
      {/* Voidwear Backpack Section */}
      <div className="voidwear-section">
        <h1>Voidwear Backpack</h1>
        <p>
          The back-breaking sport of shoulder-hoarding was transformed by Miper's iconic, 
          ubiquitous Voidwear® backpack, which uses [stolen] proprietary shipping technology 
          to allow you to carry the contents of your bedroom in a simple 1-pocket cinch.
        </p>
        
        <div className="flex-row">
          <div className="section" style={{ flex: 1 }}>
            <h2>Function</h2>
            <p>
              Store any amount of objects smaller than a person in your bag's pocket dimension. 
              Roll to see if you happen to have a specific everyday item in there.
            </p>
          </div>
          
          <div className="section" style={{ flex: 1 }}>
            <h2>Look</h2>
            <textarea 
              placeholder="nylon, canvas, denim, leather, plastic, hardlight, mirage-weave, satchel, something else" 
              style={{ minHeight: '60px' }}
              value={backpackLook}
              onChange={(e) => setBackpackLook(e.target.value)}
            />
          </div>
        </div>
        
        <div className="section">
          <h2>Turbo</h2>
          <p>Describe how your device helps you with an action, then boost or kick as needed.</p>
          <div className="flex-row">
            <ResourceTracker type="dice" count={3} id="attitude_boost" sheetId={SHEET_ID} />
            <ResourceTracker type="lightning" count={3} id="attitude_kick" sheetId={SHEET_ID} />
          </div>
        </div>
        
        <div className="flex-row">
          <div className="section" style={{ flex: 1 }}>
            <h2>Components</h2>
            <div className="component-grid">
              <ComponentTracker type="LENSES" id="lenses" sheetId={SHEET_ID} />
              <ComponentTracker type="COILS" id="coils" sheetId={SHEET_ID} />
              <ComponentTracker type="DISCS" id="discs" sheetId={SHEET_ID} />
              <ComponentTracker type="GEMS" id="gems" sheetId={SHEET_ID} />
            </div>
            
            <h3>Special Components</h3>
            <div className="trait-list">
              {specialComponents.map((component) => (
                <ChecklistItem 
                  key={component.id} 
                  id={component.id} 
                  label={component.label} 
                  tooltip={component.tooltip}
                  sheetId={SHEET_ID}
                />
              ))}
            </div>
          </div>
          
          <div className="section" style={{ flex: 1 }}>
            <h2>Mods</h2>
            <div className="trait-list">
              {voidwearMods.map((mod) => (
                <ChecklistItem 
                  key={mod.id} 
                  id={mod.id} 
                  label={mod.label} 
                  tooltip={mod.tooltip}
                  placeholder={mod.placeholder}
                  hasTextInput={mod.hasTextInput}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Rules Reference Tabs */}
      <TabSystem tabs={tabs} id="rules_tabs" sheetId={SHEET_ID} />
      
      {/* Reset Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={resetSheet}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reset Character Sheet
        </button>
      </div>
    </div>
  );
};

export default AmandaSheet;