import React, { useState } from 'react';
import './ChillSheet.css';

const ChillSheet = () => {
  const [characterData, setCharacterData] = useState({
    name: '',
    look: '',
    family: '',
    bond: '',
    vibes: '',
    stickers: '',
    yourBoard: '',
    yourRaygun: '',
    extraLine1: '',
    extraLine2: '',
    quirkDescription: '',
    legacy: Array(7).fill(''),
    doom: Array(4).fill(''),
    slams: ['', '']
  });

  const [traits, setTraits] = useState({
    quirk: false,
    steezey: false,
    ummGuys: false,
    buttonMasher: false,
    lucky: false,
    personalGrowth: false
  });

  const [gear, setGear] = useState({
    phone: false,
    foundItem: false,
    pet: false,
    grapplingHook: false,
    repairTools: false,
    spacetimeAmp: false,
    multiversalMaps: false,
    smallDrone: false,
    hackingTools: false,
    proCameraGear: false
  });

  const [troubleCounters, setTroubleCounters] = useState(Array(8).fill(false));
  const [styleCounters, setStyleCounters] = useState(Array(7).fill(false));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle array fields
    if (name.startsWith('legacy')) {
      const index = parseInt(name.split('-')[1]) - 1;
      const newLegacy = [...characterData.legacy];
      newLegacy[index] = value;
      setCharacterData({...characterData, legacy: newLegacy});
    } else if (name.startsWith('doom')) {
      const index = parseInt(name.split('-')[1]) - 1;
      const newDoom = [...characterData.doom];
      newDoom[index] = value;
      setCharacterData({...characterData, doom: newDoom});
    } else if (name.startsWith('slams')) {
      const index = parseInt(name.split('-')[1]) - 1;
      const newSlams = [...characterData.slams];
      newSlams[index] = value;
      setCharacterData({...characterData, slams: newSlams});
    } else {
      // Handle regular fields
      setCharacterData({...characterData, [name]: value});
    }
  };

  const handleTraitChange = (e) => {
    const { id, checked } = e.target;
    setTraits({...traits, [id]: checked});
  };

  const handleGearChange = (item) => {
    setGear({...gear, [item]: !gear[item]});
  };

  const toggleTroubleCounter = (index) => {
    const newCounters = [...troubleCounters];
    newCounters[index] = !newCounters[index];
    setTroubleCounters(newCounters);
  };

  const toggleStyleCounter = (index) => {
    const newCounters = [...styleCounters];
    newCounters[index] = !newCounters[index];
    setStyleCounters(newCounters);
  };

  return (
    <div className="character-sheet">
      <div className="big-title">CHILL</div>
      
      <div className="grid">
        {/* Column 1 */}
        <div>
          <div className="section">
            <div className="section-title">NAME</div>
            <input 
              type="text" 
              name="name" 
              value={characterData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">LOOK</div>
            <input 
              type="text" 
              name="look" 
              value={characterData.look}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">FAMILY</div>
            <input 
              type="text" 
              name="family" 
              value={characterData.family}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">BOND</div>
            <input 
              type="text" 
              name="bond" 
              value={characterData.bond}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">VIBES</div>
            <input 
              type="text" 
              name="vibes" 
              value={characterData.vibes}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">STICKERS, ETC.</div>
            <input 
              type="text" 
              name="stickers" 
              value={characterData.stickers}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">GEAR</div>
            
            <div className="gear-subsection">
              <div className="section-title section-subtitle">YOUR BOARD</div>
              <input 
                type="text" 
                name="yourBoard" 
                value={characterData.yourBoard}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="gear-subsection">
              <div className="section-title section-subtitle">YOUR RAYGUN</div>
              <input 
                type="text" 
                name="yourRaygun" 
                value={characterData.yourRaygun}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="gear-grid">
              <div className="gear-column">
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.phone} 
                    onChange={() => handleGearChange('phone')} 
                  />
                  your phone
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.foundItem} 
                    onChange={() => handleGearChange('foundItem')} 
                  />
                  something you found on your way here
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.pet} 
                    onChange={() => handleGearChange('pet')} 
                  />
                  a pet
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.grapplingHook} 
                    onChange={() => handleGearChange('grapplingHook')} 
                  />
                  grappling hook
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.repairTools} 
                    onChange={() => handleGearChange('repairTools')} 
                  />
                  repair tools
                </div>
              </div>
              <div className="gear-column">
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.spacetimeAmp} 
                    onChange={() => handleGearChange('spacetimeAmp')} 
                  />
                  spacetime amp.
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.multiversalMaps} 
                    onChange={() => handleGearChange('multiversalMaps')} 
                  />
                  multiversal maps
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.smallDrone} 
                    onChange={() => handleGearChange('smallDrone')} 
                  />
                  a small drone
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.hackingTools} 
                    onChange={() => handleGearChange('hackingTools')} 
                  />
                  hacking tools
                </div>
                <div className="gear-item">
                  <input 
                    type="checkbox" 
                    checked={gear.proCameraGear} 
                    onChange={() => handleGearChange('proCameraGear')} 
                  />
                  pro camera gear
                </div>
              </div>
            </div>
          </div>
          
          <div className="section extra-line">
            <input 
              type="text" 
              name="extraLine1" 
              value={characterData.extraLine1}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section extra-line">
            <input 
              type="text" 
              name="extraLine2" 
              value={characterData.extraLine2}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="section">
            <div className="section-title">TROUBLE</div>
            <div className="counter-box">
              {troubleCounters.slice(0, 4).map((filled, index) => (
                <div 
                  key={`trouble-${index}`}
                  className={`counter-item ${filled ? 'filled' : ''}`}
                  onClick={() => toggleTroubleCounter(index)}
                ></div>
              ))}
            </div>
            <div className="counter-box">
              {troubleCounters.slice(4, 8).map((filled, index) => (
                <div 
                  key={`trouble-${index + 4}`}
                  className={`counter-item ${filled ? 'filled' : ''}`}
                  onClick={() => toggleTroubleCounter(index + 4)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Column 2 */}
        <div>
          <div className="section">
            <div className="section-title">ATTITUDE</div>
            <div className="attitude-box">
              <p>Sit back, relax, and get +1d6 to all your actions. Things just tend to work out. (This puppy can't be shared with teammates. They're too busy to enjoy it, anyways.)</p>
              <div className="infinity-symbol">∞</div>
            </div>
          </div>
          
          <div className="section">
            <div className="section-title">TRAITS</div>
            <ul className="checkbox-list">
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="quirk"
                  checked={traits.quirk}
                  onChange={handleTraitChange}
                />
                <label htmlFor="quirk" className="trait-name">Quirk.</label>
                <div className="trait-description">
                  For some weird reason, you are good at...
                  <input 
                    type="text" 
                    name="quirkDescription" 
                    value={characterData.quirkDescription}
                    onChange={handleInputChange}
                    className="trait-input"
                  />
                </div>
                <div className="trait-description">If this would help you with an action, you can mark 1 trouble to upgrade a 1-3 result into a 4/5 result.</div>
              </li>
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="steezey"
                  checked={traits.steezey}
                  onChange={handleTraitChange}
                />
                <label htmlFor="steezey" className="trait-name">Steezey.</label>
                <div className="trait-description">Mark 1 style anytime you roll doubles. You look cool without even knowing it.</div>
              </li>
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="ummGuys"
                  checked={traits.ummGuys}
                  onChange={handleTraitChange}
                />
                <label htmlFor="ummGuys" className="trait-name">Umm… Guys?</label>
                <div className="trait-description">You accidentally notice the stuff everyone else didn't, like hidden panels, perfect skate spots, looming monsters, etc.</div>
              </li>
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="buttonMasher"
                  checked={traits.buttonMasher}
                  onChange={handleTraitChange}
                />
                <label htmlFor="buttonMasher" className="trait-name">Button Masher.</label>
                <div className="trait-description">Mark 1 turbo to use a locked mod for the length of one action—or 2 turbo if the mod is from another device. Potential problems are worse.</div>
              </li>
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="lucky"
                  checked={traits.lucky}
                  onChange={handleTraitChange}
                />
                <label htmlFor="lucky" className="trait-name">Lucky.</label>
                <div className="trait-description">Once per run, dumb luck helps you. A tree falls on a monster, lasers miss as you tie your shoes, you unknowingly give someone a perfect gift, etc.</div>
              </li>
              <li className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="personalGrowth"
                  checked={traits.personalGrowth}
                  onChange={handleTraitChange}
                />
                <label htmlFor="personalGrowth" className="trait-name">Personal Growth.</label>
                <div className="trait-description">A trait from another personality. How are you changing? Who are you learning from?</div>
              </li>
            </ul>
          </div>
          
          <div className="section">
            <div className="section-title">STYLE</div>
            <div className="counter-box">
              {styleCounters.map((filled, index) => (
                <div 
                  key={`style-${index}`}
                  className={`counter-item ${filled ? 'filled' : ''}`}
                  onClick={() => toggleStyleCounter(index)}
                ></div>
              ))}
            </div>
            <div className="style-note">+1 after runs where you show ease or flow.</div>
          </div>
        </div>
        <div className="right-half">
        <div className="three-and-four">
        {/* Column 3 */}
        <div>
          <div className="section">
            <div className="section-title">LEGACY</div>
            {characterData.legacy.map((value, index) => (
              <div key={`legacy-field-${index}`} className="field-row">
                <input 
                  type="text" 
                  name={`legacy-${index + 1}`} 
                  value={value}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          
          <div className="section doom-section">
            <div className="section-title">DOOM</div>
            {characterData.doom.map((value, index) => (
              <div key={`doom-field-${index}`} className="field-row">
                <input 
                  type="text" 
                  name={`doom-${index + 1}`} 
                  value={value}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Column 4 (BEATS) */}
        <div>
          <div className="section">
            <div className="section-title">BEATS</div>
            
            <div className="beats-category">
              <div className="beats-title">Trait Beats—</div>
              <div className="beats-items">
                <div>Just Vibin' (2s)</div>
                <div>Origin Story (3s)</div>
                <div>Sharpened (4s)</div>
              </div>
            </div>
            
            <div className="beats-category">
              <div className="beats-title">Chill Arc—</div>
              <div className="beats-items">
                <div>Caught in a Plot (2s)</div>
                <div>Serendipity (1s)</div>
                <div>In Too Deep (4t)</div>
                <div>Somehow Works Out (3s)</div>
              </div>
            </div>
            
            <div className="beats-category">
              <div className="beats-title">Family Arc—</div>
              <div className="beats-items">
                <div>Trouble at Home (2t)</div>
                <div>Final Warning (3s)</div>
                <div>Last Straw (4t)</div>
                <div>Redemption (4s)</div>
              </div>
            </div>
            
            <div className="beats-category">
              <div className="beats-title">Angst Arc—</div>
              <div className="beats-items">
                <div>Angst (2t)</div>
                <div>Struggling (3t)</div>
                <div>Darkness (4t)</div>
                <div>Catharsis (4s)</div>
              </div>
            </div>
            
            <div className="beats-category">
              <div className="beats-title">Crew Beats—</div>
              <div className="beats-items">
                <div>• Opportunity (2s)</div>
                <div>• Challenge (5t)</div>
                <div>• Fight (5t)</div>
                <div>• Make Up (5s)</div>
              </div>
            </div>
            
            <div className="beats-category">
              <div className="beats-title">Other Beats—</div>
              <div className="beats-items">
                <div>• Being good (1s)</div>
                <div>• You Earned It (5s)</div>
                <div>• Take an L (5t)</div>
                <div>• In the Lab (1s)</div>
                <div>• Portal Discovery (2s)</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        {/* SLAMS Section (spans columns 3-4) */}
                <div className="slams-section">
          <div className="section-title">SLAMS</div>
          <div className="slams-textarea">
            <textarea 
              name="slams-1" 
              value={characterData.slams[0]}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="slams-textarea">
            <textarea 
              name="slams-2" 
              value={characterData.slams[1]}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        </div>
        

      </div>
    </div>
  );
};

export default ChillSheet;