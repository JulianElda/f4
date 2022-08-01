export type JobActionType = {
  id: string;
  name: string;
  element: ActionElements;
  potency: number;
  cast: number;
};

export enum ActionElements {
  FIRE = "FIRE",
  ICE = "ICE",
  UNASPECTED = "UNASPECTED",
}

export enum ElementalStates {
  AF1 = "AF1",
  AF2 = "AF2",
  AF3 = "AF3",
  UI1 = "UI1",
  UI2 = "UI2",
  UI3 = "UI3",
  NONE = "NONE",
}

export const MULTIPLIER_POTENCY = {
  [ActionElements.FIRE]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 1.4,
    [ElementalStates.AF2]: 1.6,
    [ElementalStates.AF3]: 1.8,
    [ElementalStates.UI1]: 0.9,
    [ElementalStates.UI2]: 0.8,
    [ElementalStates.UI3]: 0.7,
  },
  [ActionElements.ICE]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 0.9,
    [ElementalStates.AF2]: 0.8,
    [ElementalStates.AF3]: 0.7,
    [ElementalStates.UI1]: 1,
    [ElementalStates.UI2]: 1,
    [ElementalStates.UI3]: 1,
  },
  [ActionElements.UNASPECTED]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 1,
    [ElementalStates.AF2]: 1,
    [ElementalStates.AF3]: 1,
    [ElementalStates.UI1]: 1,
    [ElementalStates.UI2]: 1,
    [ElementalStates.UI3]: 1,
  },
};

export const MULTIPLIER_CAST = {
  [ActionElements.FIRE]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 1,
    [ElementalStates.AF2]: 1,
    [ElementalStates.AF3]: 1,
    [ElementalStates.UI1]: 1,
    [ElementalStates.UI2]: 1,
    [ElementalStates.UI3]: 0.5,
  },
  [ActionElements.ICE]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 1,
    [ElementalStates.AF2]: 1,
    [ElementalStates.AF3]: 0.5,
    [ElementalStates.UI1]: 1,
    [ElementalStates.UI2]: 1,
    [ElementalStates.UI3]: 1,
  },
  [ActionElements.UNASPECTED]: {
    [ElementalStates.NONE]: 1,
    [ElementalStates.AF1]: 1,
    [ElementalStates.AF2]: 1,
    [ElementalStates.AF3]: 1,
    [ElementalStates.UI1]: 1,
    [ElementalStates.UI2]: 1,
    [ElementalStates.UI3]: 1,
  },
};

export const F1: JobActionType = {
  id: "F1",
  name: "Fire I",
  element: ActionElements.FIRE,
  potency: 260,
  cast: 3500,
};

export const F3: JobActionType = {
  id: "F3",
  name: "Fire III",
  element: ActionElements.FIRE,
  potency: 260,
  cast: 3500,
};

export const F4: JobActionType = {
  id: "F4",
  name: "Fire IV",
  element: ActionElements.FIRE,
  potency: 310,
  cast: 2800,
};

export const D: JobActionType = {
  id: "Desp",
  name: "Despair",
  element: ActionElements.FIRE,
  potency: 340,
  cast: 3000,
};

export const B3: JobActionType = {
  id: "B3",
  name: "Blizzard III",
  element: ActionElements.ICE,
  potency: 260,
  cast: 3500,
};

export const B4: JobActionType = {
  id: "B4",
  name: "Blizzard IV",
  element: ActionElements.ICE,
  potency: 310,
  cast: 2500,
};

export const PD: JobActionType = {
  id: "PD",
  name: "Paradox",
  element: ActionElements.UNASPECTED,
  potency: 500,
  cast: 2500,
};

export const CASTER_TAX: number = 100;
export const OGCD_CLIP: number = 700;
