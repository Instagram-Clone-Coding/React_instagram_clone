export default class NaverMap {
    private apiKey?: string;
    private baseURL: string;

    constructor() {
        this.apiKey = process.env.REACT_APP_NAVER_MAP_KEY;
        this.baseURL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${this.apiKey}`;
    }

    loadScript(callbackAfterLoad: Function) {
        const existingScript = document.getElementById(`naverMaps`);

        if (!existingScript) {
            const mapScript = this.getScript(this.baseURL, `naverMaps`);
            const submoduleScript = this.getScript(
                `${this.baseURL}&submodules=geocoder`,
                `submodule`,
            );
            // TODO: 2개 script load된 후에 콜백하려면?
            mapScript.onload = () => {
                if (callbackAfterLoad) callbackAfterLoad();
            };
        }
        if (existingScript && callbackAfterLoad) callbackAfterLoad();
    }

    getScript(src: string, id: string) {
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        document.body.appendChild(script);
        return script;
    }
}

// 참고: https://betterprogramming.pub/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d
