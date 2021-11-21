const MCLCore = require('./utils/launch.js');
const minecraft = new MCLCore();
const fs = require('fs');



async function main() {
    let opts = {
        path: "./dev/minecraft",
        version: "1.18-pre5",
        url: "http://uzurion.luuxis.fr/test/",
        custom: true
    }
    
    minecraft.launch(opts)
    fs.writeFileSync(`config.json`, JSON.stringify(await minecraft.checkFiles(), true, 4), 'UTF-8')
    console.log(await minecraft.checkFiles());
}
main()
