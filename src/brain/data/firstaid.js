/**
 * First aid, for the moment the signal is gone.
 *
 * This is the one place where an offline app has an advantage worth having: a
 * phone with no load and no bars still opens this. What is here is the
 * standard, widely taught basics — nothing clever, nothing that needs a
 * judgement call a bystander cannot make.
 *
 * Every entry leads with getting real help, because that is the actual first
 * step and because these notes are not training. The app's own disclaimer says
 * not to rely on it for medical decisions and that stands; the point of this
 * file is the ninety seconds before someone who *is* trained arrives.
 */

const CALL = '**Call 911 first**, or have someone else call while you start. '

export const FIRST_AID = [
  {
    id: 'aid-choking',
    q: ['choking', 'what to do when someone is choking', 'heimlich', 'nabulunan', 'first aid for choking'],
    title: 'Choking',
    body:
      'If they can cough, speak or breathe — **let them cough**. Do not hit them on the ' +
      'back; coughing is stronger than anything you can do.\n\n' +
      'If they cannot make a sound, cannot breathe, or are clutching their throat:\n\n' +
      '1. ' + CALL + 'Stand behind them.\n' +
      '2. Give **5 firm back blows** between the shoulder blades with the heel of your hand.\n' +
      '3. Then **5 abdominal thrusts**: fist just above the navel, other hand over it, ' +
      'pull sharply inward and upward.\n' +
      '4. Alternate 5 and 5 until the object comes out or they go limp.\n' +
      '5. If they lose consciousness, lower them down and start CPR.\n\n' +
      '**A baby under one year:** no abdominal thrusts. Face down along your forearm, ' +
      '5 back blows; turn face up, 5 chest thrusts with two fingers. Repeat.',
  },
  {
    id: 'aid-cpr',
    q: ['cpr', 'how to do cpr', 'someone is not breathing', 'cardiac arrest', 'chest compressions'],
    title: 'CPR — someone is not breathing',
    body:
      'Check: no response when you shout and shake, and no normal breathing. Gasping is ' +
      '**not** breathing.\n\n' +
      '1. ' + CALL + 'Ask for an AED if there is one nearby.\n' +
      '2. Lay them flat on their back on a firm surface.\n' +
      '3. Heel of one hand on the centre of the chest, other hand on top, fingers laced.\n' +
      '4. **Push hard and fast** — about 5 cm deep, 100–120 pushes a minute. Let the ' +
      'chest come all the way back up between pushes.\n' +
      '5. Do not stop until they move, help takes over, or you physically cannot continue.\n\n' +
      'If you are untrained or unwilling to give rescue breaths, **compressions alone are ' +
      'worth doing** and are far better than nothing. The rhythm of *Stayin\' Alive* is ' +
      'the right speed.',
  },
  {
    id: 'aid-bleeding',
    q: ['bleeding', 'how to stop bleeding', 'deep cut', 'wound first aid', 'nagdurugo'],
    title: 'Serious bleeding',
    body:
      '1. ' + CALL + '\n' +
      '2. **Press hard** directly on the wound with a clean cloth, and keep pressing. ' +
      'Do not lift it to look.\n' +
      '3. If blood soaks through, add another cloth **on top** — never remove the first.\n' +
      '4. Raise the limb above the heart if nothing is broken.\n' +
      '5. Keep them warm and lying down.\n\n' +
      'Do not put a tourniquet on unless the bleeding is life-threatening and pressure ' +
      'has failed; if you do, note the time.\n\n' +
      '**Do not** pull out anything embedded in the wound — pad around it and leave it in.',
  },
  {
    id: 'aid-burns',
    q: ['burns', 'first aid for burns', 'napaso', 'scald', 'what to do for a burn'],
    title: 'Burns and scalds',
    body:
      '1. Get away from the heat. Remove clothing and jewellery near the burn **unless it ' +
      'is stuck to the skin**.\n' +
      '2. **Cool under running water for 20 minutes.** Cool water, not ice, not iced water.\n' +
      '3. Cover loosely with cling film or a clean, non-fluffy cloth.\n' +
      '4. Do not put on toothpaste, butter, oil, soy sauce or ice. All of them make it worse.\n' +
      '5. Do not break blisters.\n\n' +
      'Go to hospital if the burn is bigger than the person\'s palm, is on the face, hands, ' +
      'feet or genitals, goes all the way through the skin, or is from chemicals or ' +
      'electricity.',
  },
  {
    id: 'aid-fainting',
    q: ['fainting', 'someone fainted', 'hinimatay', 'unconscious but breathing', 'recovery position'],
    title: 'Fainting, and someone unconscious but breathing',
    body:
      '**Feeling faint:** sit or lie them down, raise the legs, loosen tight clothing, ' +
      'give air.\n\n' +
      '**Already unconscious but breathing normally** — put them in the recovery position:\n\n' +
      '1. Kneel beside them. Far arm across the chest, near arm out at a right angle.\n' +
      '2. Bend the far knee up, foot flat.\n' +
      '3. Roll them towards you by that knee. Tilt the head back so the airway stays open.\n' +
      '4. ' + CALL + 'Stay and keep checking that they are still breathing.\n\n' +
      'If they do not come round within a minute, or are hurt, or you are unsure — treat ' +
      'it as an emergency.',
  },
  {
    id: 'aid-fracture',
    q: ['broken bone', 'fracture first aid', 'sprain', 'napilay', 'nabalian'],
    title: 'Broken bones and sprains',
    body:
      '**Do not try to straighten it** and do not let them walk on it.\n\n' +
      '1. Support the limb in the position you found it, with padding on both sides.\n' +
      '2. Put a cold pack — ice wrapped in cloth, never on bare skin — on it for 20 minutes.\n' +
      '3. Do not give food or drink, in case surgery is needed.\n' +
      '4. Get them to hospital. Call 911 if the bone is through the skin, the limb looks ' +
      'deformed, or it is the neck, back, hip or thigh — in which case **do not move them ' +
      'at all** unless they are in danger where they lie.\n\n' +
      'For a sprain, **RICE**: Rest, Ice, Compression, Elevation.',
  },
  {
    id: 'aid-heat',
    q: ['heat stroke', 'heat exhaustion', 'dehydration', 'sunstroke', 'too much heat'],
    title: 'Heat exhaustion and heat stroke',
    body:
      '**Heat exhaustion** — heavy sweating, cold clammy skin, dizziness, cramps, nausea:\n' +
      'move to shade, lie down, raise the legs, loosen clothing, sip water slowly. They ' +
      'should be better within 30 minutes.\n\n' +
      '**Heat stroke is an emergency.** Skin hot and often *dry*, temperature very high, ' +
      'confusion or unconsciousness, no sweating:\n\n' +
      '1. ' + CALL + '\n' +
      '2. Move them to shade and cool them **fast** — wet cloths, fanning, cold water on ' +
      'the skin, ice packs at the neck, armpits and groin.\n' +
      '3. Do not give anything to drink if they are confused or not fully awake.\n\n' +
      'Do not wait to see if it passes. Heat stroke kills quickly.',
  },
]
