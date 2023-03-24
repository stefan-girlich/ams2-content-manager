# Use cases

## 1. Install mod from archive

_As an AMS2 user, I want to install a downloaded car mod with a view clicks so I don't need to deal with extracting files, copying files, and manually updating config files._

```mermaid

sequenceDiagram
    actor User
    participant CM as Content Manager
    participant MODS as MODS dir
    participant registry as CM registry dir
    participant bootfiles as MODS/__bootfiles_1.x.y.z
    participant JSGME as JSGME.exe (CLI)

    User->>CM: drags in mod archive file
    CM->>MODS: extract main content folder
    CM->>registry: extract config (README, manifest.yml, ...)
    CM->>bootfiles: update vehiclelist.lst and driveline.rg
    CM->>JSGME: activate MOD, activate bootfiles
```

## 2. View installed mods

_As an AMS2 user, I want to view a list of installed mods so I can get an overview and take further action for selected mods._

```mermaid

sequenceDiagram
    actor User
    participant CM as Content Manager
    participant MODS as MODS dir
    participant registry as CM registry dir
    participant bootfiles as MODS/__bootfiles_1.x.y.z
    participant JSGME as JSGME.exe (CLI)

    User->>+CM: open app or click "refresh"
    CM->>+MODS: list all car mod dirs in MODS
    MODS-->>-CM: MOD/Lamborghini SCV12 , ...
    loop for each car mod dir
        CM->>+registry: fetch config for mod
        registry-->>-CM: registry_dir/Lamborghini SCV12/README ,...
        CM->>CM: parse README or manifest.yml
        CM->>+bootfiles: check if entries exist in vehiclelist.lst and driveline.rg
        bootfiles->>-CM: status per entry: "exists"/"missing"/"conflict"
        Note over JSGME: TODO: check if possible via CLI
        CM->>+JSGME: check if mod directory activated
        JSGME->>-CM: activation state
    end
    CM->>-User: show list of cars
```

## 3. Re-install mods after game update

_As an AMS2 user, I want to re-install my existing mods with a few clicks
so I don't need to manuall re-run the installation process for each mod._

```mermaid

sequenceDiagram
    actor User
    participant CM as Content Manager
    participant MODS as MODS dir
    participant registry as CM registry dir
    participant bootfiles as MODS/__bootfiles_1.x.y.z
    participant JSGME as JSGME.exe (CLI)

    User->>bootfiles: manually replace bootfiles
    User->>CM: click "re-install mods"
    CM->>+registry: list configs for installed mods
    registry->>-CM: registry_dir/Lamborghini SCV12/README ,...
    loop for each car mod config dir
        CM->>MODS: check if mod still installed
        CM->>CM: parse README or manifest.yml
        CM->>bootfiles: update vehiclelist.lst and driveline.rg
        CM->>JSGME: activate MOD, activate bootfiles
    end
```
