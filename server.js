// sistem
ui = {
	isRegist: {
           status: 500
        },
        isEror: {
           status: 404
        },
        isTai: {
           status: 501,
           msg: "Server down"
        },
        guoblok: {
           status: 502,
           msg: "Guoblok query ne guoblok"
        }
}

const CreateSerial = () => {
var len = 3
        var arr = '123456789098765432101234567890987654321'
        var num1 = '';

        for (var i = len; i > 0; i--) {
            nim1 += arr[Math.floor(Math.random() * arr.length)];
        }

        var lenn = 4
        var num2 = '';

        for (var i = lenn; i > 0; i--) {
            num2 += arr[Math.floor(Math.random() * arr.length)];
        }

var dat = num1+num2
return `${dat}`
}

// data
userac = [{"username": "Farhanss","bio": "Iam Love NF","hit": 0,"jid": "6281247374816@nf.id","verifed": "true"}]

const getName = (sender) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        return `${userac[position].username}`
                }
};

const getBio = (sender) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        return `${userac[position].bio}`
                }
};

const getVerifed = (sender) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        return `${userac[position].verifed}`
                }
};

const getHit = (sender) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        return `${userac[position].hit}`
                }
};

const ChangeName = (sender, namo) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        userac[position].username = namo
                }
};

const ChnageBio = (sender, biom) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        userac[position].username = biom
                }
};

const addHit = (sender, count) => {
let position = false
        Object.keys(userac).forEach((i) => {
                if (userac[i].jid == sender) {
                        position = i
                }
        })
                if (position !== false) {
                        userac[position].hit += count
                }
};

// variable
var express = require('express');
var app = express();
var cors = require('cors'),
var secure = require('ssl-express-www');
var bodyParser = require('body-parser');
var portal = process.env.PORT || 8080 || 5000 || 3000

// set the apps
app.set('view engine', 'ejs');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));

// router
app.get('/', function(req, res) {
    res.render('home', {title: 'Hallo', name: 'Farhans'});
});

app.get('/auth/register', function(req, res, next) {
    const data_username = req.query.dtu;
    const data_bio = req.query.dtb;
    const data_jid = req.query.dtj;
    if (!data_username && !data_bio && !data_jid) return res.json(ui.guoblok)

    const registered = userac.find(u => {
	return u.username === data_username && u.bio === data_bio && u.jid === data_jid
    })

    if (registered) return res.json(ui.isRegist)
    const username = "${data_username}"
    const bio = "${data_bio}"
    const jid = "${data_jid}"
    const verifed = "false"
    userac.push({username,bio,jid,verifed})
    res.json({
          status: 205,
          url: '${https://account-nf.herokuapp.com/user?id=${jid}',
          id: '${id}'
    })
})

app.get('/user', function(req, res, next) {
    const id = req.query.id
    if (!id) return res.json(ui.guoblok)

    dat1 = getName(id)
    dat2 = getBio(id)
    dat3 = getVerifed(id)
    dat4 = getHit(id)
    dat5 = "Nf"
    res.render('profile', {title: '${dat1}', bio: '${dat2}', tag: `${dat3}`, hit: "${dat4}", botname: "${dat5}"});
})

app.get('/cn', function(req, res, next) {
    const id = req.query.id
    const namo = req.query.namo
    if (!id) return res.json(ui.guoblok)
    if (!namo) return res.json(ui.guoblok)

    ChangeName(id, namo)
    res.redirect('/user?id=${id}')
})

app.get('/addhit', function(req, res, next) {
    const id = req.query.id
    const namo = req.query.namo
    if (!id) return res.json(ui.guoblok)
    if (!count) return res.json(ui.guoblok)

    addHit(id, count)
    res.redirect('/user?id=${id}')
})

app.listen(portal);
console.log('[ NF-SERVER ] Server Running At Port ${portal}');
