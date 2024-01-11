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
  send_request = async (
    endpoint: String,
    settings: UserSettings
  ): Promise<Response | false> => {
    const regexApiKey = /^.{24}$/;
    const regexUserId = /^[0-9]{8}$/;
    const isValid =
      regexApiKey.test(settings.API_key) && regexUserId.test(settings.User_id);

    const header: Headers = new Headers();
    header.append("Zotero-API-Key", settings.API_key);

    return !isValid
      ? await false
      : await fetch(
          settings.API_ENDPOINT + "/users/" + settings.User_id + endpoint,
          {
            headers: header,
          }
        );
  };

  get_collections = async (settings: UserSettings): Promise<Collection[]> => {
    const result = await this.send_request("/collections", settings);

    return result !== false ? await result.json() : [];
  };

  export_collection = async (
    settings: UserSettings,
    collectionId: string,
    format: string = "bibtex"
  ): Promise<string | undefined> => {
    const result = await this.send_request(
      "/collections/" + collectionId + "/items?format=" + format,
      settings
    );
    return result !== false ? result.text() : undefined;
  };
}
