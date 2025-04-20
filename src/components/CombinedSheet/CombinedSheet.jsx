import React, { useState, useEffect } from 'react';
import './CombinedSheet.css'

import {
  ResourceTracker, 
  ComponentTracker, 
  Tooltip, 
  ChecklistItem, 
  ChecklistSection, 
  TabSystem, 
  createCharacterStorage,
  clearSheetData
} from '../SheetUtilities/SheetUtilities.jsx';

// Create sheet-specific storage
const SHEET_ID = 'combined';
const characterStorage = createCharacterStorage(SHEET_ID);

// Main GUTSCharacterSheet component
const CombinedSheet = () => {
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
  const [boardLook, setBoardLook] = characterStorage.useCharacterField('boardLook');
  
  // Function to reset character sheet
  const resetSheet = () => {
    if (window.confirm('Reset all character data? This cannot be undone.')) {
      clearSheetData(SHEET_ID);
      window.location.reload();
    }
  };
  
  // Define trait data
  const traits = [
    {
      id: 'raw-talent',
      label: 'Raw Talent',
      tooltip: "You've always just been amazing at... If this would help you with an action, you can mark 1 trouble to upgrade a 1-3 result into a 4/5 result.",
      hasTextInput: true,
      placeholder: "You've always been amazing at..."
    },
    {
      id: 'show-off',
      label: 'Show Off',
      tooltip: "You get +1d6 when you do a trick. You just can't help it, the spotlight loves you."
    },
    {
      id: 'snake',
      label: 'Snake',
      tooltip: "If there is any question about who goes first, it's you."
    },
    {
      id: 'double-dare',
      label: 'Double Dare',
      tooltip: "Instead of taking a dare, you can mark 2 trouble for +2d6 or +2 kick to an action roll."
    },
    {
      id: 'walking-disaster',
      label: 'Walking Disaster',
      tooltip: "You don't just flirt with disaster, you're dating it. You get +1d6 on disaster rolls, and can choose to take a disaster for a willing teammate. If you do, mark 2 style."
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
    { id: 'forbidden', label: "something you're not supposed to have" },
    { id: 'speaker', label: 'portable speaker' },
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
      { id: 'swagger', label: 'Swagger (2s)' },
      { id: 'origin', label: 'Origin Story (3s)' },
      { id: 'sharpened', label: 'Sharpened (4s)' }
    ],
    gutsArc: [
      { id: 'spotlight', label: 'Spotlight (3s)' },
      { id: 'star-power', label: 'Star Power (2s)' },
      { id: 'going-solo', label: 'Going Solo (4t)' },
      { id: 'i-in-team', label: 'The I in Team (1s)' }
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

  // Define board mods
  const boardMods = [
    {
      id: 'photon-vent',
      label: 'Photon Vent (1 Coil, 1 Gem)',
      tooltip: 'Roll to create trails of semi-permanent, slightly brittle hardlight behind you, which float in space until they fade.'
    },
    {
      id: 'energy-lattice',
      label: 'Energy Lattice (1 Lens, 1 Coil)',
      tooltip: 'Roll to reform your board into custom shapes, including tools, hand weapons, and other useful objects of a similar size.'
    },
    {
      id: 'photon-exciter',
      label: 'Photon Exciter (1 Lens, 1 Coil)',
      tooltip: 'Roll to damage things you grind, slide, ollie over, or just smack with your board.'
    },
    {
      id: 'flicker-switch',
      label: 'Flicker Switch (1 Lens, 1 Gem)',
      tooltip: "Avoid a physical slam by marking 1 turbo. You blink out of existence for a second. What's it feel like?"
    },
    {
      id: 'matter-photonizer',
      label: 'Matter Photonizer (2 Coils, 1 Lens, 1 Gem)',
      tooltip: "Mark 2 turbo to turn yourself (and your gear) into pure light. The rest of the world pauses. You can't affect the paused world, but you can observe and move around in it. Time starts again after about an hour, or once you've moved 100 total feet."
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
    },
    {
      id: 'kitbashed',
      label: 'Kitbashed',
      tooltip: 'Buy a mod from another device.',
      hasTextInput: true,
      placeholder: 'Describe mod here...'
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
        <h3>PROBLEMS</h3>
        <p>Bad things that happen to you, usually when you roll badly or the GM spends bite. There are two kinds, snags (complications, twists, etc.) and slams.</p>
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
        <h3>NOPE</h3>
        <p>If you don't want to take a slam, say "nope!" and describe the cool thing your character does to avoid it instead. Then mark 2 trouble.</p>
      </div>
      
      <div className="rule-section">
        <h3>TROUBLE</h3>
        <ul>
          <li>If you mark your eighth trouble box, disaster strikes!</li>
          <li>Trouble is cleared by buying beats during downtime or by taking dares.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>DISASTER</h3>
        <ul>
          <li>The GM asks each player to make a disaster roll near the end of the run (often on the way home).</li>
          <li>Roll 1d6 per empty trouble box on your sheet. Take the highest result.</li>
          <li>If it's a 6, you avoid disaster and mark 1 style. If it's a 4 or 5, you avoid disaster but mark 1 trouble. If it's a 1–3, something really bad happens and you mark doom.</li>
          <li>Disaster may also automatically strike in special situations, like if you mark all your trouble or take too many slams.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>LEGACY</h3>
        <ul>
          <li>You get legacy from certain downtime beats and crew perks. Write it on your sheet. Be descriptive.</li>
          <li>Legacy may be lost due to disaster, or sacrificed to mend a fractured crew.</li>
          <li>The amount of legacy you collect helps determine your epilogue.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>DOOM</h3>
        <ul>
          <li>Disaster and certain downtime beats can give you doom. Write it on your sheet. Be descriptive.</li>
          <li>Doom can also be cleared with certain beats, or by going on a run specifically for that purpose.</li>
          <li>Your doom helps determine your epilogue.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>STYLE</h3>
        <p>You gain style by doing tricks, going on certain runs, using certain traits, etc. You use style to buy beats and make your crew famous.</p>
      </div>
      
      <div className="rule-section">
        <h3>SHARING</h3>
        <p>As long as you can describe it, you are free to use boost, kick, or dares to improve a teammate's action roll, freely take (or nope) slams for each other, share or trade components, or donate style to the crew or a specific teammate. (You can't share trouble.)</p>
      </div>
      
      <div className="rule-section">
        <h3>FRACTURES</h3>
        <ul>
          <li>Certain downtime beats and challenges can cause the crew to take or clear fractures. Write them on the crew sheet, in a fracture box. Be descriptive.</li>
          <li>If your crew takes a fracture when all fracture boxes are full, you break up. Everyone marks 1 doom and one or more PCs must leave the crew.</li>
          <li>Reconciliation requires a significant sacrifice, such as one member clearing some legacy or marking doom.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>BOARD TRICK IDEAS</h3>
        <ul>
          <li><strong>Rotations.</strong> 180s, 360s, backflips, wildcats, mistys, mctwists, underflips, half-cabs, corkscrews, and other tricks where you rotate in the air before landing.</li>
          <li><strong>Flip Tricks.</strong> Kickflips, heelflips, caspers, hardflips, treflips, shove-its, impossibles, and anything else where the board itself flips or rotates before you land back on it.</li>
          <li><strong>Board Grabs.</strong> Tail grabs, nose grabs, melons, indys, mutes, methods, chicken salads, and anything where you reach down and grab a part of your board with your hand while in the air, often paired with a rotation.</li>
          <li><strong>Rail Tricks.</strong> Boardslides, nosegrinds, 50-50s, crooks, lipslides, and other tricks where your board makes direct contact with a rail or ledge as you slide along it.</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>ACTION IDEAS</h3>
        <ul>
          <li>blast something</li>
          <li>sneak or hide</li>
          <li>run away or race</li>
          <li>climb a tree</li>
          <li>hack a drone</li>
          <li>sound convincing</li>
          <li>look for something</li>
          <li>remember a crucial fact you may have learned in school</li>
          <li>pull an item you could reasonably have packed out of your backpack</li>
        </ul>
      </div>
      
      <div className="rule-section">
        <h3>KICK LETS YOU...</h3>
        <ul>
          <li>Mark more of a progress track or shoot down more laserflies!</li>
          <li>Damage a monster with an otherwise ineffective attack. Punch that giant crab right in the nerve sac.</li>
          <li>Get more style points when landing a trick (1 style per kick).</li>
          <li>Gain some side benefit, or do a couple things at the same time.</li>
          <li>And more! If it's too much to ask from a normal action, add kick and ask again.</li>
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
      <h1>GUTS</h1>
      
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
            Describe how your guts help your action, then boost or kick as needed. 
            Also, refill 1 attitude whenever you attempt a trick, even if you fail. Feel the rush?
          </p>
          
          <div className="resource-tracker">
            <div>
              <Tooltip content="Mark a boost for +1d6 to an action roll. No stacking limit.">
                Boost
              </Tooltip>
              &nbsp;&amp;&nbsp;
              <Tooltip content="Mark a kick to increase the potential impact of an action roll (the kick is still spent even if you fail). No stacking limit.">
                Kick
              </Tooltip>
              , respectively:
            </div>
            <ResourceTracker type="dice" count={3} id="attitude_boost" sheetId={SHEET_ID} />
            <ResourceTracker type="lightning" count={3} id="attitude_kick" sheetId={SHEET_ID} />
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
          <ResourceTracker type="triangle" id="trouble" sheetId={SHEET_ID} />
        </div>
        
        <div className="section" style={{ flex: 1 }}>
          <h2>Style</h2>
          <p>+1 after runs where you show boldness or risk-taking</p>
          <ResourceTracker type="diamond" id="style" sheetId={SHEET_ID} />
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
            <ChecklistSection title="Guts Arc" items={beats.gutsArc} sheetId={SHEET_ID} />
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
      
      {/* Hardlight Board Section */}
      <div className="hardlight-section">
        <h1>Hardlight Board</h1>
        <p>
          Create a board made of solid, stable light with this wrist-mounted device. 
          Out of the box, it's basically just a standard hoverboard you can use as a nightlight, 
          but a good programmer can unlock its true photonic potential. Hold onto your waveforms!
        </p>
        
        <div className="flex-row">
          <div className="section" style={{ flex: 1 }}>
            <h2>Function</h2>
            <p>
              Go fast over solid terrain on a hoverboard made from crystallized light. 
              Make your board non-exist and re-exist at will.
            </p>
          </div>
          
          <div className="section" style={{ flex: 1 }}>
            <h2>Look</h2>
            <textarea 
              placeholder="purple city, blue sunset, loud stars, white heat, pink ice, teal god, neon black, something else..." 
              style={{ minHeight: '60px' }}
              value={boardLook}
              onChange={(e) => setBoardLook(e.target.value)}
            />
          </div>
        </div>
        
        <div className="section">
          <h2>Turbo</h2>
          <p>Describe how your device helps you with an action, then boost or kick as needed.</p>
          <div className="flex-row">
            <ResourceTracker type="dice" count={3} id="turbo_boost" sheetId={SHEET_ID} />
            <ResourceTracker type="lightning" count={3} id="turbo_kick" sheetId={SHEET_ID} />
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
                  placeholder={component.placeholder}
                  hasTextInput={component.hasTextInput}
                  sheetId={SHEET_ID}
                />
              ))}
            </div>
          </div>
          
          <div className="section" style={{ flex: 1 }}>
            <h2>Mods</h2>
            <div className="trait-list">
              {boardMods.map((mod) => (
                <ChecklistItem 
                  key={mod.id} 
                  id={mod.id} 
                  label={mod.label} 
                  tooltip={mod.tooltip}
                  sheetId={SHEET_ID}
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

export default CombinedSheet