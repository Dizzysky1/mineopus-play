# MineOpus — play

A detailed Minecraft (Java Edition, ~1.16 era) remake built in three.js. This repository holds the
built, ready-to-play web version. Source code: `Dizzysky1/Opus-5.5-games` (folder `MineOpus/`).

**Play:** open `index.html` from any static web host, for example GitHub Pages for this repository
(Settings → Pages → Deploy from branch `main`, folder `/ (root)`).

**Multiplayer:** title screen → Multiplayer → type a room code → Connect. Friends who use the
same room code see each other's worlds; one hosts a world and the others join it. With the server
field left empty the game talks through free public Nostr relays, so no server or account is needed.
Anyone who knows the room code can join that room, so pick an unusual one.

All textures and sounds are generated in code; no Mojang assets are used. Not an official Minecraft
product and not associated with Mojang or Microsoft. Third-party code: three.js (THREE_LICENSE.txt)
and nostr-tools / noble (NOSTR_LICENSES.txt), both MIT.
