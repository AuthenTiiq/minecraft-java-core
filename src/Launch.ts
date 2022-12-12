/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

import { EventEmitter } from 'events';

import jsonMinecraft from './Minecraft-utils/Minecraft-Json.js';
import librariesMinecraft from './Minecraft-utils/Minecraft-Libraries.js';
import assetsMinecraft from './Minecraft-utils/Minecraft-Assets.js';
import javaMinecraft from './Minecraft-utils/Minecraft-Java.js';

interface launchOptions {
    url: string | null,
    authenticator: {
        access_token: string | null,
        client_token: string | null,
        uuid: string | null,
        name: string | null,
        user_properties: string | null,
        meta: {
            xuid: string | null,
            type: string | null,
            demo: boolean | null,
        }
    },

    timeout: number | 10000,
    path: string | '.Minecraft',
    version: string | 'latest_release',
    detached: boolean | false,
    downloadFileMultiple: number | 3,

    modde: boolean | false,
    loader: {
        type: string
        build: string | 'latest'
    },

    verify: boolean | false,
    ignored: any | [],
    args: any | [],

    javaPath: string | null,
    java: boolean | false,

    screen: {
        width: number | null,
        height: number | null,
        fullscreen: boolean | false
    },

    memory: {
        min: string | '1G',
        max: string | '2G'
    }
}


export default class Launch {
    options: launchOptions;
    on: any;
    emit: any;

    constructor() {
        this.on = EventEmitter.prototype.on;
        this.emit = EventEmitter.prototype.emit;
    }

    async Launch(opt: launchOptions) {
        this.options = {
            url: opt?.url || null,
            authenticator: opt?.authenticator || null,
            timeout: opt?.timeout || 10000,
            path: opt?.path || '.Minecraft',
            version: opt?.version || 'latest_release',
            detached: opt?.detached || false,
            downloadFileMultiple: opt?.downloadFileMultiple || 3,

            modde: opt?.modde || false,
            loader: {
                type: opt?.loader?.type || null,
                build: opt?.loader?.build || 'latest'
            },

            verify: opt?.verify || false,
            ignored: opt?.ignored || [],
            args: opt?.args || [],

            javaPath: opt?.javaPath || null,
            java: opt?.java || false,

            screen: {
                width: opt?.screen?.width || null,
                height: opt?.screen?.height || null,
                fullscreen: opt?.screen?.fullscreen || false,
            },

            memory: {
                min: opt?.memory?.min || '1G',
                max: opt?.memory?.max || '2G'
            }
        }

        this.start();
    }

    async start() {
        // donload files if nessesary
        await this.DownloadGame();
    }

    async DownloadGame() {
        let InfoVersion = await new jsonMinecraft(this.options.version).GetInfoVersion();
        if (InfoVersion.error) InfoVersion
        let { json, version } = InfoVersion;

        let gameLibraries: any = await new librariesMinecraft(json, this.options).Getlibraries();
        let gameAssets: any = await new assetsMinecraft(json).GetAssets();
        let gameJava: any = await new javaMinecraft().GetJsonJava(json);
    }
}