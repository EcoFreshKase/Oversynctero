# Oversynctero

Oversynctero is a Chrome Plugin to automatically synchronize a .bib file in your Overleaf project with your Zotero Online Storage for free.

# How to use Oversynctero

If you have a problem with the setup or installation please check the FAQ.

## Setup

- make sure the collection you want to synchronize is in your Zotero online storage
- Create an Zotero API Key
- get your Zotero User Id
- make sure you have a file in your Overleaf project with the .bib extension

## Install Oversynctero

1. download the latest release of Oversynctero from here [https://github.com/EcoFreshKase/Oversynctero/releases](https://github.com/EcoFreshKase/Oversynctero/releases) 
2. Go to your Chrome Extension Settings Page
3. Make sure developer mode is activated
4. Go to `chrome://extensions/` or `brave://extensions/` or `edge://extensions/` etc. (for firefox it should be possible to install the extension but you will have to find it out yourself 🐻)
5. Click "Load unpacked"
6. Select the directory you downloaded

If you press the extensions button in Chrome you should see the Oversynctero extension.

## Use Oversynctero

1. Go to your [Overleaf](https://www.overleaf.com/project) Project
2. Open Oversynctero in the extensions menu
3. Go to settings
4. Now enter your Zotero User Id in User_id and your Zotero API Key in API_key
5. You might need to change the API_ENDPOINT in some special cases but for most cases you can ignore the setting
6. Go back to Home
7. Select your Zotero Connection to synchronize in Overleaf
8. Press "IMPORT REFS.BIB"
9. Your Zotero Collection should now be copied into your .bib file (might take a second or two)
10. Continue working on your Overleaf project

# FAQ

## How to create an Zotero API Key?

1. Go to your [Zotero API Settings](https://www.zotero.org/settings/keys)
2. Click "Create new private key"
3. Give the key a name to keep everything organized for yourself
4. Press "Save Key"
5. The key should now be created and you should see the API Key

## Where to find Zotero User Id?

1. Go to your [Zotero API Settings](https://www.zotero.org/settings/keys)
2. You should see a field saying: "Your userID for use in API calls is {yourUserId}"

## How to enable the developer mode in Chrome?

1. Go to your [Chrome Extensions](chrome://extensions/)
2. You should see a switch (top right corner as I'm writing this) saying Developer mode
3. enable the switch

## My Zotero Collection changed but my .bib file didn't change

1. Open Oversynctero in the extensions menu
2. Select your Zotero Collection
3. Press "IMPORT REFS.BIB"

## Oversynctero doesn't import more than 100 items of my collection

This is a know limitation with the Zotero API. We decided that this issue is not important for now but it will be fixed in the future if necessary.
