import React, { FunctionComponent, useEffect, useState } from "react";
import "./App.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { Api, ChromeReaderMode, Home, Settings } from "@mui/icons-material";
import API, { UserSettings } from "./util/api";
import CollectionsComponent from "./components/CollectionsComponent";
import SettingsComponent from "./components/SettingsComponent";
import { main } from "./util/handleOverleaf";
import { save, load } from "./util/storageApi";
import { getCurTab } from "./util/chromeUtils";

function App() {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [settings, setSettings] = useState<UserSettings>({
    API_ENDPOINT: "https://api.zotero.org",
    User_id: "",
    API_key: "",
  });
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [validSettings, setValidSettings] = useState<boolean>(
    !checkIfSettingsValid()
  );
  const [loading, setLoading] = useState(false);

  // Disable button when settings are invalid
  useEffect(() => {
    setValidSettings(!checkIfSettingsValid());
  }, [settings, selectedCollection]);

  // Disable button if active Tab is not Overleaf.com
  useEffect(() => {
    let checkCurTab = async () => {
      let curTab = await getCurTab();
      if (curTab?.url?.includes("overleaf.com")) {
        setButtonDisabled(false);
        console.log("On Overleaf.com!!!");
      } else {
        setButtonDisabled(true);
        console.log("Not on Overleaf.com");
      }
    };
    checkCurTab();
  }, []);

  useEffect(() => {
    load("settings", (value: any) => {
      console.log("settings:", value);
      if (
        value !== undefined &&
        value["API_ENDPOINT"] !== undefined &&
        value["User_id"] !== undefined &&
        value["API_key"] !== undefined
      ) {
        setSettings(value);
      }
    });

    load("selectedCollection", (value: any) => {
      console.log("Selected:", value);
      if (value !== undefined && value["id"] !== undefined) {
        console.log("taking this collectionId", value["id"]);
        setSelectedCollection(value["id"]);
      }
    });
  }, []);

  const callbackSettings = (
    settingsName: keyof UserSettings,
    newValue: string
  ) => {
    var newSettings: UserSettings = { ...settings };
    newSettings[settingsName] = newValue;
    setSettings(newSettings);

    save("settings", newSettings, () => {
      console.log("Saved settings");
    });
  };
  const api = new API();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Paper sx={{ pl: 2, pr: 2, height: "100%", overflowY: "scroll" }}>
        {currentMenu === 0 ? (
          <>
            <CollectionsComponent
              settings={settings}
              callbackSetCollection={(value: any) => {
                const savedObject = {
                  id: value,
                };

                setSelectedCollection(value);
                save("selectedCollection", savedObject, () => {
                  console.log("saved " + savedObject + " to be selected");
                });
              }}
              selectedCollectionId={selectedCollection}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", pr: 5, pl: 5, mb: 5 }}
              disabled={
                loading ||
                selectedCollection == "" ||
                selectedCollection == undefined ||
                buttonDisabled ||
                validSettings
              }
              onClick={async () => {
                setLoading(true);
                main(
                  await api.export_collection(settings, selectedCollection),
                  () => {
                    setLoading(false);
                  }
                );
              }}
            >
              {!loading ? "Import into .bib file" : "Loading"}
            </Button>
          </>
        ) : (
          <SettingsComponent
            settings={settings}
            setSettingsCallback={callbackSettings}
          />
        )}
      </Paper>
      <Paper elevation={3}>
        <BottomNavigation
          value={currentMenu}
          onChange={(event, newValue) => {
            console.log(newValue);
            setCurrentMenu(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );

  // Checks if the current settings are valid
  // returns false if:
  // - API_ENDPOINT is empty
  // - User_id is empty
  // - API_key is empty
  // - selectedCollection is empty
  // otherwise returns true
  function checkIfSettingsValid() {
    return (
      settings.API_ENDPOINT !== "" &&
      settings.User_id !== "" &&
      settings.API_key !== ""
    );
  }
}

export default App;
