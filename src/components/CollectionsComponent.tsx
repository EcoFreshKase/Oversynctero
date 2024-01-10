import React, { FunctionComponent, useEffect, useState } from "react";
import API, { Collection, UserSettings } from "../util/api";
import { Delete, Folder } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface CollectionsProps {
  settings: UserSettings;
  callbackSetCollection: Function;
  selectedCollectionId: string;
}

const CollectionsComponent: FunctionComponent<CollectionsProps> = (
  properties: CollectionsProps
) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    properties.selectedCollectionId
  );
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const api = new API();
    api.get_collections(properties.settings).then(async (res) => {
      setCollections(res);
    });
  }, [properties.selectedCollectionId, properties.settings]);

  useEffect(() => {
    setSelectedCollection(properties.selectedCollectionId);
  }, [properties.selectedCollectionId]);

  return (
    <List dense={true}>
      {collections.map((element) => (
        <ListItemButton
          onClick={() => {
            setSelectedCollection(element.data.key);
            properties.callbackSetCollection(element.data.key);
          }}
          selected={selectedCollection === element.data.key}
          key={element.data.key}
          sx={{
            borderRadius: "5px",
          }}
        >
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText>{element.data.name}</ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};

export default CollectionsComponent;
