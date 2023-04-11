# Content Manager for Automobilista 2

## Status quo

[Automobilista 2](https://store.steampowered.com/app/1066890/Automobilista_2/) (AMS2) is an amazing simulation game, but installing mods is _["a somewhat cumbersome process"](https://forum.reizastudios.com/threads/automobilista-2-december-2022-development-update.28175/)_ even according to the game developers _Reiza Studios_. Given that there is no roadmap for native modding support in AMS2, this project strives to make mod installation and maintenance easier for everybody, taking inspiration from _[Content Manager](https://acstuff.ru/app/)_ for Assetto Corsa.

## Key pain points

### a) Manual bootfiles handling

If I want to install any mod, I first need to download a .7z archive containing basic game data (bootfiles) and use JonesSoft Generic Mod Enabler (JSGME) to install them ([see tutorial](https://www.riotbits.com/automobilista-2-how-to-install-car-mods-47705/)).

**I wish the files could be downloaded or generated automatically.**

### b) Manual file and file content handling

If I want to install a car or track mod, I need to copy files to specific locations and copy-paste content to specific locations in two config files (`vehiclelist.lst`, `driveline.rg`).

**I wish I could simply select a mod archive file for installation with a few clicks.**

### c) AMS2 updates break all installed mods

After AMS2 received a version update via Steam, I need to wait for updated bootfiles to become available, download and install them (see _a_), and then re-install all mods manually (see _b_).

**I wish installed mods would be restored after an AMS2 version update.**

## Roadmap

### v0.1, Minimum Viable Product

-   The application has a simple graphical user interface
-   I can select a mod file from my hard drive (.7z only) to install a car mod (pain point _b_)

#### Out of scope

-   creation/download of bootfiles (pain point _a_)
-   mod recovery after AMS2 update (pain point _c_)
-   installation of car mods with complex README.md content (where content cannot be parsed easily)
    -   installation mod packs with multiple cars
-   installation of track mods

## Tech stack

[Electron](https://www.electronjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)

## Terminology

### Mod states

A car mod can be in one of the following states:

-   **error, _red_:** mod data is incomplete or cannot be parsed
-   **available, _yellow_:** mod is available for installation, but not included in bootfiles yet
-   **installed, _green_:** mod is included in bootfiles, but may require syncing via JSGME

### Bootfiles states

A single bootfiles version/directory can be in one of the following states:

-   **error, _red_:** data is incomplete, cannot be parsed or is outdated
-   **installed, _green_:** bootfiles can be used with local AMS2 installation

## Resources

-   [Mod installation tutorial](https://steamcommunity.com/sharedfiles/filedetails/?id=2825729601) by speedonerd
-   [AMS2 Bootfiles](https://projectcarsmoddingteam.weebly.com/downloads---automobilista-2.html) by Project Cars Modding Team
-   [PCarsTools](https://github.com/Nenkai/PCarsTools/), a tool for creating bootfiles from an existing AMS2 installation
-   [JSGME docs](https://www.tuttovola.org/index.php?action=downloads;sa=downfile&id=1135) (PDF, see section _Command line parameters_, p.17)
-   [workaround for Win11 filesystem access](https://github.com/electron/electron/issues/28422#issuecomment-1322520014)

# TODO

## now

-   let user select 7z.exe file location
-   let user select AMS2 installation directory
-   validate settings schema
-   handle unsupported mods in list

## later

-   get images from /MODS/Lamborghini SCV12 v1.4.5.2/GUI/vehicleimages/vehicleimages_lamborghini_scv12
-   replace lstat->stat (?)
-   rename "config" -> "resources"
