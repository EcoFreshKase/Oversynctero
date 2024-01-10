export async function getCurTab(): Promise<Tab | undefined> {
  // @ts-ignore
  return (await chrome.tabs.query({ active: true, currentWindow: true }))[0] as
    | Tab
    | undefined;
}

interface Tab {
  active: boolean;
  url?: string;
  // More to come ...
}
