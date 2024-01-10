export interface UserSettings {
  API_ENDPOINT: string;
  User_id: string;
  API_key: string;
}

export interface Collection {
  key: string;
  version: number;
  library: {
    type: string;
    id: number;
    name: string;
    links: {
      alternate: {
        href: string;
        type: string;
      };
    };
  };
  links: {
    self: {
      href: string;
      type: string;
    };
    alternate: {
      href: string;
      type: string;
    };
  };
  meta: {
    numCollections: number;
    numItems: 3;
  };
  data: {
    key: string;
    version: number;
    name: string;
    parentCollection: boolean;
    relations: object;
  };
}

export default class API {
  send_request = async (endpoint: String, settings: UserSettings) => {
    const header: Headers = new Headers();
    header.append("Zotero-API-Key", settings.API_key);

    return await fetch(
      settings.API_ENDPOINT + "/users/" + settings.User_id + endpoint,
      {
        headers: header,
      }
    );
  };

  get_collections = async (settings: UserSettings): Promise<Collection[]> => {
    return (await this.send_request("/collections", settings)).json();
  };

  export_collection = async (settings: UserSettings, collectionId: string, format: string = "bibtex"): Promise<string> => {
    return (await this.send_request("/collections/" + collectionId + "/items?format=" + format, settings)).text();
  }
}
