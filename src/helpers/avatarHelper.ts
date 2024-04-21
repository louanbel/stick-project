import {createAvatar} from "@dicebear/core";
import {avataaars} from "@dicebear/collection";

export function generateAvatar(name: string) {

    return createAvatar(avataaars, {
        size: 128,
        seed: name
    }).toDataUriSync();
}

export function getRandomEnumValue(enumObj: any): any {
    const enumValues = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export function generateAvatarFromSettings(settings: AvatarSettingsProps) {
    return createAvatar(avataaars, {
        accessories: settings.accessories != undefined ? [settings.accessories] : undefined,
        accessoriesColor: settings.accessoriesColor != undefined ? [settings.accessoriesColor] : undefined,
        clothing: [settings.clothing],
        clothesColor: [settings.clothesColor],
        clothingGraphic: settings.clothingGraphic != undefined ? [settings.clothingGraphic] : undefined,
        eyebrows: [settings.eyebrows],
        eyes: [settings.eyes],
        facialHair: settings.facialHair != undefined ? [settings.facialHair] : undefined,
        facialHairColor: settings.facialHairColor != undefined ? [settings.facialHairColor] : undefined,
        hairColor: settings.hairColor != undefined ? [settings.hairColor] : undefined,
        hatColor: settings.hatColor != undefined ? [settings.hatColor] : undefined,
        mouth: [settings.mouth],
        skinColor: [settings.skinColor],
        top: settings.top != undefined ? [settings.top] : undefined,
        accessoriesProbability: 100,
        facialHairProbability: 100
    }).toDataUriSync();
}


export type AvatarSettingsProps = {
    accessories: Accessories | undefined;
    accessoriesColor: AccessoriesColor | undefined;
    clothing: Clothing;
    clothesColor: ClothesColor;
    clothingGraphic: ClothingGraphic | undefined;
    eyebrows: Eyebrows;
    eyes: Eyes;
    facialHair: FacialHair | undefined;
    facialHairColor: FacialHairColor | undefined;
    hairColor: HairColor;
    hatColor: HatColor | undefined;
    mouth: Mouth;
    skinColor: SkinColor;
    top: Top | undefined;
}
export class AvatarSettings {
    settings: AvatarSettingsProps;
    constructor(settings: AvatarSettingsProps) {
        this.settings = settings;
    }
}

export enum Accessories {
    Kurt = "kurt",
    Prescription01 = "prescription01",
    Prescription02 = "prescription02",
    Round = "round",
    Sunglasses = "sunglasses",
    Wayfarers = "wayfarers",
    Eyepatch = "eyepatch",
}

export enum AccessoriesColor {
    Color1 = "3c4f5c",
    Color2 = "65c9ff",
    Color3 = "262e33",
    Color4 = "5199e4",
    Color5 = "25557c",
    Color6 = "929598",
    Color7 = "a7ffc4",
    Color8 = "b1e2ff",
    Color9 = "e6e6e6",
    Color10 = "ff5c5c",
    Color11 = "ff488e",
    Color12 = "ffafb9",
    Color13 = "ffffb1",
    Color14 = "ffffff",
}

export enum ClothesColor {
    Color1 = "3c4f5c",
    Color2 = "65c9ff",
    Color3 = "262e33",
    Color4 = "5199e4",
    Color5 = "25557c",
    Color6 = "929598",
    Color7 = "a7ffc4",
    Color8 = "b1e2ff",
    Color9 = "e6e6e6",
    Color10 = "ff5c5c",
    Color11 = "ff488e",
    Color12 = "ffafb9",
    Color13 = "ffffb1",
    Color14 = "ffffff",
}

export enum Clothing {
    BlazerAndShirt = "blazerAndShirt",
    BlazerAndSweater = "blazerAndSweater",
    CollarAndSweater = "collarAndSweater",
    GraphicShirt = "graphicShirt",
    Hoodie = "hoodie",
    Overall = "overall",
    ShirtCrewNeck = "shirtCrewNeck",
    ShirtScoopNeck = "shirtScoopNeck",
    ShirtVNeck = "shirtVNeck",
}

export enum ClothingGraphic {
    Bat = "bat",
    Bear = "bear",
    Cumbia = "cumbia",
    Deer = "deer",
    Diamond = "diamond",
    Hola = "hola",
    Pizza = "pizza",
    Resist = "resist",
    Skull = "skull",
    SkullOutline = "skullOutline",
}

export enum Eyebrows {
    Default = "default",
    Angry = "angry",
    AngryNatural = "angryNatural",
    DefaultNatural = "defaultNatural",
    FlatNatural = "flatNatural",
    RaisedExcited = "raisedExcited",
    RaisedExcitedNatural = "raisedExcitedNatural",
    SadConcerned = "sadConcerned",
    SadConcernedNatural = "sadConcernedNatural",
    UnibrowNatural = "unibrowNatural",
    UpDown = "upDown",
    UpDownNatural = "upDownNatural",
    FrownNatural = "frownNatural",
}

export enum Eyes {
    Default = "default",
    Close = "closed",
    Cry = "cry",
    EyeRoll = "eyeRoll",
    Happy = "happy",
    Hearts = "hearts",
    Side = "side",
    Squint = "squint",
    Surprised = "surprised",
    Wink = "wink",
    WinkWacky = "winkWacky",
}

export enum FacialHair {
    BeardLight = "beardLight",
    BeardMedium = "beardMedium",
    BeardMajestic = "beardMajestic",
    MoustacheFancy = "moustacheFancy",
    MoustacheMagnum = "moustacheMagnum",
}

export enum FacialHairColor {
    Color1 = "2c1b18",
    Color2 = "4a312c",
    Color3 = "724133",
    Color4 = "a55728",
    Color5 = "b58143",
    Color6 = "c93305",
    Color7 = "d6b370",
    Color8 = "e8e1e1",
    Color9 = "ecdcbf",
    Color10 = "f59797",
}

export enum HairColor {
    Color1 = "2c1b18",
    Color2 = "4a312c",
    Color3 = "724133",
    Color4 = "a55728",
    Color5 = "b58143",
    Color6 = "c93305",
    Color7 = "d6b370",
    Color8 = "e8e1e1",
    Color9 = "ecdcbf",
    Color10 = "f59797",
}

export enum SkinColor {
    Color1 = "614335",
    Color2 = "ae5d29",
    Color3 = "d08b5b",
    Color4 = "edb98a",
    Color5 = "f8d25c",
    Color6 = "fd9841",
    Color7 = "ffdbb4",
}

export enum Mouth {
    Concerned = "concerned",
    Disbelief = "disbelief",
    Eating = "eating",
    Grimace = "grimace",
    Sad = "sad",
    ScreamOpen = "screamOpen",
    Serious = "serious",
    Smile = "smile",
    Tongue = "tongue",
    Twinkle = "twinkle",
    Vomit = "vomit",
}

export enum HatColor {
    Color1 = "3c4f5c",
    Color2 = "65c9ff",
    Color3 = "262e33",
    Color4 = "5199e4",
    Color5 = "25557c",
    Color6 = "929598",
    Color7 = "a7ffc4",
    Color8 = "b1e2ff",
    Color9 = "e6e6e6",
    Color10 = "ff5c5c",
    Color11 = "ff488e",
    Color12 = "ffafb9",
    Color13 = "ffffb1",
    Color14 = "ffffff",
}

export enum Top {
    BigHair = "bigHair",
    Bob = "bob",
    Bun = "bun",
    Curly = "curly",
    Curvy = "curvy",
    Dreads = "dreads",
    Dreads01 = "dreads01",
    Dreads02 = "dreads02",
    Frida = "frida",
    Frizzle = "frizzle",
    Fro = "fro",
    FroBand = "froBand",
    Hat = "hat",
    Hijab = "hijab",
    LongButNotTooLong = "longButNotTooLong",
    MiaWallace = "miaWallace",
    Shaggy = "shaggy",
    ShaggyMullet = "shaggyMullet",
    ShavedSides = "shavedSides",
    ShortCurly = "shortCurly",
    ShortFlat = "shortFlat",
    ShortRound = "shortRound",
    ShortWaved = "shortWaved",
    Sides = "sides",
    Straight01 = "straight01",
    Straight02 = "straight02",
    StraightAndStrand = "straightAndStrand",
    TheCaesar = "theCaesar",
    TheCaesarAndSidePart = "theCaesarAndSidePart",
    Turban = "turban",
    WinterHat1 = "winterHat1",
    WinterHat02 = "winterHat02",
    WinterHat03 = "winterHat03",
    WinterHat04 = "winterHat04",
}

export const Hat: Top[] = [
    Top.WinterHat1,
    Top.WinterHat02,
    Top.WinterHat03,
    Top.WinterHat04,
    Top.Turban,
    Top.Hijab,
    Top.Hat
]


export const defaultAvatarSettings: AvatarSettingsProps = {
    accessories: Accessories.Kurt,
    accessoriesColor: AccessoriesColor.Color1,
    clothing: Clothing.BlazerAndShirt,
    clothesColor: ClothesColor.Color1,
    clothingGraphic: ClothingGraphic.Bat,
    eyebrows: Eyebrows.Default,
    eyes: Eyes.Happy,
    facialHair: undefined,
    facialHairColor: FacialHairColor.Color1,
    hairColor: HairColor.Color2,
    hatColor: HatColor.Color5,
    mouth: Mouth.Smile,
    skinColor: SkinColor.Color7,
    top: Top.ShortCurly,
}
