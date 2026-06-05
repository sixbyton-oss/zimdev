const chalk = require("chalk")
const fs = require("fs")
//aumto presence update
global.autoTyping = false //auto tying in gc (true to on, false to off)
global.autoRecord = false //auto recording (true to on, false to off)
global.autoblockmorroco = true //auto block 212 (true to on, false to off)
global.wlcm = false
global.autokickmorroco = false //auto kick 212 (true to on, false to off) 
global.antispam = false//auto kick spammer (true to on, false to off)
//===============SETTING MENU==================\\
global.thumbnail = 'https://files.catbox.moe/kmd3j2.jpg'
global.ig = '-'
global.yt = 'DapzSYZ'
global.ttowner = '-'
global.ownername = 'Dapz'
global.owner = ['6285772182461'] // SETTING JUGA DI FOLDER DATABASE 
global.ownernomer = '6285772182461'
global.socialm = 'GitHub: -'
global.location = 'Indonesia' 
//========================setting Payment=====================\\
global.nodana = '08' // KOSONG KAN JIKA TIDAK ADA
global.nogopay = '08' // KOSONG KAN JIKA TIDAK ADA 
global.noovo = '08' // KOSONG KAN JIKA TIDAK ADA
//==================setting Payment Name===========================\\
global.andana = 'gtw' // KOSONG KAN JIKA TIDAK ADA
global.angopay = 'gtw' // KOSONG KAN JIKA TIDAK ADA
global.anovo = 'gtw' // KOSONG KAN JIKA TIDAK ADA
//==================setting bot===========================\\
global.botname = "Alisa-DapzSYZ"
global.ownernumber = '6285772182461'
global.botnumber = '6285694087363'
global.ownername = 'DapzSYZ'
global.ownerNumber = ["6285772182461@s.whatsapp.net"]
global.ownerweb = "https://whatsapp.com/channel/0029Vb6ACHTKQuJPBFVy6O22"
global.websitex = "https://chat.whatsapp.com/Jx1j76KwllqLEHmTP5m8M8"
global.wagc = "https://chat.whatsapp.com/Jx1j76KwllqLEHmTP5m8M8"
global.saluran = "https://whatsapp.com/channel/0029Vb6ACHTKQuJPBFVy6O22"
global.themeemoji = '🪀'
global.wm = "Elaina-DapzSYZ | Whatsapp Bot"
global.botscript = 'https://www.youtube.com/@DapzSYZ1' //script link
global.packname = "Sticker By Dapz"
global.author = "\n\n\n\n\nCreate by Sukuna\nYT : DapzSYZ"
global.creator = "6285772182461@s.whatsapp.net"
//======================== CPANEL FITUR ===========================\\
global.domain = '-' // Isi Domain Lu jangan kasih tanda / di akhir link
global.apikey = '-' // Isi Apikey Plta Lu
global.capikey = '-' // Isi Apikey Pltc Lu
//=========================================================//
global.apiDigitalOcean = "-"
//=========================================================//
//Server create panel egg pm2
global.apikey2 = '-' // Isi Apikey Plta Lu
global.capikey2 = '-' // Isi Apikey Pltc Lu
global.domain2 = '-' // Isi Domain Lu
global.docker2 = "ghcr.io/cekilpedia/vip:sanzubycekil" //jangan di ubah

global.eggsnya2 = '15' // id eggs yang dipakai
global.location2 = '1' // id location
//===========================//
global.domainotp = "https://claudeotp.com/api"
global.apikeyotp = "a395f97fe99f4fad0e790d10af518b9a"
global.eggsnya = '15' // id eggs yang dipakai
global.location3 = '1' // id location
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""
global.tekspushkonv4 = ""
//===========================//
global.mess = {
   wait: "*_Sebentar Kak,Masih Loading..._*",
   success: "Yeay! Berhasil Kak 🎉",
   on: "Udah Nyala nih! 🔥",
   off: "Udah Dimatiin 😴",
   query: {
       text: "Tulisannya mana, Kak? Aku kan gak bisa baca pikiran 😅",
       link: "Link-nya mana, Kak? Jangan pelit dong! 😜",
   },
   error: {
       fitur: "Oops! Ada yang rusak nih, Kak. Coba lapor ke developer biar bisa diperbaiki. 🙏",
   },
   only: {
       group: "Eh, Kak! Fitur ini cuma bisa dipake di grup, ya! 👥",
       private: "Fitur ini cuma buat chat pribadi, Kak. Jangan salah kamar 😏",
       owner: "Cuma buat si bos bot nih, Kak. Maaf ya 😬",
       admin: "Hanya bisa dipakai sama admin grup, Kak. Mungkin lain kali ya 😉",
       badmin: "Waduh! Bot-nya belum jadi admin grup nih. Tolong kasih jabatan dulu, Kak 😅",
       premium: "Kak, ini fitur premium loh! Biar bisa pake, beli dulu ke owner yaa 😎 (Ketik .owner buat info lebih lanjut)",
   }
}
//========================================\\
global.decor = {
	menut: '❏═┅═━–〈',
	menub: '┊•',
	menub2: '┊',
	menuf: '┗––––––––––✦',
	hiasan: '꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷',

	menut: '––––––『',
    menuh: '』––––––',
    menub: '┊☃︎ ',
    menuf: '┗━═┅═━––––––๑\n',
	menua: '',
	menus: '☃︎',

	htki: '––––––『',
	htka: '』––––––',
	haki: '┅━━━═┅═❏',
	haka: '❏═┅═━━━┅',
	lopr: 'Ⓟ',
	lolm: 'Ⓛ',
	htjava: '❃'
}

//===========================//

global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            makanancentaur: "🥗",
            makanangriffin: "🥙",
            makanankyubi: "🍗",
            makanannaga: "🍖",
            makananpet: "🥩",
            makananphonix: "🧀",
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            naga: "🐉",
            phonix: "🦅",
            kyubi: "🦊",
            griffin: "🦒",
            centaur: "🎠",
            skata: '🧩'
        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

//new
global.prefix = ['','!','.','#','&']
global.sessionName = 'session'
global.hituet = 0
//media target
global.thum = fs.readFileSync("./data/image/thumb.jpg") //ur thumb pic
global.log0 = fs.readFileSync("./data/image/thumb.jpg") //ur logo pic
global.err4r = fs.readFileSync("./data/image/thumb.jpg") //ur error pic
global.thumb = fs.readFileSync("./data/image/thumb.jpg") //ur thumb pic
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60' //default pp wa

//menu image maker
global.flaming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.fluming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flarun = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flasmurf = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='

global.keyopenai = "pk-pIWAlRroXTOAigkWdHcYvmlmgzEQXuoMWbVAaLAVZswSRbEB"
//documents variants
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
