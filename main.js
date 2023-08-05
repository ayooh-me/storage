'use strict'
const {
    default: makeWASocket,
    MessageType,
    DisconnectReason,
    useMultiFileAuthState,
    makeInMemoryStore,
    downloadContentFromMessage,
    jidDecode,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    makeCacheableSignalKeyStore,
  } = require('@adiwajshing/baileys'),
  fs = require('fs'),
  figlet = require('figlet'),
  lolcatjs = require('lolcatjs'),
  chalk = require('chalk'),
  logg = require('pino'),
  Jimp = require('jimp'),
  parsePhoneNumber = require('libphonenumber-js'),
  readline = require('readline'),
  clui = require('clui'),
  { Spinner } = clui,
  { serialize, fetchJson, getBuffer } = require('./function/func_Server')
const { nocache, uncache } = require('./function/Chache_Data.js'),
  {
    status_Connection,
  } = require('./function/Data_Server_Bot/Status_Connect.js'),
  { Memory_Store } = require('./function/Data_Server_Bot/Memory_Store.js'),
  {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
  } = require('./function/Exif_Write')
let setting = JSON.parse(fs.readFileSync('./config.json'))
const _0x3d6dc2 = {}
_0x3d6dc2.level = 'fatal'
const botLogger = logg(_0x3d6dc2)
function title() {
  console.clear()
  console.log('----------------------------------------------------')
  lolcatjs.fromString(
    chalk.cyan(
      figlet.textSync('Rafly', {
        font: 'Bloody',
        horizontalLayout: 'full',
        verticalLayout: 'full',
        whitespaceBreak: true,
      })
    )
  )
  console.log('----------------------------------------------------')
  lolcatjs.fromString('[SERVER STARTED!!!]')
  console.log('----------------------------------------------------')
  lolcatjs.fromString('Create by Rafly\xB9\xB9')
  console.log('----------------------------------------------------')
}
async function sedative() {
  const { state: _0x45af35, saveCreds: _0x3b9afc } =
    await useMultiFileAuthState('./sessions')
  const _0x1c99e0 = !process.argv.includes('--no-store'),
    _0x46e9e0 = !process.argv.includes('--no-reply')
  const _0x91bbc2 = !process.argv.includes('--use-pairing-code')
  const _0x50fc2c = process.argv.includes('--mobile')
  async function _0x8f64c6() {
    const _0x3217a6 = makeWASocket({
      printQRInTerminal: !_0x91bbc2,
      markOnlineOnConnect: false,
      logger: botLogger,
      browser: ['Selfbot-Rafly11', 'Safari', '3.0.1'],
      auth: _0x45af35,
      mobile: _0x50fc2c,
      generateHighQualityLinkPreview: true,
      patchMessageBeforeSending: (_0x223bc8) => {
        return _0x223bc8
      },
    })
    title()
    Memory_Store.bind(_0x3217a6.ev)
    var _0x1b73e8 = function (_0xffb5) {
      return new Promise(function (_0xf9fe56) {
        _0x12c066.question(_0xffb5, _0xf9fe56)
      })
    }
    const _0x5e7486 = {
      input: process.stdin,
      output: process.stdout,
    }
    const _0x12c066 = readline.createInterface(_0x5e7486)
    if (_0x91bbc2 && !_0x3217a6.authState.creds.registered) {
      const _0x3796a0 = await _0x1b73e8(
          'Please enter your mobile phone number:\n'
        ),
        _0x399c7d = await _0x3217a6.requestPairingCode(_0x3796a0)
      console.log('Pairing code: ' + _0x399c7d)
    }
    if (_0x50fc2c && !_0x3217a6.authState.creds.registered) {
      var _0x1b73e8 = function (_0x293a47) {
        return new Promise(function (_0x416242) {
          _0x269f12.question(_0x293a47, _0x416242)
        })
      }
      const _0x16ebd0 = {
        input: process.stdin,
        output: process.stdout,
      }
      const _0x269f12 = readline.createInterface(_0x16ebd0),
        _0x3cb6a4 = { registration: {} }
      const { registration: _0x3ac8df } = _0x3217a6.authState.creds || _0x3cb6a4
      !_0x3ac8df.phoneNumber &&
        (_0x3ac8df.phoneNumber = await _0x1b73e8(
          'Please enter your mobile phone number:  '
        ))
      const _0x1fa6f3 = parsePhoneNumber(_0x3ac8df?.phoneNumber)
      if (!_0x1fa6f3?.isValid()) {
        console.log('Invalid phone number: ' + _0x3ac8df?.phoneNumber)
        process.exit(1)
      }
      _0x3ac8df.phoneNumber = _0x1fa6f3.format('E.164')
      _0x3ac8df.phoneNumberCountryCode = _0x1fa6f3.countryCallingCode
      _0x3ac8df.phoneNumberNationalNumber = _0x1fa6f3.nationalNumber
      const _0x31e1b1 = PHONENUMBER_MCC[_0x1fa6f3.countryCallingCode]
      if (!_0x31e1b1) {
        throw new Error(
          'Could not find MCC for phone number: ' +
            _0x3ac8df?.phoneNumber +
            '\nPlease specify the MCC manually.'
        )
      }
      _0x3ac8df.phoneNumberMobileCountryCode = _0x31e1b1
      async function _0x421c43() {
        try {
          const _0x95e758 = await _0x1b73e8('Please enter the one time code: '),
            _0x250073 = await _0x3217a6.register(
              _0x95e758.replace(/["']/g, '').trim().toLowerCase()
            )
          console.log('Successfully registered your phone number.')
          console.log(_0x250073)
          _0x269f12.close()
        } catch (_0x489153) {
          console.error(
            'Failed to register your phone number. Please try again.\n',
            _0x489153
          )
          await _0x27006d()
        }
      }
      async function _0x27006d() {
        let _0xc216f4 = await _0x1b73e8(
          'How would you like to receive the one time code for registration? "sms" or "voice" '
        )
        _0xc216f4 = _0xc216f4.replace(/["']/g, '').trim().toLowerCase()
        if (_0xc216f4 !== 'sms' && _0xc216f4 !== 'voice') {
          return await _0x27006d()
        }
        _0x3ac8df.method = _0xc216f4
        try {
          await _0x3217a6.requestRegistrationCode(_0x3ac8df), await _0x421c43()
        } catch (_0x233fd2) {
          console.error(
            'Failed to request registration code. Please try again.\n',
            _0x233fd2
          )
          await _0x27006d()
        }
      }
      _0x27006d()
    }
    _0x3217a6.ev.on('messages.upsert', async (_0x15f378) => {
      var _0xc01a18 = _0x15f378.messages[0]
      if (!_0x15f378.messages) {
        return
      }
      if (_0xc01a18.key && _0xc01a18.key.remoteJid == 'status@broadcast') {
        return
      }
      _0xc01a18 = serialize(_0x3217a6, _0xc01a18)
      _0xc01a18.isBaileys =
        _0xc01a18.key.id.startsWith('BAE5') ||
        _0xc01a18.key.id.startsWith('3EB0')
      require('./conn')(_0x3217a6, _0xc01a18, _0x15f378, setting, Memory_Store)
    })
    _0x3217a6.ev.on('creds.update', _0x3b9afc)
    _0x3217a6.reply = (_0xf357e6, _0x10f0eb, _0x10bb39) =>
      _0x3217a6.sendMessage(
        _0xf357e6,
        { text: _0x10f0eb },
        { quoted: _0x10bb39 }
      )
    _0x3217a6.ev.on('connection.update', (_0x121fbe) => {
      status_Connection(_0x3217a6, _0x121fbe, _0x8f64c6)
    })
    _0x3217a6.ev.on('group-participants.update', async (_0xf67fcb) => {
      console.log(_0xf67fcb)
    })
    _0x3217a6.ev.on('group-update', async (_0xcbef56) => {
      updateGroup(_0x3217a6, _0xcbef56, MessageType)
    })
    _0x3217a6.sendImage = async (
      _0x572805,
      _0x515231,
      _0x1c070c = '',
      _0x1ca2f2 = '',
      _0x49fe48
    ) => {
      let _0x5a5f49 = Buffer.isBuffer(_0x515231)
        ? _0x515231
        : /^data:.*?\/.*?;base64,/i.test(_0x515231)
        ? Buffer.from(_0x515231.split`,`[1], 'base64')
        : /^https?:\/\//.test(_0x515231)
        ? await await getBuffer(_0x515231)
        : fs.existsSync(_0x515231)
        ? fs.readFileSync(_0x515231)
        : Buffer.alloc(0)
      const _0x4801ce = {
        image: _0x5a5f49,
        caption: _0x1c070c,
        ..._0x49fe48,
      }
      const _0x50ab1f = { quoted: _0x1ca2f2 }
      return await _0x3217a6.sendMessage(_0x572805, _0x4801ce, _0x50ab1f)
    }
    _0x3217a6.decodeJid = (_0x263349) => {
      if (!_0x263349) {
        return _0x263349
      }
      if (/:\d+@/gi.test(_0x263349)) {
        let _0x2f4bb8 = jidDecode(_0x263349) || {}
        return (
          (_0x2f4bb8.user &&
            _0x2f4bb8.server &&
            _0x2f4bb8.user + '@' + _0x2f4bb8.server) ||
          _0x263349
        )
      } else {
        return _0x263349
      }
    }
    _0x3217a6.generateProfilePicture = async (_0x465327) => {
      const _0x31859b = await Jimp.read(_0x465327)
      const _0x4b98c1 = _0x31859b.getWidth()
      const _0x1642a5 = _0x31859b.getHeight()
      const _0xabc49 = _0x31859b.crop(0, 0, _0x4b98c1, _0x1642a5)
      return {
        img: await _0xabc49.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await _0xabc49
          .scaleToFit(720, 720)
          .getBufferAsync(Jimp.MIME_JPEG),
      }
    }
    return (
      (_0x3217a6.downloadAndSaveMediaMessage = async (
        _0x31542e,
        _0xe7983b,
        _0x2d954a
      ) => {
        if (_0xe7983b === 'image') {
          var _0x40b45e = await downloadContentFromMessage(
            _0x31542e.message.imageMessage ||
              _0x31542e.message.extendedTextMessage?.contextInfo.quotedMessage
                .imageMessage,
            'image'
          )
          let _0x34279d = Buffer.from([])
          for await (const _0x4cb477 of _0x40b45e) {
            _0x34279d = Buffer.concat([_0x34279d, _0x4cb477])
          }
          return fs.writeFileSync(_0x2d954a, _0x34279d), _0x2d954a
        } else {
          if (_0xe7983b === 'video') {
            var _0x40b45e = await downloadContentFromMessage(
              _0x31542e.message.videoMessage ||
                _0x31542e.message.extendedTextMessage?.contextInfo.quotedMessage
                  .videoMessage,
              'video'
            )
            let _0x4e7179 = Buffer.from([])
            for await (const _0x4d5557 of _0x40b45e) {
              _0x4e7179 = Buffer.concat([_0x4e7179, _0x4d5557])
            }
            return fs.writeFileSync(_0x2d954a, _0x4e7179), _0x2d954a
          } else {
            if (_0xe7983b === 'sticker') {
              var _0x40b45e = await downloadContentFromMessage(
                _0x31542e.message.stickerMessage ||
                  _0x31542e.message.extendedTextMessage?.contextInfo
                    .quotedMessage.stickerMessage,
                'sticker'
              )
              let _0x36a879 = Buffer.from([])
              for await (const _0x3b5b0a of _0x40b45e) {
                _0x36a879 = Buffer.concat([_0x36a879, _0x3b5b0a])
              }
              return fs.writeFileSync(_0x2d954a, _0x36a879), _0x2d954a
            } else {
              if (_0xe7983b === 'audio') {
                var _0x40b45e = await downloadContentFromMessage(
                  _0x31542e.message.audioMessage ||
                    _0x31542e.message.extendedTextMessage?.contextInfo
                      .quotedMessage.audioMessage,
                  'audio'
                )
                let _0x33b5e5 = Buffer.from([])
                for await (const _0x7f71c1 of _0x40b45e) {
                  _0x33b5e5 = Buffer.concat([_0x33b5e5, _0x7f71c1])
                }
                return fs.writeFileSync(_0x2d954a, _0x33b5e5), _0x2d954a
              }
            }
          }
        }
      }),
      (_0x3217a6.sendImageAsSticker = async (
        _0x201001,
        _0x6301b6,
        _0x4722bc,
        _0x1440d3 = {}
      ) => {
        let _0x2284af = Buffer.isBuffer(_0x6301b6)
            ? _0x6301b6
            : /^data:.*?\/.*?;base64,/i.test(_0x6301b6)
            ? Buffer.from(_0x6301b6.split`,`[1], 'base64')
            : /^https?:\/\//.test(_0x6301b6)
            ? await await getBuffer(_0x6301b6)
            : fs.existsSync(_0x6301b6)
            ? fs.readFileSync(_0x6301b6)
            : Buffer.alloc(0),
          _0x39b899
        _0x1440d3 && (_0x1440d3.packname || _0x1440d3.author)
          ? (_0x39b899 = await writeExifImg(_0x2284af, _0x1440d3))
          : (_0x39b899 = await imageToWebp(_0x2284af))
        const _0x22937f = { url: _0x39b899 }
        const _0x5bffaa = {
            sticker: _0x22937f,
            ..._0x1440d3,
          },
          _0x13787c = { quoted: _0x4722bc }
        await _0x3217a6
          .sendMessage(_0x201001, _0x5bffaa, _0x13787c)
          .then((_0xfddf62) => {
            fs.unlinkSync(_0x39b899)
            return _0xfddf62
          })
      }),
      (_0x3217a6.sendVideoAsSticker = async (
        _0x553861,
        _0x51b325,
        _0x25071b,
        _0x24ba77 = {}
      ) => {
        let _0x46dd38 = Buffer.isBuffer(_0x51b325)
            ? _0x51b325
            : /^data:.*?\/.*?;base64,/i.test(_0x51b325)
            ? Buffer.from(_0x51b325.split`,`[1], 'base64')
            : /^https?:\/\//.test(_0x51b325)
            ? await await getBuffer(_0x51b325)
            : fs.existsSync(_0x51b325)
            ? fs.readFileSync(_0x51b325)
            : Buffer.alloc(0),
          _0x247a23
        _0x24ba77 && (_0x24ba77.packname || _0x24ba77.author)
          ? (_0x247a23 = await writeExifVid(_0x46dd38, _0x24ba77))
          : (_0x247a23 = await videoToWebp(_0x46dd38))
        const _0x1189e5 = { url: _0x247a23 }
        const _0x13f3e8 = {
            sticker: _0x1189e5,
            ..._0x24ba77,
          },
          _0xba622 = { quoted: _0x25071b }
        await _0x3217a6
          .sendMessage(_0x553861, _0x13f3e8, _0xba622)
          .then((_0x36660e) => {
            fs.unlinkSync(_0x247a23)
            return _0x36660e
          })
      }),
      _0x3217a6
    )
  }
  _0x8f64c6()
}
sedative()
