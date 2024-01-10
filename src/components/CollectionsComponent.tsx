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
  Skeleton,
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const api = new API();
    setLoading(true);
    api
      .get_collections(properties.settings)
      .then(async (res) => {
        setCollections(res);
        setLoading(false);
      })
      .catch(() => {
        console.log("invalid credentials");
      });
  }, [properties.selectedCollectionId, properties.settings]);

  useEffect(() => {
    setSelectedCollection(properties.selectedCollectionId);
  }, [properties.selectedCollectionId]);

  return (
    <List dense={true} sx={{ height: "calc(100% - 100px)" }}>
      {loading ? (
        <Skeleton variant="rounded" height="100%" width="100%" />
      ) : (
        collections.map((element) => (
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
        ))
      )}
    </List>
  );
};

export default CollectionsComponent;
