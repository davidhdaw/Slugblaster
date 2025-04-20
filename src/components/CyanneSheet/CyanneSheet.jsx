import React, { useState } from 'react';
import './CyanneSheet.css'

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
const SHEET_ID = 'cyanne';
const characterStorage = createCharacterStorage(SHEET_ID);

// HeartCharacterSheet component
const CyanneSheet = () => {
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
  
  // Define HEART's traits
  const traits = [
    {
      id: 'passion',
      label: 'Passion',
      tooltip: "You care a lot about... If this would help you with an action, you can mark 1 trouble to upgrade a 1-3 result into a 4/5 result.",
      hasTextInput: true,
      placeholder: "You care a lot about..."
    },
    {
      id: 'team-player',
      label: 'Team Player',
      tooltip: "Mark 1 style whenever you take (or nope) a slam for someone else."
    },
    {
      id: 'pep-talk',
      label: 'Pep Talk',
      tooltip: "Once per run, refill 3 hype or clear a slam for a teammate. What do they need to hear the most right now?"
    },
    {
      id: 'middle-finger',
      label: 'Middle Finger',
      tooltip: "Once per run, automatically get a 6 on any action, no roll required. Add up to 2 kick, baby. Nothing can stand in your way."
    },
    {
      id: 'intuition',
      label: 'Intuition',
      tooltip: "You can always tell who likes/dislikes who, what someone really wants, and if someone's vibes are off."
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
    { id: 'special-something', label: "something from someone special" },
    { id: 'pamphlet', label: 'an important pamphlet' },
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
      { id: 'devotion', label: 'Devotion (2s)' },
      { id: 'origin', label: 'Origin Story (3s)' },
      { id: 'sharpened', label: 'Sharpened (4s)' }
    ],
    heartArc: [
      { id: 'dalliance', label: 'Dalliance (2s)' },
      { id: 'catching-feelings', label: 'Catching Feelings (1s)' },
      { id: 'us-or-them', label: 'Us or Them (4t)' },
      { id: 'love-conquers', label: 'Love Conquers All (3s)' }
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

  // Define Skipmode Runners mods
  const skipmodeMods = [
    {
      id: 'anti-negafriction',
      label: 'Anti-Negafriction Outsoles (1 Gem, 1 Disc)',
      tooltip: 'You can run up walls, hang from ceilings, etc. Complex or risky maneuvers may require a roll, as usual.'
    },
    {
      id: 'energy-tenser',
      label: 'Energy Tenser (1 Coil, 1 Disc)',
      tooltip: "With a running start, roll to teleport in-universe. If you can't see your destination, potential problems are worse."
    },
    {
      id: 'temporal-scrubber',
      label: 'Temporal Scrubber (1 Lens, 1 Gem)',
      tooltip: "Reveal you've been fast-forwarding through most of this snooze fest. Refill 1 hype. Mark 1 trouble and try not to think about all you've missed by not being present. Being constantly stoked is not the same as living."
    },
    {
      id: 'chrono-clip',
      label: 'Chrono Clip (1 Disc, 1 Gem)',
      tooltip: "Mark 1 turbo to avoid a physical slam by skipping a few seconds into the future. Others think you disappeared briefly."
    },
    {
      id: 'causality-hoop',
      label: 'Causality Hoop (2 Gems, 1 Lens, 1 Coil)',
      tooltip: "Mark 2 turbo to rewind time a few seconds and retry an action, warn someone of a slam, change tactics, etc. (Due to, uh, temporal rippling, game resources like boost, trouble, etc. still stay as they are, however.)"
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
      {/* Add rules sections here, using divs with className="rule-section" */}
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

      {/* More rule sections would go here */}
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
      <h1>HEART</h1>
      
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
            Describe how your heart helps your action, then boost or kick as needed. 
            Also, anytime you (or a teammate you're helping) succeed on any action, refill 1 attitude.
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
          <p>+1 after runs where you show passion or empathy</p>
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
            <ChecklistSection title="Heart Arc" items={beats.heartArc} sheetId={SHEET_ID} />
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
      
      {/* Skipmode Runners Section */}
      <div className="hardlight-section">
        <h1>Skipmode Runners</h1>
        <p>
          Skip boring. Skip average. Skip to the good part with Skipmode runners. 
          The commercial shows a kid fast-forwarding through his homework, but everyone 
          knew it was just clever marketing for a fairly average modular shoe. Until sluggers got ahold of them...
        </p>
        
        <div className="flex-row">
          <div className="section" style={{ flex: 1 }}>
            <h2>Function</h2>
            <p>
              Use your powered midsoles to run, jump, and slide super fast, 
              easily keeping up with hoverboards.
            </p>
          </div>
          
          <div className="section" style={{ flex: 1 }}>
            <h2>Look</h2>
            <textarea 
              placeholder="hi-tops, low-tops, mids, slip-ons, boots, flats, platforms, laserblades, hikers, something else" 
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
              {skipmodeMods.map((mod) => (
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

export default CyanneSheet;