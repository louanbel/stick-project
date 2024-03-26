import '../../styles/modals/BModal.scss';
import '../../styles/modals/AddParticipantModal.scss';
import {Participant} from "../../types/Participant";
import {SyntheticEvent, useState} from "react";
import BModal from "./BModal";
import {Box, Tab, Tabs, tabsClasses} from "@mui/material";
import {
    Accessories,
    AccessoriesColor,
    AvatarSettings,
    AvatarSettingsProps,
    ClothesColor,
    Clothing,
    ClothingGraphic,
    defaultAvatarSettings,
    Eyebrows,
    Eyes,
    FacialHair,
    FacialHairColor,
    generateAvatarFromSettings,
    HairColor,
    Hat,
    HatColor,
    Mouth,
    SkinColor,
    Top
} from "../../helpers/avatarHelper.ts";
import {addParticipant} from "../../helpers/boardHelper.ts";
import BButtonDropdown from "../BButtonDropdown.tsx";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            className={"tabPanel"}
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

type BModalProps = {
    className: string;
    handleCancelAction: () => void;
    handleAddParticipant: (participant: Participant) => void;
    boardId?: number;
}


export default function AddParticipantModal({
                                                className,
                                                handleCancelAction,
                                                handleAddParticipant,
                                                boardId
                                            }: BModalProps) {
    const [nameInput, setNameInput] = useState("");
    const [isError, setIsError] = useState(false);
    const [value, setValue] = useState(0);
    const [avatar, setAvatar] = useState(new AvatarSettings(defaultAvatarSettings));
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function handleAddAction(): void {
        setIsLoading(true);

        if (nameInput.length == 0) {
            setIsError(true);
            return;
        }

        const newParticipant: Participant = new Participant(nameInput, 1, avatar, -1);
        addParticipant(newParticipant, boardId).then((id) => {
                newParticipant.id = id;
                handleAddParticipant(newParticipant);
                setIsLoading(false);
            }
        );

    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleAddAction();
        }
    }

    function handleOnInputChange(value: string) {
        setNameInput(value);
        if (value.length > 0) {
            setIsError(false);
        }
    }

    function updateAvatarSettings(settings: Partial<AvatarSettingsProps>) {
        setAvatar((prevAvatar) => ({
            ...prevAvatar,
            settings: {
                ...prevAvatar.settings,
                ...settings
            }
        }));
    }


    return (
        <div className={className}>
            <BModal modalType={"medium"} handleFirstAction={handleAddAction} handleSecondAction={handleCancelAction}
                    isLoading={isLoading}
                    title={"Add a participant"}
                    firstActionLabel={"Add"}>
                <div className={"test"}>
                    <div className="previewAvatarSection">
                        <img className="previewAvatar" src={generateAvatarFromSettings(avatar.settings)}
                             alt={`Avatar of ${nameInput}`} width={150}/>
                        <div className="section participantNameSection">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text"
                                   className="formInput"
                                   id="nameInput"
                                   placeholder="Enter participant's name"
                                   onChange={(e) => handleOnInputChange(e.target.value)}
                                   onKeyDown={handleKeyPress}
                            />
                            {isError && <span className="inputError">Name cannot be empty !</span>}
                        </div>
                    </div>
                    <div className={"avatarStyle"}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            visibleScrollbar={true}
                            allowScrollButtonsMobile={true}
                            sx={{
                                [`& .${tabsClasses.scrollButtons}`]: {
                                    '&.Mui-disabled': {opacity: 0.3},
                                },
                            }}
                        >
                            <Tab label="Accessories" sx={{mx: 0.5}}/>
                            <Tab disabled={avatar.settings.accessories == undefined}
                                 label="Accessories color" sx={{mx: 0.5}}/>
                            <Tab label="Clothing" sx={{mx: 0.5}}/>
                            <Tab label="Clothes color" sx={{mx: 0.5}}/>
                            <Tab disabled={avatar.settings.clothing != Clothing.GraphicShirt}
                                 label="Clothing graphic" sx={{mx: 0.5}}/>
                            <Tab label="Eyebrows" sx={{mx: 0.5}}/>
                            <Tab label="Eyes" sx={{mx: 0.5}}/>
                            <Tab label="Mouth" sx={{mx: 0.5}}/>
                            <Tab label="Skin color" sx={{mx: 0.5}}/>
                            <Tab label="Top" sx={{mx: 0.5}}/>
                            <Tab disabled={avatar.settings.top && !Hat.includes(avatar.settings.top)}
                                 label="Hat color" sx={{mx: 0.5}}/>
                            <Tab disabled={avatar.settings.top == undefined}
                                 label="Hair color" sx={{mx: 0.5}}/>
                            <Tab label="Facial hair" sx={{mx: 0.5}}/>
                            <Tab disabled={avatar.settings.facialHair == undefined}
                                 label="Facial hair color" sx={{mx: 0.5}}/>
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <h3 className={"tabPanelTitle"}>Accessories</h3>
                            <ul className={"itemList"}>
                                {Object.values(Accessories).map((accessories) => (
                                    <li className={avatar.settings.accessories == accessories ? "selected" : ""}
                                        key={accessories} onClick={() => {
                                        updateAvatarSettings({
                                            accessories: accessories,
                                            accessoriesColor: avatar.settings.accessoriesColor
                                        });
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            accessories: accessories,
                                            accessoriesColor: avatar.settings.accessoriesColor
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                                <li className={avatar.settings.accessories == undefined ? "selected" : ""}
                                    key="noAccessory" onClick={() => {
                                    updateAvatarSettings({accessories: undefined});
                                }}><img
                                    src={generateAvatarFromSettings({
                                        ...avatar.settings,
                                        accessories: undefined
                                    })}
                                    alt={`Avatar of ${nameInput}`}
                                    width={100}/>
                                </li>
                            </ul>

                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <h3>Accessories color</h3>
                            <ul className={"itemList"}>
                                {Object.values(AccessoriesColor).map((accessoriesColor) => (
                                    <li className={avatar.settings.accessoriesColor == accessoriesColor ? "selected" : ""}
                                        key={accessoriesColor} onClick={() => {
                                        updateAvatarSettings({accessoriesColor: accessoriesColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            accessoriesColor: accessoriesColor
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <h3>Clothing</h3>
                            <ul className={"itemList"}>
                                {Object.values(Clothing).map((clothing) => (
                                    <li className={avatar.settings.clothing == clothing ? "selected" : ""}
                                        key={clothing} onClick={() => {
                                        updateAvatarSettings({clothing: clothing});
                                    }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, clothing: clothing})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <h3>Clothes color</h3>
                            <ul className={"itemList"}>
                                {Object.values(ClothesColor).map((clothesColor) => (
                                    <li className={avatar.settings.clothesColor == clothesColor ? "selected" : ""}
                                        key={clothesColor} onClick={() => {
                                        updateAvatarSettings({clothesColor: clothesColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            clothesColor: clothesColor
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <h3>Clothing Graphic</h3>
                            <ul className={"itemList"}>
                                {Object.values(ClothingGraphic).map((clothingGraphic) => (
                                    <li className={avatar.settings.clothingGraphic == clothingGraphic ? "selected" : ""}
                                        key={clothingGraphic} onClick={() => {
                                        updateAvatarSettings({clothingGraphic: clothingGraphic});
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            clothingGraphic: clothingGraphic
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <h3>Eyebrows</h3>
                            <ul className={"itemList"}>
                                {Object.values(Eyebrows).map((eyebrows) => (
                                    <li className={avatar.settings.eyebrows == eyebrows ? "selected" : ""}
                                        key={eyebrows} onClick={() => {
                                        updateAvatarSettings({eyebrows: eyebrows});
                                    }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, eyebrows: eyebrows})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>

                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <h3>Eyes</h3>
                            <ul className={"itemList"}>
                                {Object.values(Eyes).map((eyes) => (
                                    <li className={avatar.settings.eyes == eyes ? "selected" : ""} key={eyes}
                                        onClick={() => {
                                            updateAvatarSettings({eyes: eyes});
                                        }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, eyes: eyes})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            <h3>Mouth</h3>
                            <ul className={"itemList"}>
                                {Object.values(Mouth).map((mouth) => (
                                    <li className={avatar.settings.mouth == mouth ? "selected" : ""} key={mouth}
                                        onClick={() => {
                                            updateAvatarSettings({mouth: mouth});
                                        }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, mouth: mouth})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={8}>
                            <h3>Skin color</h3>
                            <ul className={"itemList"}>
                                {Object.values(SkinColor).map((skinColor) => (
                                    <li className={avatar.settings.skinColor == skinColor ? "selected" : ""}
                                        key={skinColor} onClick={() => {
                                        updateAvatarSettings({skinColor: skinColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, skinColor: skinColor})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={9}>
                            <h3>Top</h3>
                            <ul className={"itemList"}>
                                {Object.values(Top).map((top) => (
                                    <li className={avatar.settings.top == top ? "selected" : ""} key={top}
                                        onClick={() => {
                                            updateAvatarSettings({
                                                top: top,
                                            });
                                        }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            top: top,
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                                <li className={avatar.settings.top == undefined ? "selected" : ""} key={"noHair"}
                                    onClick={() => {
                                        updateAvatarSettings({top: undefined});
                                    }}><img
                                    src={generateAvatarFromSettings({...avatar.settings, top: undefined})}
                                    alt={`Avatar of ${nameInput}`}
                                    width={100}/>
                                </li>
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={10}>
                            <h3>Hat color</h3>
                            <ul className={"itemList"}>
                                {Object.values(HatColor).map((hatColor) => (
                                    <li className={avatar.settings.hatColor == hatColor ? "selected" : ""}
                                        key={hatColor} onClick={() => {
                                        updateAvatarSettings({hatColor: hatColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, hatColor: hatColor})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={11}>
                            <h3>Hair color</h3>
                            <ul className={"itemList"}>
                                {Object.values(HairColor).map((hairColor) => (
                                    <li className={avatar.settings.hairColor == hairColor ? "selected" : ""}
                                        key={hairColor} onClick={() => {
                                        updateAvatarSettings({hairColor: hairColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({...avatar.settings, hairColor: hairColor})}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={12}>
                            <h3>Facial hair</h3>
                            <ul className={"itemList"}>
                                {Object.values(FacialHair).map((facialHair) => (
                                    <li className={avatar.settings.facialHair == facialHair ? "selected" : ""}
                                        key={facialHair} onClick={() => {
                                        updateAvatarSettings({
                                            facialHair: facialHair,
                                        });
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            facialHair: facialHair,
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                                <li className={avatar.settings.facialHair == undefined ? "selected" : ""}
                                    key="noFacialHair" onClick={() => {
                                    updateAvatarSettings({facialHair: undefined});
                                }}><img
                                    src={generateAvatarFromSettings({
                                        ...avatar.settings,
                                        facialHair: undefined
                                    })}
                                    alt={`Avatar of ${nameInput}`}
                                    width={100}/>
                                </li>
                            </ul>
                        </TabPanel>
                        <TabPanel value={value} index={13}>
                            <h3>Facial hair color</h3>
                            <ul className={"itemList"}>
                                {Object.values(FacialHairColor).map((facialHairColor) => (
                                    <li className={avatar.settings.facialHairColor == facialHairColor ? "selected" : ""}
                                        key={facialHairColor} onClick={() => {
                                        updateAvatarSettings({facialHairColor: facialHairColor});
                                    }}>{<img
                                        src={generateAvatarFromSettings({
                                            ...avatar.settings,
                                            facialHairColor: facialHairColor
                                        })}
                                        alt={`Avatar of ${nameInput}`}
                                        width={100}/>
                                    }</li>))}
                            </ul>
                        </TabPanel>
                    </div>
                </div>
            </BModal>
        </div>
    )
}
