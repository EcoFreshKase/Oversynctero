import { FunctionComponent } from "react";
import { UserSettings } from "../util/api";
import { Box, TextField } from "@mui/material";

interface SettingsProps {
  settings: UserSettings;
  setSettingsCallback: Function;
}

const SettingsComponent: FunctionComponent<SettingsProps> = (
  properties: SettingsProps
) => {
  const settings: (keyof UserSettings)[] = [
    "API_ENDPOINT",
    "User_id",
    "API_key",
  ];
  return (
    <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
      {settings.map((value) => (
        <TextField
          value={properties.settings[value]}
          label={value}
          variant="standard"
          onChange={(change) => {
            properties.setSettingsCallback(value, change.target.value);
          }}
          key={value}
        />
      ))}
    </Box>
  );
};

export default SettingsComponent;
